// Prototypes 3D de la section « compétences » du CV.
// Chargé seulement avec ?v=solaire | planetarium | galaxie. Piloté par le scroll :
//   update(e, h, x) — e : entrée (0→1), h : avancée dans la section (0→1), x : sortie vers le noir (0→1)
//   frame(t)        — appelé à chaque image tant que la section est à l'écran
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const COLORS = [0x4f8bff, 0xff7a45, 0x2bd07b, 0xc77dff, 0xffe600, 0x36d6e7];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = t => t * t * (3 - 2 * t);
const eout = t => 1 - Math.pow(1 - t, 3);

function dotTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.22, 'rgba(255,255,255,.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// Fond d'étoiles commun : une sphère de points
function starfield(scene, tex, n, radius, size = 1.2) {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = radius * (.85 + Math.random() * .15);
    const s = Math.sqrt(1 - u * u);
    pos.set([r * s * Math.cos(th), r * u, r * s * Math.sin(th)], i * 3);
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size, map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xdfe8ff }));
  scene.add(pts); return pts;
}

export async function create(kind, host, api) {
  const canvas = document.createElement('canvas'); canvas.className = 'gl3d'; host.prepend(canvas);
  const labels = document.createElement('div'); labels.className = 'l3dwrap'; host.appendChild(labels);
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 3000);
  const tex = dotTexture();
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  };
  resize(); addEventListener('resize', resize);

  const tmp = new THREE.Vector3();
  const mkLabel = (text, cls = '') => { const d = document.createElement('div'); d.className = 'l3d ' + cls; d.textContent = text; labels.appendChild(d); return d; };
  const place = (el, pos, op = 1) => {
    tmp.copy(pos).project(camera);
    if (tmp.z > 1 || op <= .01) { el.style.opacity = 0; return; }
    el.style.opacity = op.toFixed(3);
    el.style.transform = `translate(${((tmp.x + 1) / 2 * innerWidth).toFixed(1)}px,${((1 - tmp.y) / 2 * innerHeight).toFixed(1)}px)`;
  };
  let current = -1;
  const story = i => { if (i !== current && i >= 0) { current = i; api.showStory(i); } };

  const ctx = { scene, camera, renderer, tex, api, mkLabel, place, mobile, canvas, story };
  const S = await ({ solaire, planetarium, galaxie })[kind](ctx);
  let state = { e: 0, h: 0, x: 0 };
  return {
    update(e, h, x) { state = { e, h, x }; },
    frame(t) { S.frame(t / 1000, state); renderer.render(scene, camera); },
  };
}

/* ======================================================================
   1. SYSTÈME SOLAIRE — un soleil « Fullstack », une planète par famille,
      une lune par techno. La caméra visite les planètes au scroll.
   ====================================================================== */
function solaire({ scene, camera, tex, api, mkLabel, place, mobile, canvas, story }) {
  document.getElementById('h-skills').textContent = 'Mon système';
  scene.add(new THREE.AmbientLight(0x3a4a7a, .9));
  scene.add(new THREE.PointLight(0xfff1c0, 900, 0, 2));
  starfield(scene, tex, 2500, 400, 1.6);

  const sun = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 48), new THREE.MeshBasicMaterial({ color: 0xffe14a }));
  scene.add(sun);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffb300, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.scale.set(9, 9, 1); scene.add(glow);
  const sunLabel = mkLabel('Fullstack', 'sun');

  const planets = api.CONSTS.map((c, i) => {
    const R = 6 + i * 2.7, size = .5 + c.s.length * .075;
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 160 }, (_, k) => new THREE.Vector3(R * Math.cos(k / 160 * Math.PI * 2), 0, R * Math.sin(k / 160 * Math.PI * 2)))),
      new THREE.LineBasicMaterial({ color: 0x7d8cc4, transparent: true, opacity: .28 }));
    scene.add(ring);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 40, 40),
      new THREE.MeshStandardMaterial({ color: COLORS[i], roughness: .55, metalness: .1, emissive: COLORS[i], emissiveIntensity: .12 }));
    mesh.userData.i = i; scene.add(mesh);
    if (i === 1) { // Orion/back-end a droit à ses anneaux, façon Saturne
      const rg = new THREE.Mesh(new THREE.RingGeometry(size * 1.4, size * 2.1, 64), new THREE.MeshBasicMaterial({ color: 0xffc9a8, side: THREE.DoubleSide, transparent: true, opacity: .55 }));
      rg.rotation.x = -1.2; mesh.add(rg);
    }
    const moons = c.s.map((s, j) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(.09 + Math.max(0, 3 - s[2]) * .035, 16, 16), new THREE.MeshStandardMaterial({ color: 0xe6ecff, roughness: .8, emissive: 0x334466, emissiveIntensity: .4 }));
      scene.add(m);
      return { m, r: size + .55 + j * .3, sp: .7 - j * .06, ph: j * 1.9, tilt: .25 + j * .08, label: mkLabel(s[0], 'moon') };
    });
    return { c, R, size, mesh, a0: i * 1.15 + .4, speed: .05 / (1 + i * .3), moons, label: mkLabel(c.f, 'fam') };
  });

  // survol d'une planète → son histoire dans le carnet
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  canvas.addEventListener('pointermove', ev => {
    const r = canvas.getBoundingClientRect();
    mouse.set((ev.clientX - r.left) / r.width * 2 - 1, -((ev.clientY - r.top) / r.height * 2 - 1));
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(planets.map(p => p.mesh))[0];
    planets.forEach(p => p.mesh.material.emissiveIntensity = p.mesh === hit?.object ? .45 : .12);
    if (hit) story(hit.object.userData.i);
  });

  const cam = new THREE.Vector3(), look = new THREE.Vector3(), pp = new THREE.Vector3();
  const ppos = (p, t) => { const a = p.a0 + t * p.speed; return pp.set(p.R * Math.cos(a), 0, p.R * Math.sin(a)).clone(); };
  const overviewCam = new THREE.Vector3(0, mobile ? 52 : 30, mobile ? 30 : 34);

  return {
    frame(t, { e, h, x }) {
      sun.rotation.y = t * .1;
      const P = planets.map(p => ppos(p, t));
      planets.forEach((p, i) => {
        p.mesh.position.copy(P[i]); p.mesh.rotation.y = t * .4;
        p.moons.forEach(m => {
          const a = m.ph + t * m.sp;
          m.m.position.set(P[i].x + m.r * Math.cos(a), P[i].y + m.r * Math.sin(a) * m.tilt, P[i].z + m.r * Math.sin(a));
        });
      });

      // parcours : vue d'ensemble → planète 1 → … → 6 → vue d'ensemble
      const k = clamp((h - .14) / .72) * 5.999, i0 = Math.floor(k), fr = k - i0;
      const travel = i0 < 5 ? ss(clamp((fr - .62) / .38)) : 0;
      const focus = travel > .5 ? i0 + 1 : i0;
      const ov = Math.max(1 - ss(clamp((h - .03) / .11)), ss(clamp((h - .88) / .1)));
      const A = P[i0], B = P[Math.min(5, i0 + 1)];
      look.copy(A).lerp(B, travel);
      const sz = lerp(planets[i0].size, planets[Math.min(5, i0 + 1)].size, travel);
      const out = look.clone().setY(0).normalize();
      const side = new THREE.Vector3(-out.z, 0, out.x);
      cam.copy(look).addScaledVector(out, sz * (mobile ? 9 : 6) + 1.5).addScaledVector(side, sz * 2.5).add(new THREE.Vector3(0, sz * 2.4 + .8, 0));
      cam.lerp(overviewCam, ov);
      look.lerp(new THREE.Vector3(0, 0, 0), ov);
      cam.multiplyScalar(1 + (1 - eout(e)) * 1.8);                      // entrée : on arrive de loin
      cam.lerp(new THREE.Vector3(0, .6, 4.2), x * x);                    // sortie : on plonge dans le soleil
      camera.position.copy(cam); camera.lookAt(look);
      if (ov < .5) story(focus);

      place(sunLabel, sun.position, (1 - x) * clamp(e * 2));
      planets.forEach((p, i) => {
        place(p.label, p.mesh.position, clamp(e * 2) * (1 - x) * (ov > .5 ? 1 : i === focus ? 1 : .35));
        p.moons.forEach(m => place(m.label, m.m.position, (1 - ov) * (i === focus ? 1 : 0) * (1 - x)));
      });
    },
  };
}

/* ======================================================================
   2. PLANÉTARIUM — on est au centre de la sphère céleste. Les 6 vraies
      constellations sont placées tout autour ; la caméra tourne vers chacune.
   ====================================================================== */
function planetarium({ scene, camera, tex, api, mkLabel, place, mobile, story }) {
  document.getElementById('h-skills').textContent = 'Mon planétarium';
  starfield(scene, tex, mobile ? 2500 : 5000, 200, 1.4);

  // Voie lactée : une bande dense de points le long d'un grand cercle incliné
  const n = mobile ? 5000 : 11000, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
  const tilt = new THREE.Matrix4().makeRotationZ(.55).multiply(new THREE.Matrix4().makeRotationX(.35));
  const v = new THREE.Vector3(), c1 = new THREE.Color(0x9fb4ff), c2 = new THREE.Color(0xffe0b0);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, spread = (Math.random() + Math.random() + Math.random() - 1.5) * .22;
    v.set(Math.cos(a), spread, Math.sin(a)).normalize().multiplyScalar(190).applyMatrix4(tilt);
    pos.set([v.x, v.y, v.z], i * 3);
    const c = c1.clone().lerp(c2, Math.random()); col.set([c.r, c.g, c.b], i * 3);
  }
  const mg = new THREE.BufferGeometry(); mg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); mg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Points(mg, new THREE.PointsMaterial({ size: 1.1, map: tex, vertexColors: true, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending })));

  const R = 100, span = mobile ? 26 : 40, up = new THREE.Vector3(0, 1, 0);
  const consts = api.CONSTS.map((c, i) => {
    const yaw = i * Math.PI / 3, pitch = i % 2 ? .16 : -.06;
    const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    const right = new THREE.Vector3().crossVectors(dir, up).normalize(), upv = new THREE.Vector3().crossVectors(right, dir);
    const spos = c.s.map(s => dir.clone().multiplyScalar(R).addScaledVector(right, (s[3] - .5) * span).addScaledVector(upv, (.5 - s[4]) * span * .75).normalize().multiplyScalar(R));
    const sprites = c.s.map((s, j) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: s[2] < 1 ? 0xfff2c4 : 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      const k = Math.max(1.4, 5.4 - s[2] * .9); sp.scale.set(k, k, 1); sp.position.copy(spos[j]); scene.add(sp); return sp;
    });
    const lp = []; c.e.forEach(([a, b]) => lp.push(spos[a], spos[b]));
    const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lp), new THREE.LineBasicMaterial({ color: 0xffe600, transparent: true, opacity: 0 }));
    scene.add(lines);
    const center = dir.clone().multiplyScalar(R).addScaledVector(upv, span * .5);
    return { c, yaw, pitch, sprites, lines, spos, center, name: mkLabel(c.n + ' · ' + c.f, 'cst'), labels: c.s.map(s => mkLabel(s[0], 'star')) };
  });

  return {
    frame(t, { e, h, x }) {
      const k = clamp((h - .1) / .78) * 5.999, i0 = Math.floor(k), fr = k - i0;
      const travel = i0 < 5 ? ss(clamp((fr - .6) / .4)) : 0;
      const focus = travel > .5 ? i0 + 1 : i0;
      const A = consts[i0], B = consts[Math.min(5, i0 + 1)];
      let yaw = lerp(A.yaw, B.yaw, travel), pitch = lerp(A.pitch, B.pitch, travel) + Math.sin(t * .15) * .01;
      // entrée : on lève les yeux vers le ciel, puis on redescend face à la première constellation
      pitch = lerp(1.25, pitch, eout(e)); yaw += (1 - eout(e)) * -.8;
      // sortie : le ciel se met à tourner très vite
      yaw += x * x * 4;
      camera.fov = lerp(lerp(78, mobile ? 70 : 52, ss(clamp(h / .12))), 30, x); camera.updateProjectionMatrix();
      camera.position.set(0, 0, 0);
      camera.lookAt(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
      story(focus);
      consts.forEach((c, i) => {
        const on = i === focus ? 1 : 0;
        const draw = clamp(e * 1.6 - .3);
        c.lines.material.opacity = lerp(c.lines.material.opacity, (on ? .95 : .22) * draw, .12);
        c.sprites.forEach((s, j) => s.material.opacity = (.75 + .25 * Math.sin(t * 2 + j * 1.7 + i)) * clamp(e * 2));
        place(c.name, c.center, (on ? 1 : .35) * draw * (1 - x));
        c.labels.forEach((l, j) => place(l, c.spos[j], on * draw * (1 - x)));
      });
    },
  };
}

/* ======================================================================
   3. GALAXIE — une galaxie spirale où brillent les 6 vraies constellations.
      Pour chaque famille : on zoome sur sa constellation, puis les étoiles
      de la galaxie viennent écrire les mots, qui deviennent du vrai texte net.
      Tout le mouvement des particules est calculé sur la carte graphique.
   ====================================================================== */
async function galaxie({ scene, camera, renderer, tex, api, mkLabel, place, mobile, story }) {
  document.getElementById('h-skills').textContent = 'Ma galaxie';
  starfield(scene, tex, 1200, 300, 1.1);
  try { await Promise.all([document.fonts.load('800 150px Syne'), document.fonts.load('500 40px "JetBrains Mono"')]); } catch (_) { /* polices de secours */ }

  // ---------- la galaxie (shader : rotation + morphing vers le texte) ----------
  const N = mobile ? 6000 : 14000;
  const gal = new Float32Array(N * 3), tgt = new Float32Array(N * 3), col = new Float32Array(N * 3), del = new Float32Array(N);
  const cIn = new THREE.Color(0xffe27a), cMid = new THREE.Color(0xffffff), cOut = new THREE.Color(0x5b8cff);
  for (let i = 0; i < N; i++) {
    const r = Math.pow(Math.random(), 1.35) * 11.5, arm = (i % 3) * Math.PI * 2 / 3, ang = arm + r * .55;
    const jit = () => Math.pow(Math.random(), 3) * (Math.random() < .5 ? 1 : -1) * (r * .22 + .3);
    gal.set([Math.cos(ang) * r + jit(), jit() * .3, Math.sin(ang) * r + jit()], i * 3);
    const c = (r < 3.5 ? cIn.clone().lerp(cMid, r / 3.5) : cMid.clone().lerp(cOut, clamp((r - 3.5) / 8)));
    col.set([c.r, c.g, c.b], i * 3);
    del[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(gal, 3));
  geo.setAttribute('aTgt', new THREE.BufferAttribute(tgt, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aDelay', new THREE.BufferAttribute(del, 1));
  const U = {
    uTex: { value: tex }, uRot: { value: 0 }, uMorph: { value: 0 }, uGrow: { value: 1 }, uBoom: { value: 1 },
    uSize: { value: mobile ? .11 : .085 }, uScale: { value: 1 }, uDim: { value: 1 }, uFade: { value: 1 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute vec3 aTgt; attribute vec3 aColor; attribute float aDelay;
      uniform float uRot, uMorph, uGrow, uBoom, uSize, uScale;
      varying vec3 vColor; varying float vM;
      void main() {
        float c = cos(uRot), s = sin(uRot);
        vec3 g = vec3(position.x * c - position.z * s, position.y, position.x * s + position.z * c) * uGrow;
        float m = smoothstep(0., 1., clamp(uMorph * 1.5 - aDelay * .5, 0., 1.));
        // trajectoire courbe : les étoiles « tourbillonnent » vers les lettres
        vec3 p = mix(g, aTgt, m) + vec3(0., 0., sin(m * 3.1416) * (aDelay - .5) * 6.);
        vColor = mix(aColor, vec3(1., .96, .8), m * .7); vM = m;
        vec4 mv = modelViewMatrix * vec4(p * uBoom, 1.);
        gl_PointSize = uSize * uScale / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uTex; uniform float uDim, uFade;
      varying vec3 vColor; varying float vM;
      void main() {
        float a = texture2D(uTex, gl_PointCoord).a;
        gl_FragColor = vec4(vColor, a * mix(1., uDim, vM) * uFade);
      }`,
  });
  const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; scene.add(pts);

  // ---------- les 6 constellations, posées dans le disque et plus brillantes ----------
  const galaxyGroup = new THREE.Group(); scene.add(galaxyGroup);
  const consts = api.CONSTS.map((c, i) => {
    const a = i * Math.PI / 3 + .5, rr = 6.2 + (i % 2) * 1.6, ax = Math.cos(a) * rr, az = Math.sin(a) * rr;
    const local = c.s.map(s => new THREE.Vector3(ax + (s[3] - .5) * 3.4, .25, az + (s[4] - .5) * 2.6));
    const sprites = c.s.map((s, j) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: s[2] < 1 ? 0xfff0b8 : 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      const k = Math.max(.2, .58 - s[2] * .08); sp.scale.set(k, k, 1); sp.position.copy(local[j]); galaxyGroup.add(sp); return sp;
    });
    const lp = []; c.e.forEach(([x, y]) => lp.push(local[x], local[y]));
    const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lp), new THREE.LineBasicMaterial({ color: 0xffe600, transparent: true, opacity: 0 }));
    galaxyGroup.add(lines);
    const center = new THREE.Vector3(ax, .25, az);
    return { c, sprites, lines, local, center, name: mkLabel(`${c.n} · ${c.f}`, 'cst'), labels: c.s.map(s => mkLabel(s[0], 'star')) };
  });

  // ---------- le texte : échantillonné en particules ET rendu en vrai texte HTML par-dessus ----------
  const CW = mobile ? 800 : 1500, CH = mobile ? 760 : 460, PXW = 56;
  const layoutOf = c => {
    const skills = c.s.map(s => s[0]);
    const lines = mobile ? [skills.slice(0, 2), skills.slice(2, 4), skills.slice(4)].filter(l => l.length)
      : [skills.slice(0, Math.ceil(skills.length / 2)), skills.slice(Math.ceil(skills.length / 2))];
    return {
      title: { text: c.f, size: mobile ? 112 : 150, y: mobile ? .2 : .32 },
      lines: lines.map((l, j) => ({ text: l.join(' · '), size: 40, y: (mobile ? .46 : .64) + j * (mobile ? .11 : .14) })),
    };
  };
  const host = document.getElementById('sky');
  const words = [];
  const targets = api.CONSTS.map(c => {
    const L = layoutOf(c), cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
    const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `800 ${L.title.size}px Syne`; g.fillText(L.title.text, CW / 2, CH * L.title.y);
    g.font = `500 40px "JetBrains Mono"`; L.lines.forEach(l => g.fillText(l.text, CW / 2, CH * l.y));
    const d = g.getImageData(0, 0, CW, CH).data, px = [];
    for (let y = 0; y < CH; y += 3) for (let x = 0; x < CW; x += 3) if (d[(y * CW + x) * 4 + 3] > 120) px.push(x, y);
    const out = new Float32Array(N * 3), cnt = px.length / 2;
    for (let i = 0; i < N; i++) {
      const p = (i * 7919) % cnt;
      out.set([(px[p * 2] - CW / 2) / PXW + (Math.random() - .5) * .03, -(px[p * 2 + 1] - CH / 2) / PXW, (Math.random() - .5) * .2], i * 3);
    }
    // jumeau HTML, aux mêmes coordonnées que le canvas : il prend le relais quand les particules ont fini
    const w = document.createElement('div'); w.className = 'galword'; w.setAttribute('aria-hidden', 'true');
    w.style.width = CW + 'px'; w.style.height = CH + 'px';
    w.innerHTML = `<b style="top:${L.title.y * 100}%;font-size:${L.title.size}px">${L.title.text}</b>` +
      L.lines.map(l => `<span style="top:${l.y * 100}%;font-size:${l.size}px">${l.text}</span>`).join('');
    host.appendChild(w); words.push(w);
    return out;
  });
  // les cibles sont en unités « canvas » : on les met à l'échelle de l'écran (fit) en les chargeant
  let tgtIndex = -1, tgtFit = 0;
  const useTarget = i => {
    if (i === tgtIndex && tgtFit === fit) return;
    tgtIndex = i; tgtFit = fit;
    const s = targets[i]; for (let j = 0; j < s.length; j++) tgt[j] = s[j] * fit;
    geo.attributes.aTgt.needsUpdate = true;
  };

  // échelle : le texte doit tenir dans l'écran quand la caméra est en face, à z = 22
  const CAMZ = 22;
  let fit = 1;
  const resize = () => {
    const visH = 2 * CAMZ * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), visW = visH * camera.aspect;
    fit = Math.min(1, visW * .82 / (CW / PXW), visH * .5 / (CH / PXW));
    U.uScale.value = innerHeight / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * renderer.getPixelRatio();
    const pxPerUnit = innerHeight / visH;
    words.forEach(w => { w.style.transform = `translate(-50%,-50%) scale(${(fit * pxPerUnit / PXW).toFixed(4)})`; });
  };
  resize(); addEventListener('resize', resize);

  const O = new THREE.Vector3(0, mobile ? 12 : 8.5, mobile ? 24 : 19), T = new THREE.Vector3(0, 0, CAMZ), ZERO = new THREE.Vector3();
  const camP = new THREE.Vector3(), camL = new THREE.Vector3(), cw = new THREE.Vector3(), focusP = new THREE.Vector3();

  return {
    frame(t, { e, h, x }) {
      const rot = t * .025 + h * 2.2;
      U.uRot.value = rot; galaxyGroup.rotation.y = -rot;
      U.uGrow.value = lerp(.04, 1, eout(clamp(e * 1.2)));
      U.uBoom.value = 1 + x * x * 6; U.uFade.value = 1 - x * .6;

      // 6 créneaux : zoom sur la constellation → les étoiles écrivent les mots → texte net → retour
      const span = .84, hh = clamp((h - .08) / span), k = Math.min(5, Math.floor(hh * 6)), tt = hh * 6 - k;
      const inSlot = h > .08 && h < .08 + span;
      const a = inSlot ? ss(clamp(tt / .2)) : 0;               // zoom vers la constellation
      const b = inSlot ? ss(clamp((tt - .3) / .22)) : 0;       // la caméra se met en face, les étoiles volent
      const mIn = inSlot ? ss(clamp((tt - .28) / .26)) : 0;    // morphing vers le texte
      const c = inSlot ? ss(clamp((tt - .52) / .1)) : 0;       // le vrai texte apparaît
      const dOut = inSlot ? ss(clamp((tt - .86) / .14)) : 0;   // tout repart dans la galaxie
      useTarget(k);
      const m = mIn * (1 - dOut);
      U.uMorph.value = m;
      U.uDim.value = lerp(1, .16, c * (1 - dOut));

      const C = consts[k];
      cw.copy(C.center).applyAxisAngle(new THREE.Vector3(0, 1, 0), -rot);
      focusP.copy(cw).add(new THREE.Vector3(0, mobile ? 5 : 3.4, mobile ? 6 : 4.6));
      if (tt < .3 || !inSlot) { camP.copy(O).lerp(focusP, a); camL.copy(ZERO).lerp(cw, a); }
      else if (tt < .86) { camP.copy(focusP).lerp(T, b); camL.copy(cw).lerp(ZERO, b); }
      else { camP.copy(T).lerp(O, dOut); camL.copy(ZERO); }
      camP.multiplyScalar(1 + (1 - eout(e)) * 1.5);
      camera.position.copy(camP); camera.lookAt(camL);
      if (inSlot && a > .3) story(k);

      // constellations : toujours plus brillantes que la galaxie, traits seulement pour celle qu'on visite
      consts.forEach((cs, i) => {
        const on = inSlot && i === k ? a * (1 - b) : 0;
        cs.lines.material.opacity = .9 * on;
        cs.sprites.forEach((s, j) => s.material.opacity = (.75 + .25 * Math.sin(t * 2.2 + j * 1.7 + i)) * clamp(e * 2) * (1 - m * .85) * (1 - x));
        cs.center.y = .25;
        const wp = cs.center.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -rot);
        place(cs.name, wp.add(new THREE.Vector3(0, .9, 0)), on);
        cs.labels.forEach((l, j) => place(l, cs.local[j].clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -rot), on));
      });
      words.forEach((w, i) => { const o = i === k ? c * (1 - ss(clamp((tt - .8) / .06))) * (1 - x) : 0; w.style.opacity = o.toFixed(3); w.style.visibility = o > .01 ? 'visible' : 'hidden'; });
    },
  };
}
