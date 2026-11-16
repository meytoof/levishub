/* Section « compétences » : la spirale-galaxie en Mode 7.
 * Le Q est couché en perspective (façon Mode 7 de la Super Nintendo) et tourne.
 * Il explose une seule fois en pixels qui écrivent chaque famille en grosses lettres, avec sa constellation dessous.
 * On passe d'une famille à l'autre en zoomant dans une lettre (le « o » de Front-end) et en ressortant par la même
 * lettre du mot suivant (le « O » de DevOps). À la fin, les pixels reconstruisent la spirale et on plonge dans un trait
 * noir pour obtenir l'écran noir de la suite. Tout est dessiné en 2D sur un canevas : léger, net, mobile compris.
 * API : CVMode7.create(host, api) → { update(e, h, x), frame(t) } (même contrat que les scènes 3D).
 */
(function () {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ss = t => t * t * (3 - 2 * t);
  const eio = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const INK = '#0b0b0b';

  // Ordre du parcours (index dans CONSTS) et lettres de passage : on sort par « out », on entre dans le suivant par « in »
  const ORDER = [
    { i: 0, out: 'o' },               // Front-end  →
    { i: 5, in: 'O', out: 'D' },      // DevOps & qualité →
    { i: 2, in: 'D', out: 'o' },      // Données →
    { i: 3, in: 'o', out: 'a' },      // Animation & UI →
    { i: 1, in: 'a', out: 'a' },      // Back-end →
    { i: 4, in: 'a' },                // Intégrations
  ];
  // Timeline (h = avancée dans la section, fermeture au noir comprise au-delà de ~0,92)
  const T = { spin: .061, explode: .127, hold: .072, trans: .05, rebuild: .061, dive: .111 };
  const WORD0 = T.explode;                                         // début du premier mot
  const WORDS_END = WORD0 + ORDER.length * T.hold + (ORDER.length - 1) * T.trans;
  const REBUILT = WORDS_END + T.rebuild, DIVE_END = REBUILT + T.dive;

  /* ---------- le Q (même géométrie que la page) ---------- */
  function qPolylines() {
    const R0 = 22, TURNS = 2.75, REND = 210, TAU = Math.PI * 2, K = (REND - R0) / (TURNS * TAU), PE = Math.PI / 4, PS = PE - TURNS * TAU;
    const main = [];
    for (let i = 0; i <= 700; i++) { const th = i / 700 * TURNS * TAU, r = R0 + K * th, ph = PS + th; main.push([r * Math.cos(ph), r * Math.sin(ph)]); }
    const u = Math.SQRT1_2, E = [REND * u, REND * u];
    for (let i = 1; i <= 50; i++) { const d = i / 50 * 175; main.push([E[0] + u * d, E[1] + u * d]); }
    const stub = []; for (let i = 0; i <= 12; i++) { const r = 160 + i / 12 * 50; stub.push([r * u, r * u]); }
    return [main, stub];
  }
  // pixels répartis le long du trait (et dans son épaisseur)
  function samplePolyline(pl, step, offs) {
    const out = [];
    let acc = 0;
    for (let k = 1; k < pl.length; k++) {
      const [x0, y0] = pl[k - 1], [x1, y1] = pl[k], dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
      if (!len) continue;
      const nx = -dy / len, ny = dx / len;
      for (let d = step - acc; d <= len; d += step) {
        const t = d / len, px = x0 + dx * t, py = y0 + dy * t;
        offs.forEach(o => out.push([px + nx * o, py + ny * o]));
      }
      acc = (acc + len) % step;
    }
    return out;
  }

  window.CVMode7 = {
    create(host, api) {
      const cv = document.createElement('canvas'); cv.className = 'm7'; host.prepend(cv);
      const ctx = cv.getContext('2d');
      const CONSTS = api.CONSTS;
      let W = 0, H = 0, DPR = 1, mobile = false, words = [], N = 0, P = null, cam = null;
      const [QMAIN, QSTUB] = qPolylines();
      const offs = [-10.5, -7, -3.5, 0, 3.5, 7, 10.5];
      const SPIRAL = samplePolyline(QMAIN, 5, offs).concat(samplePolyline(QSTUB, 5, offs));

      /* ---------- mise en page des mots (pixels cibles + lettres de passage) ---------- */
      function layoutWord(o, idx) {
        const c = CONSTS[o.i], text = c.f;
        const g = document.createElement('canvas').getContext('2d');
        const maxW = W * (mobile ? .9 : .82);
        let size = Math.min(mobile ? W * .17 : W * .1, H * (mobile ? .1 : .15));
        let lines = [text];
        g.font = `800 ${size}px Syne`;
        if (g.measureText(text).width > maxW && text.includes(' ')) {
          // trop long : on coupe en deux lignes au plus près du milieu
          const sp = [...text].map((ch, k) => ch === ' ' ? k : -1).filter(k => k > 0);
          const cut = sp.reduce((b, k) => Math.abs(k - text.length / 2) < Math.abs(b - text.length / 2) ? k : b, sp[0]);
          lines = [text.slice(0, cut), text.slice(cut + 1)];
        }
        const widest = () => Math.max(...lines.map(l => g.measureText(l).width));
        while (widest() > maxW && size > 18) { size -= 2; g.font = `800 ${size}px Syne`; }
        const lh = size * .95, base0 = H * (mobile ? .3 : .36) - (lines.length - 1) * lh / 2;
        // pixels : on dessine le mot hors écran puis on garde un point tous les « gap » pixels
        const oc = document.createElement('canvas'); oc.width = Math.ceil(W); oc.height = Math.ceil(H);
        const og = oc.getContext('2d'); og.font = `800 ${size}px Syne`; og.textAlign = 'left'; og.textBaseline = 'alphabetic'; og.fillStyle = '#000';
        const holes = {};
        lines.forEach((l, li) => {
          const w = og.measureText(l).width, x0 = W / 2 - w / 2, y = base0 + li * lh;
          og.fillText(l, x0, y);
          [o.in, o.out].forEach(ch => {
            if (!ch || holes[ch]) return; const k = l.indexOf(ch); if (k < 0) return;
            const cw = og.measureText(ch).width, upper = ch === ch.toUpperCase();
            holes[ch] = [x0 + og.measureText(l.slice(0, k)).width + cw / 2, y - size * (upper ? .35 : ch === 'a' ? .2 : .27)];
          });
        });
        const gap = clamp(size / 26, 2.6, 5);
        const data = og.getImageData(0, 0, oc.width, oc.height).data, pts = [];
        for (let y = 0; y < oc.height; y += gap) for (let x = 0; x < oc.width; x += gap) {
          const ix = (Math.round(y) * oc.width + Math.round(x)) * 4 + 3; if (data[ix] > 128) pts.push([x, y]);
        }
        // constellation, sous le mot
        const bottom = base0 + (lines.length - 1) * lh + size * .3;
        const box = mobile ? { x: W / 2, y: bottom + H * .19, w: W * .82, h: H * .22 }
          : { x: W * .62, y: bottom + H * .22, w: Math.min(620, W * .46), h: H * .3 };
        return { o, c, idx, pts, holes, gap, size, box };
      }

      function layout() {
        W = host.clientWidth || innerWidth; H = host.clientHeight || innerHeight; mobile = W < 760;
        DPR = Math.min(devicePixelRatio || 1, 2);
        cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
        words = ORDER.map(layoutWord);
        N = Math.max(SPIRAL.length, ...words.map(w => w.pts.length));
        // chaque pixel a une place dans la spirale et dans chaque mot, plus un peu d'aléatoire pour les trajectoires
        P = Array.from({ length: N }, (_, i) => ({
          s: SPIRAL[i % SPIRAL.length], t: words.map(w => w.pts[Math.floor(i * w.pts.length / N)]),
          a: Math.random() * Math.PI * 2, r: Math.random(), d: .4 + Math.random() * .6,
        }));
        const F = Math.min(W * (mobile ? 1.55 : 1.05), H * 1.7);
        cam = { Hc: 300, D: 560, F, cx: W / 2, cy: H * (mobile ? .48 : .52) };
        const p = Math.atan2(cam.Hc, cam.D); cam.cp = Math.cos(p); cam.sp = Math.sin(p);
      }
      // projection Mode 7 : un plan couché, vu d'en haut en biais, qui tourne (yaw)
      function proj(x, y, yaw, out) {
        const cs = Math.cos(yaw), sn = Math.sin(yaw), X = x * cs - y * sn, Z = x * sn + y * cs;
        const ry = -cam.Hc, rz = Z + cam.D, y2 = ry * cam.cp + rz * cam.sp, z2 = rz * cam.cp - ry * cam.sp, k = cam.F / z2;
        out[0] = cam.cx + X * k; out[1] = cam.cy - y2 * k; out[2] = k; return out;
      }
      const tmp = [0, 0, 0];

      function drawSolidSpiral(yaw, alpha) {
        ctx.globalAlpha = alpha; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        [QMAIN, QSTUB].forEach(pl => {
          // par tronçons de 10 points : trait continu, épaisseur qui suit la profondeur
          for (let k = 0; k < pl.length - 1; k += 9) {
            ctx.beginPath(); let wsum = 0, n = 0;
            for (let j = k; j <= Math.min(pl.length - 1, k + 10); j++) {
              const q = proj(pl[j][0], pl[j][1], yaw, [0, 0, 0]); wsum += q[2]; n++;
              j === k ? ctx.moveTo(q[0], q[1]) : ctx.lineTo(q[0], q[1]);
            }
            ctx.lineWidth = 26 * wsum / n; ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      }

      function drawConstellation(w, prog, alpha) {
        if (alpha <= .01) return;
        const { c, box } = w, pos = c.s.map(s => [box.x + (s[3] - .5) * box.w, box.y + (s[4] - .5) * box.h]);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = 'rgba(11,11,11,.55)'; ctx.lineWidth = 1.3;
        c.e.forEach(([a, b], j) => {
          const pj = clamp(prog * 1.6 - j * .12); if (pj <= 0) return;
          ctx.beginPath(); ctx.moveTo(pos[a][0], pos[a][1]); ctx.lineTo(lerp(pos[a][0], pos[b][0], pj), lerp(pos[a][1], pos[b][1], pj)); ctx.stroke();
        });
        ctx.fillStyle = INK; ctx.textBaseline = 'middle';
        ctx.font = `600 ${mobile ? 11 : 13}px "JetBrains Mono", monospace`;
        c.s.forEach((s, j) => {
          const pj = clamp(prog * 2 - j * .1); if (pj <= 0) return;
          const r = Math.max(2.4, 6 - s[2] * .9) * (mobile ? .85 : 1);
          ctx.globalAlpha = alpha * pj; ctx.beginPath(); ctx.arc(pos[j][0], pos[j][1], r, 0, Math.PI * 2); ctx.fill();
          const left = s[3] > .62; ctx.textAlign = left ? 'right' : 'left';
          ctx.fillText(s[0], pos[j][0] + (left ? -(r + 7) : r + 7), pos[j][1]);
        });
        ctx.globalAlpha = alpha * clamp(prog * 3);
        ctx.font = `500 ${mobile ? 10 : 11}px "JetBrains Mono", monospace`; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(11,11,11,.55)';
        ctx.fillText(`${c.n.toUpperCase()} · ${c.f.toUpperCase()}`, box.x - box.w / 2, box.y - box.h / 2 - 22);
        ctx.globalAlpha = 1;
      }

      // pixels d'un mot, vus à travers un zoom (s) centré sur un point (f)
      function drawWordPixels(w, f, s, from, mix) {
        const sz = Math.max(w.gap * .78, w.gap * .86 * s);
        ctx.fillStyle = INK;
        for (let i = 0; i < N; i++) {
          const q = P[i], t = q.t[w.idx];
          let x = t[0], y = t[1];
          if (from && mix < 1) { const m = ss(clamp(mix * 1.35 - q.r * .35)); x = lerp(from(q, i)[0], x, m); y = lerp(from(q, i)[1], y, m); }
          const X = f[0] + (x - f[0]) * s, Y = f[1] + (y - f[1]) * s;
          if (X < -sz || Y < -sz || X > W + sz || Y > H + sz) continue;
          ctx.fillRect(X - sz / 2, Y - sz / 2, sz, sz);
        }
      }

      let state = { e: 0, h: 0, x: 0 }, lastStory = -1, yawT = 0, lastT = 0;
      const sizeObs = () => { layout(); };
      addEventListener('resize', () => { clearTimeout(sizeObs.t); sizeObs.t = setTimeout(sizeObs, 150); });
      layout();
      document.fonts?.ready.then(layout);
      const story = i => { if (i !== lastStory) { lastStory = i; api.showStory(i); } };
      const edu = document.querySelector('.edu2'), stamp = document.getElementById('stamp'), logbook = document.querySelector('.logbook');

      function draw(t) {
        const { e, h, x } = state;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.clearRect(0, 0, W, H);
        cv.style.opacity = h < T.spin ? clamp(e * 1.5).toFixed(3) : 1; // fondu d'entrée sur le canevas entier (pas de traits semi-transparents qui se chevauchent)
        const dt = Math.min(.05, Math.max(0, t - lastT)); lastT = t;
        yawT += dt * .18;
        const yaw = yawT + h * 5;
        let showLog = 0;

        if (h < T.spin || (h >= T.spin && h < WORD0)) {
          // 1. la spirale couchée tourne, puis explose
          const m = clamp((h - T.spin) / (WORD0 - T.spin));
          if (m <= 0) drawSolidSpiral(yaw, 1);
          else {
            const w = words[0], sz0 = w.gap * .8;
            ctx.fillStyle = INK;
            const mm = eio(m);
            for (let i = 0; i < N; i++) {
              const q = P[i], sp = proj(q.s[0], q.s[1], yaw, tmp), tg = q.t[0];
              const burst = Math.sin(Math.PI * mm) * (60 + q.r * 260);
              const X = lerp(sp[0], tg[0], mm) + Math.cos(q.a) * burst, Y = lerp(sp[1], tg[1], mm) + Math.sin(q.a) * burst;
              const sz = lerp(Math.max(1.6, 4.2 * sp[2]), sz0, mm);
              ctx.fillRect(X - sz / 2, Y - sz / 2, sz, sz);
            }
          }
        } else if (h < WORDS_END) {
          // 2. les mots, et les passages par l'intérieur d'une lettre
          const local = h - WORD0, cyc = T.hold + T.trans, k = Math.min(ORDER.length - 1, Math.floor(local / cyc)), r = local - k * cyc;
          const w = words[k];
          if (r < T.hold || k === ORDER.length - 1) {
            const hp = clamp(r / T.hold);
            drawWordPixels(w, [W / 2, H / 2], 1);
            drawConstellation(w, ss(clamp(hp * 1.8)), 1);
            story(w.o.i); showLog = 1;
          } else {
            const u = (r - T.hold) / T.trans, nw = words[k + 1];
            const SMAX = 70;
            if (u < .5) {
              // on plonge dans la lettre de sortie : elle grossit jusqu'à ce qu'on soit « dans » son trou, tout blanc
              const zin = ss(u / .5), s = Math.pow(SMAX, zin), f = w.holes[w.o.out] || [W / 2, H / 2];
              drawWordPixels(w, f, s);
              drawConstellation(w, 1, 1 - clamp(u / .15));
            } else {
              // on ressort par la même lettre du mot suivant, pendant que les pixels arrivent pour le former
              const zout = ss((u - .5) / .5), s = Math.pow(SMAX, 1 - zout), f = nw.holes[nw.o.in] || [W / 2, H / 2];
              drawWordPixels(nw, f, s, q => { const tt = q.t[nw.idx]; return [tt[0] + Math.cos(q.a) * W * .7 * q.d, tt[1] + Math.sin(q.a) * H * .7 * q.d]; }, zout);
              drawConstellation(nw, 0, 0);
            }
          }
        } else if (h < REBUILT) {
          // 3. les pixels reconstruisent la spirale
          const m = eio(clamp((h - WORDS_END) / T.rebuild)), w = words[ORDER.length - 1], sz0 = w.gap * .8;
          ctx.fillStyle = INK;
          for (let i = 0; i < N; i++) {
            const q = P[i], sp = proj(q.s[0], q.s[1], yaw, tmp), tg = q.t[w.idx];
            const burst = Math.sin(Math.PI * m) * (60 + q.r * 260);
            const X = lerp(tg[0], sp[0], m) + Math.cos(q.a) * burst, Y = lerp(tg[1], sp[1], m) + Math.sin(q.a) * burst;
            const sz = lerp(sz0, Math.max(1.6, 4.2 * sp[2]), m);
            ctx.fillRect(X - sz / 2, Y - sz / 2, sz, sz);
          }
          if (m > .92) drawSolidSpiral(yaw, 1);
        } else {
          // 4. on plonge dans un trait noir de la spirale → écran noir
          const z = clamp((h - REBUILT) / T.dive), yawF = yaw;
          const pt = proj(QMAIN[QMAIN.length - 30][0], QMAIN[QMAIN.length - 30][1], yawF, [0, 0, 0]);
          const s = Math.pow(160, eio(z));
          ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-lerp(W / 2, pt[0], Math.min(1, z * 3)), -lerp(H / 2, pt[1], Math.min(1, z * 3)));
          drawSolidSpiral(yawF, 1);
          ctx.restore();
          if (z > .8) { ctx.globalAlpha = (z - .8) / .2; ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
        }
        if (x > 0 || h >= DIVE_END) { ctx.globalAlpha = Math.max(clamp(x * 3), h >= DIVE_END ? 1 : 0); ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }

        // carnet (histoire de la constellation) pendant les mots ; formation + tampon au moment de la spirale reconstruite
        if (logbook) logbook.style.opacity = (showLog * (mobile ? 0 : 1)).toFixed(2);
        const fin = clamp((h - (WORDS_END + T.rebuild * .5)) / .03) * (1 - clamp((h - REBUILT - .02) / .02));
        if (edu) edu.style.opacity = fin.toFixed(2);
        if (stamp) stamp.style.opacity = fin.toFixed(2);
      }

      return {
        update(e, h, x) { state = { e, h, x }; },
        frame(t) { draw(t / 1000); },
      };
    },
  };
})();
