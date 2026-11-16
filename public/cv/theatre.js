/* Section « compétences » du CV : le théâtre.
 * Page blanche → les trois coups → un théâtre se dessine au trait → le rideau s'ouvre
 * → la caméra visite 6 lieux, un par famille de compétences → salut final.
 * Tout est en SVG (aucun moteur 3D). La « profondeur » vient de 3 calques qui zooment
 * à des vitesses différentes (fond, scène, salle).
 * API : CVTheatre.build(W, H, mobile) puis CVTheatre.render(e, h, x) à chaque scroll.
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ss = t => t * t * (3 - 2 * t);
  const eio = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const RED = '#c4161c';

  // Les lieux visités, dans l'ordre du spectacle. f = point visé (coordonnées du dessin 1600×1000), z = zoom.
  const AREAS = [
    { key: 'ticket', act: 'Prologue', place: 'La billetterie', fam: 'Intégrations', f: [200, 820], z: 1.75, win: [.275, .335], dt: 'dt-ticket', df: [800, 520],
      story: "Sans billetterie, pas de public. Stripe encaisse, un webhook confirme la place, l'e-mail part avec le billet : c'est le travail des intégrations.",
      skills: ['Stripe', 'Webhooks', 'SMTP', 'API tierces'] },
    { key: 'scene', act: 'Acte I', place: 'La scène', fam: 'Front-end', f: [800, 600], z: 1.8, win: [.38, .455], dt: 'dt-eye', df: [800, 540],
      story: "Tout ce que le public voit. Le front, c'est la mise en scène de l'interface : chaque techno est un comédien, et React tient le premier rôle.",
      skills: ['React 19', 'Next.js 15', 'TypeScript', 'Angular 19', 'VueJS', 'Tailwind', 'SCSS'] },
    { key: 'spots', act: 'Acte II', place: 'Les projecteurs', fam: 'Animation & UI', f: [800, 330], z: 1.6, win: [.48, .555],
      story: "La lumière guide le regard. GSAP, Motion et Lenis règlent les poursuites, et l'accessibilité veille à ce que toute la salle profite du spectacle.",
      skills: ['GSAP', 'Motion', 'Lenis', 'Responsive', 'Dark mode', 'Accessibilité'] },
    { key: 'flies', act: 'Acte III', place: 'Les coulisses', fam: 'Back-end', f: [800, 400], z: 1.9, win: [.58, .655], dt: 'dt-wings', df: [900, 470],
      story: "Invisibles depuis la salle, mais sans elles rien ne tient. Les décors pendent aux cintres, au bout de leurs cordes : Symfony, API Platform, Node.js…",
      skills: ['Symfony 6/7', 'API Platform', 'PHP objet', 'Node.js', '.NET C#', 'Java Spring', 'NextAuth'] },
    { key: 'prompt', act: 'Acte IV', place: 'Le trou du souffleur', fam: 'Données', f: [800, 750], z: 2.6, win: [.68, .755],
      story: "Le souffleur garde tout le texte de la pièce et le rend au mot près, à l'instant exact où on en a besoin. Exactement le rôle d'une base de données.",
      skills: ['PostgreSQL', 'MySQL', 'Prisma', 'Doctrine', 'Entity Framework'] },
    { key: 'regie', act: 'Acte V', place: 'La régie', fam: 'DevOps & qualité', f: [1440, 200], z: 2.1, win: [.78, .855], dt: 'dt-booth', df: [800, 520], dfm: [800, 680],
      story: "Au fond de la salle, la régie lance chaque effet au bon moment. Et avant la première, la générale : si les tests ne passent pas, le rideau ne se lève pas.",
      skills: ['Git', 'GitLab CI', 'Docker', 'PHPUnit', 'Jenkins', 'Agile'] },
  ];
  const OV = { f: [800, 520], z: 1 };
  // images-clés de la caméra (h = avancée dans la section)
  const KF = [
    [0, OV], [.245, OV], [.275, AREAS[0]], [.335, AREAS[0]], [.38, AREAS[1]], [.455, AREAS[1]], [.48, AREAS[2]], [.555, AREAS[2]],
    [.58, AREAS[3]], [.655, AREAS[3]], [.68, AREAS[4]], [.755, AREAS[4]], [.78, AREAS[5]], [.855, AREAS[5]], [.9, OV], [1, OV],
  ];

  let W = 0, H = 0, mobile = false, svg, L = {}, el = {}, built = false;
  const p = (d, cls = 'ink') => `<path class="${cls}" pathLength="1" d="${d}"/>`;

  /* ---------------- le dessin ---------------- */
  function drawBack() {
    let s = '';
    s += `<g data-draw="2">` + p('M430 300 H1170 V560 H430 Z');
    for (let y = 330; y < 560; y += 38) s += p(`M430 ${y} H1170`, 'ink faint');
    // coulisses : les châssis de chaque côté
    s += p('M345 300 L395 318 V578 L345 622 Z') + p('M395 318 L430 328 V560 L395 578') +
      p('M1255 300 L1205 318 V578 L1255 622 Z') + p('M1205 318 L1170 328 V560 L1205 578') + `</g>`;
    // cintres : porteuses et cordes, avec les compétences back-end accrochées
    s += `<g data-draw="5">` + p('M430 286 H1170', 'ink') + p('M430 262 H1170', 'ink faint') + `</g>`;
    s += `<g id="thRopes">`;
    AREAS[3].skills.forEach((sk, i) => {
      const x = 470 + i * 110, y = 372 + (i % 2) * 74;
      s += `<g class="rope" data-i="${i}" data-x="${x}">` +
        `<line class="ink rope-l" pathLength="1" x1="${x}" y1="110" x2="${x}" y2="${y - 21}"/>` +
        `<g class="tag"><rect class="paperf ink" pathLength="1" x="${x - 68}" y="${y - 21}" width="136" height="42" rx="6"/>` +
        `<text class="tx mono" x="${x}" y="${y + 6}" text-anchor="middle" font-size="17">${sk}</text></g></g>`;
    });
    return s + `</g>`;
  }

  function drawMid() {
    let s = '';
    // plancher en perspective + avant-scène
    s += `<g data-draw="1">` + p('M430 560 H1170 L1260 700 H340 Z') + p('M340 700 L300 760 Q800 800 1300 760 L1260 700');
    for (let i = 1; i < 10; i++) s += p(`M${430 + i * 74} 560 L${340 + i * 92} 700`, 'ink faint');
    s += `</g>`;
    // comédiens-compétences front-end, debout sur scène
    const FR = [['React 19', 800, 690, 44], ['Next.js 15', 545, 642, 30], ['TypeScript', 1055, 642, 30], ['Angular 19', 520, 598, 22], ['VueJS', 690, 598, 22], ['Tailwind', 870, 598, 22], ['SCSS', 1040, 598, 22]];
    s += `<g id="thFront">` + FR.map(([t, x, y, f], i) =>
      `<g class="actorw" data-i="${i}"><ellipse cx="${x}" cy="${y + 6}" rx="${f * 1.7}" ry="${f * .18}" class="shadow"/>` +
      `<text class="tx" x="${x}" y="${y}" text-anchor="middle" font-size="${f}">${t}</text></g>`).join('') + `</g>`;
    // le comédien
    s += `<g id="thActor" transform="translate(385 700)"><g class="body">` +
      `<circle class="ink" pathLength="1" cx="0" cy="-94" r="14"/>` + p('M0 -80 V-32') + p('M0 -32 L-14 0 M0 -32 L14 0') +
      p('M-24 -52 L0 -68 L26 -78') + p('M-12 -108 H12 L8 -118 H-8 Z') + `</g></g>`;
    // rideau (deux pans) + lambrequin
    const half = (x0, x1) => {
      let d = `M${x0} 262 H${x1} V700`;
      const n = 10, w = (x0 - x1) / n;
      for (let k = 0; k < n; k++) d += ` Q${x1 + w * (k + .5)} 712 ${x1 + w * (k + 1)} 700`;
      d += ' Z';
      let folds = '';
      for (let k = 1; k < n; k++) { const x = x1 + w * k; folds += p(`M${x} 266 Q${x + 9} 480 ${x} 698`, 'ink fold'); }
      return `<path class="curtainf" d="${d}"/>` + p(d) + folds;
    };
    s += `<g id="thCurtL" data-draw="3">` + half(340, 802) + `</g><g id="thCurtR" data-draw="3">` + half(1260, 798) + `</g>`;
    // trou du souffleur + le texte de la pièce qui se déroule
    s += `<g data-draw="4">` + p('M742 702 Q800 650 858 702') + p('M764 702 Q800 676 836 702') + `</g>`;
    s += `<g id="thScript"><rect class="paperf ink" pathLength="1" x="722" y="704" width="156" height="128" rx="3"/>` +
      AREAS[4].skills.map((sk, i) => `<text class="tx mono scriptl" x="734" y="${728 + i * 21}" font-size="13">${String(i + 1).padStart(2, '0')}. ${sk}</text>`).join('') + `</g>`;
    let val = 'M340 272 Q800 140 1260 272 L1260 304';
    for (let k = 0; k < 20; k++) { const x = 1260 - k * 46; val += ` Q${x - 23} 334 ${x - 46} 304`; }
    val += ' L340 272 Z';
    s += `<g data-draw="3"><path class="curtainf" d="${val}"/>${p(val)}</g>`;
    // cadre de scène
    s += `<g data-draw="0">` + p('M260 760 V110 H1340 V760') + p('M300 760 V150 H1300 V760') + p('M340 700 V272 Q800 140 1260 272 V700', 'ink thick') +
      `<circle class="ink" pathLength="1" cx="800" cy="128" r="13"/>` + p('M770 128 H690 M830 128 H910') + `</g>`;
    // pont lumière et projecteurs
    s += `<g data-draw="5">` + p('M420 176 H1180') + p('M420 192 H1180');
    for (let x = 420; x < 1180; x += 32) s += p(`M${x} 176 L${x + 16} 192 L${x + 32} 176`, 'ink faint');
    [520, 800, 1080].forEach(x => { s += p(`M${x} 192 V202 M${x - 14} 202 H${x + 14} L${x + 10} 232 H${x - 10} Z`); });
    s += `</g>`;
    s += `<g id="thBeams">` + [520, 800, 1080].map((x, i) =>
      `<g class="beam" data-i="${i}" data-x="${x}"><path class="beamf"/>` +
      AREAS[2].skills.slice(i * 2, i * 2 + 2).map((sk, j) => `<text class="tx beamt" font-size="${22 - j * 3}" text-anchor="middle">${sk}</text>`).join('') + `</g>`).join('') + `</g>`;
    return s;
  }

  function drawFront() {
    let s = '';
    // balcons
    s += `<g data-draw="2">` + p('M0 300 Q130 334 252 292') + p('M0 326 Q130 360 252 318') + p('M0 470 Q130 504 252 462') + p('M0 496 Q130 530 252 488') +
      p('M1600 470 Q1470 504 1348 462') + p('M1600 496 Q1470 530 1348 488');
    for (let x = 20; x < 250; x += 26) { s += p(`M${x} ${306 + Math.sin(x / 80) * 6} V${330 + Math.sin(x / 80) * 6}`, 'ink faint'); s += p(`M${x} ${476 + Math.sin(x / 80) * 6} V${500 + Math.sin(x / 80) * 6}`, 'ink faint'); }
    s += `</g>`;
    // fauteuils
    s += `<g data-draw="1">`;
    for (let r = 0; r < 3; r++) {
      const y = 870 + r * 54;
      for (let x = 320 + r * 22; x < 1560 - r * 22; x += 58) {
        const yy = y + Math.pow((x - 940) / 700, 2) * -18;
        s += p(`M${x - 21} ${yy} V${yy - 30} Q${x - 21} ${yy - 42} ${x - 9} ${yy - 42} H${x + 9} Q${x + 21} ${yy - 42} ${x + 21} ${yy - 30} V${yy}`);
      }
    }
    s += `</g>`;
    // régie, au fond de la salle
    s += `<g data-draw="5"><rect class="paperf ink" pathLength="1" x="1360" y="104" width="212" height="164" rx="6"/>` +
      p('M1376 120 H1556 V218 H1376 Z') + p('M1376 230 H1556 V256 H1376 Z');
    for (let i = 0; i < 8; i++) s += `<circle class="ink" pathLength="1" cx="${1392 + i * 21}" cy="243" r="4"/>`;
    s += `<text class="tx mono" x="1466" y="96" text-anchor="middle" font-size="12" letter-spacing="3">RÉGIE</text></g>`;
    s += `<g id="thCues">` + AREAS[5].skills.map((sk, i) =>
      `<g class="cue" data-i="${i}"><text class="tx mono" x="1386" y="${138 + i * 14}" font-size="10.5">TOP ${i + 1} · ${sk}</text>` +
      `<text class="tx mono ok" x="1546" y="${138 + i * 14}" font-size="10.5" text-anchor="end">✓</text></g>`).join('') + `</g>`;
    // billetterie
    s += `<g data-draw="4"><rect class="paperf ink" pathLength="1" x="55" y="702" width="190" height="282"/>` +
      p('M40 704 L150 650 L260 704') + p('M86 744 H214 V832 H86 Z') + p('M70 844 H230');
    for (let x = 102; x < 214; x += 16) s += p(`M${x} 744 V832`, 'ink faint');
    s += `<text class="tx mono" x="150" y="694" text-anchor="middle" font-size="12" letter-spacing="2">BILLETTERIE</text></g>`;
    s += `<g id="thTickets">` + AREAS[0].skills.map((sk, i) =>
      `<g class="ticket" data-i="${i}"><g transform="translate(${236 + (i % 2) * 18} ${742 + i * 56}) rotate(${-5 + i * 3})">` +
      `<path class="paperf ink" pathLength="1" d="M0 0 H214 V13 A8 8 0 0 0 214 29 V42 H0 V29 A8 8 0 0 0 0 13 Z"/>` +
      `<line class="perf" x1="170" y1="4" x2="170" y2="38"/>` +
      `<text class="tx" x="16" y="28" font-size="16">${sk}</text>` +
      `<text class="tx mono" x="192" y="25" font-size="9" text-anchor="middle" fill="${RED}">ADMIS</text></g></g>`).join('') + `</g>`;
    return s;
  }

  /* ---------------- les scènes détaillées (« plongeons ») ----------------
   * Chacune est dessinée dans le même repère 1600×1000. Quand la caméra arrive sur un lieu,
   * la vue d'ensemble zoome très loin et s'efface, la scène détaillée arrive en se posant. */
  const solid = (d, cls = 'solid') => `<path class="${cls}" d="${d}"/>`;

  // Prologue : le bureau du guichetier, les billets étalés à côté
  function dtTicket() {
    let s = `<g id="dt-ticket" class="dt">`;
    s += p('M300 70 H1300 V430 H300 Z', 'ink thick');
    for (let x = 346; x < 1300; x += 46) s += p(`M${x} 70 V430`, 'ink faint');
    s += p('M270 430 H1330 V462 H270 Z');
    s += `<text class="tx mono dtfade" x="800" y="50" text-anchor="middle" font-size="26" letter-spacing="12">BILLETTERIE</text>`;
    // la file d'attente, de l'autre côté de la vitre
    [[470, 330], [600, 305], [735, 338], [1060, 320]].forEach(([x, y]) => { s += `<circle class="ink faint" pathLength="1" cx="${x}" cy="${y}" r="34"/>` + p(`M${x - 62} 430 Q${x} ${y + 40} ${x + 62} 430`, 'ink faint'); });
    // le bureau
    s += p('M80 560 H1520 L1600 1000 H0 Z') + p('M80 560 L60 592 H1540 L1520 560');
    // lampe de bureau et son halo
    s += `<path class="glow" d="M392 540 L590 860 L250 880 Z"/>` + p('M200 712 Q260 690 320 712') + p('M260 700 L300 570 L372 512') + p('M330 478 L446 512 L404 566 Z');
    // la machine à billets
    s += `<rect class="paperf ink" pathLength="1" x="1160" y="470" width="250" height="170" rx="10"/>` +
      `<circle class="ink" pathLength="1" cx="1285" cy="470" r="62"/><circle class="ink" pathLength="1" cx="1285" cy="470" r="18"/>` + p('M1250 640 Q1270 700 1240 760 Q1215 810 1250 860');
    // le tampon et la tasse de café
    s += p('M1030 640 H1120 V612 H1030 Z') + p('M1060 612 V566 Q1075 546 1090 566 V612');
    s += p('M140 862 H222 V942 Q181 958 140 942 Z') + p('M222 882 Q256 902 222 926') + p('M166 842 Q156 816 172 794 M198 842 Q188 816 204 794', 'ink faint');
    // les billets = les compétences
    s += [[470, 600, -7], [790, 632, 4], [520, 778, 3], [870, 800, -5]].map(([x, y, r], i) =>
      `<g class="dtk" data-i="${i}"><g transform="translate(${x} ${y}) rotate(${r})">` +
      `<path class="paperf ink2" d="M0 0 H400 V40 A18 18 0 0 0 400 76 V118 H0 V76 A18 18 0 0 0 0 40 Z"/>` +
      `<line class="perf" x1="310" y1="8" x2="310" y2="110"/>` +
      `<text class="tx" x="30" y="76" font-size="46">${AREAS[0].skills[i]}</text>` +
      `<g class="dtstamp" transform="translate(356 60) rotate(-18)"><rect x="-44" y="-20" width="88" height="40" rx="5" fill="none" stroke="${RED}" stroke-width="3"/>` +
      `<text class="tx mono" x="0" y="8" text-anchor="middle" font-size="18" fill="${RED}">ADMIS</text></g></g></g>`).join('');
    return s + `</g>`;
  }

  // Acte I : on est assis dans la salle, des têtes devant soi, la scène en face
  function dtEye() {
    let s = `<g id="dt-eye" class="dt">`;
    s += p('M250 680 V130 Q800 10 1350 130 V680', 'ink thick') + p('M300 680 V170 Q800 64 1300 170 V680');
    s += `<path class="curtainf solidc" d="M300 176 Q340 420 300 680 H392 Q352 420 392 196 Z"/><path class="curtainf solidc" d="M1300 176 Q1260 420 1300 680 H1208 Q1248 420 1208 196 Z"/>`;
    let val = 'M300 170 Q800 64 1300 170 V214';
    for (let k = 0; k < 22; k++) { const x = 1300 - k * (1000 / 22); val += ` Q${x - 500 / 22} 246 ${x - 1000 / 22} 214`; }
    s += `<path class="curtainf solidc" d="${val} Z"/>`;
    s += p('M300 680 H1300 L1390 760 H210 Z');
    for (let i = 1; i < 12; i++) s += p(`M${300 + i * 83} 680 L${210 + i * 98} 760`, 'ink faint');
    s += [560, 800, 1040].map((x, i) => `<path class="beamf dtbeam" data-i="${i}" d="M${x - 14} 200 L${x - 180} 690 L${x + 180} 690 L${x + 14} 200 Z"/>`).join('');
    const W3 = [['Angular 19', 440, 588, 28], ['VueJS', 655, 588, 28], ['Tailwind', 900, 588, 28], ['SCSS', 1140, 588, 28], ['Next.js 15', 520, 646, 46], ['TypeScript', 1085, 646, 46], ['React 19', 800, 712, 70]];
    s += W3.map(([t, x, y, f], i) => `<g class="dtw" data-i="${i}"><ellipse class="shadow" cx="${x}" cy="${y + 8}" rx="${f * 1.8}" ry="${f * .18}"/><text class="tx" x="${x}" y="${y}" text-anchor="middle" font-size="${f}">${t}</text></g>`).join('');
    // public au premier plan, en silhouettes
    [[210, 905, 92], [640, 940, 104], [1120, 918, 98], [1500, 900, 88]].forEach(([x, y, r]) => {
      s += `<ellipse class="solid" cx="${x}" cy="${y + r * 1.25}" rx="${r * 1.9}" ry="${r * .9}"/><circle class="solid" cx="${x}" cy="${y}" r="${r}"/>`;
    });
    return s + `</g>`;
  }

  // Acte III : dans les coulisses, le jeu de cordes
  function dtWings() {
    let s = `<g id="dt-wings" class="dt">`;
    s += p('M0 900 H1600');
    for (let y = 60; y < 900; y += 70) s += p(`M0 ${y} H660`, 'ink faint');
    // la lumière de la scène qui déborde dans la coulisse
    s += `<path class="glow" d="M1600 160 L1120 900 H1600 Z"/>`;
    // le râtelier à cordes (« pin rail ») : chevilles, cordes tendues, bobines
    s += p('M60 600 H640') + p('M60 634 H640');
    for (let x = 90; x < 640; x += 52) {
      s += p(`M${x + 8} 0 V600`, 'ink faint') + p(`M${x} 582 V690`) + `<ellipse class="ink" pathLength="1" cx="${x}" cy="716" rx="15" ry="36"/>`;
    }
    // l'échelle et le panneau SILENCE
    s += p('M1440 0 V900 M1530 0 V900');
    for (let y = 40; y < 900; y += 62) s += p(`M1440 ${y} H1530`);
    // les décors = les compétences, pendus aux cintres
    s += AREAS[3].skills.map((sk, i) => {
      const x = 760 + i * 100, y = 300 + (i % 3) * 150;
      return `<g class="dtrope" data-i="${i}" data-x="${x}"><line class="ink" pathLength="1" x1="${x}" y1="0" x2="${x}" y2="${y - 34}"/>` +
        `<path class="ink" pathLength="1" d="M${x - 16} ${y - 34} L${x} ${y - 52} L${x + 16} ${y - 34}"/>` +
        `<rect class="paperf ink2" x="${x - 104}" y="${y - 34}" width="208" height="68" rx="8"/>` +
        `<text class="tx mono" x="${x}" y="${y + 10}" text-anchor="middle" font-size="25">${sk}</text></g>`;
    }).join('');
    s += `<rect x="1200" y="104" width="200" height="70" rx="6" fill="${RED}" class="dtfade"/><text class="tx mono dtfade" x="1300" y="150" text-anchor="middle" font-size="28" fill="#fff" letter-spacing="4">SILENCE</text>`;
    s += p('M300 940 L344 962 M344 940 L300 962') + p('M980 940 L1024 962 M1024 940 L980 962');
    return s + `</g>`;
  }

  // Acte V : la régie en fond de salle, console interactive (les boutons changent la lumière sur scène)
  const LIGHTS = [['#FFE600', 'Ambre'], ['#c4161c', 'Rouge'], ['#2F54EB', 'Bleu'], ['#2BD07B', 'Vert']];
  function dtBooth() {
    let s = `<g id="dt-booth" class="dt">`;
    s += p('M70 40 H1530 V520 H70 Z', 'ink thick');
    s += p('M180 60 L120 220 M260 60 L170 300', 'ink faint');
    // la scène, au loin
    s += p('M560 380 V126 Q800 70 1040 126 V380') + `<path class="curtainf solidc" d="M560 130 Q575 260 560 380 H600 Q585 260 600 140 Z"/><path class="curtainf solidc" d="M1040 130 Q1025 260 1040 380 H1000 Q1015 260 1000 140 Z"/>`;
    s += p('M560 380 H1040 L1076 412 H524 Z');
    s += [680, 800, 920].map((x, i) => `<path class="beamf dtbeam" d="M${x - 6} 132 L${x - 70} 384 L${x + 70} 384 L${x + 6} 132 Z"/>`).join('');
    s += `<g transform="translate(800 380) scale(.55)">` + `<circle class="ink" pathLength="1" cx="0" cy="-94" r="14"/>` + p('M0 -80 V-32 M0 -32 L-14 0 M0 -32 L14 0 M-24 -52 L0 -68 L26 -78') + `</g>`;
    for (let r = 0; r < 3; r++) { let d = ''; for (let x = 110 + r * 30; x < 1500 - r * 30; x += 40) d += `M${x} ${470 - r * 26} q20 -26 40 0 `; s += p(d, 'ink faint'); }
    // la console
    s += p('M40 560 H1560 L1600 1000 H0 Z') + p('M40 560 L18 600 H1582 L1560 560');
    for (let i = 0; i < 8; i++) { const x = 600 + i * 52, k = 700 + ((i * 37) % 5) * 34; s += p(`M${x} 640 L${x - 8} 930`) + `<rect class="solid" x="${x - 20 - (k - 640) * .03}" y="${k}" width="34" height="18" rx="3"/>`; }
    s += `<text class="tx mono dtfade" x="790" y="975" text-anchor="middle" font-size="18" letter-spacing="4">FADERS PLATEAU</text>`;
    s += LIGHTS.map(([c, n], i) => `<g class="lbtn" data-c="${c}" role="button" tabindex="0" aria-label="Lumière ${n}">` +
      `<circle cx="${1110 + i * 118}" cy="770" r="48" fill="${c}" stroke="#0b0b0b" stroke-width="4"/>` +
      `<text class="tx mono" x="${1110 + i * 118}" y="850" text-anchor="middle" font-size="17">${n.toUpperCase()}</text></g>`).join('');
    s += `<text class="tx mono dtfade lhint" x="1287" y="680" text-anchor="middle" font-size="19">↓ À vous : changez la lumière</text>`;
    // la conduite (compétences DevOps) sur la console
    s += `<g transform="translate(80 600) rotate(-3)"><rect class="paperf ink2" x="0" y="0" width="420" height="370" rx="6"/>` +
      `<rect class="solid" x="150" y="-14" width="120" height="30" rx="6"/>` +
      `<text class="tx" x="28" y="62" font-size="32">Conduite</text>` +
      AREAS[5].skills.map((sk, i) => `<g class="dtcue" data-i="${i}"><text class="tx mono" x="28" y="${112 + i * 42}" font-size="24">TOP ${i + 1} · ${sk}</text>` +
        `<text class="tx mono ok" x="390" y="${112 + i * 42}" text-anchor="end" font-size="24" fill="${RED}">✓</text></g>`).join('') + `</g>`;
    return s + `</g>`;
  }

  function build(w, h, mob) {
    W = w; H = h; mobile = mob;
    if (!built) {
      svg = document.getElementById('thsvg');
      svg.innerHTML = `<g id="thOV"><g id="thL0">${drawBack()}</g><g id="thL1">${drawMid()}</g><g id="thL2">${drawFront()}</g></g>` +
        `<g id="thDT">${dtTicket()}${dtEye()}${dtWings()}${dtBooth()}</g>`;
      L = { back: svg.querySelector('#thL0'), mid: svg.querySelector('#thL1'), front: svg.querySelector('#thL2') };
      el = {
        draws: [...svg.querySelectorAll('[data-draw]')], ropes: [...svg.querySelectorAll('.rope')], fronts: [...svg.querySelectorAll('.actorw')],
        actor: svg.querySelector('#thActor'), body: svg.querySelector('#thActor .body'), curtL: svg.querySelector('#thCurtL'), curtR: svg.querySelector('#thCurtR'),
        script: svg.querySelector('#thScript'), beams: [...svg.querySelectorAll('.beam')], cues: [...svg.querySelectorAll('.cue')],
        tickets: [...svg.querySelectorAll('.ticket')], coups: [], coupsWrap: document.getElementById('coups'),
        pgAct: document.getElementById('pgAct'), pgTitle: document.getElementById('pgTitle'), pgText: document.getElementById('pgText'), pgSkills: document.getElementById('pgSkills'),
        prog: document.getElementById('programme'), edu: document.querySelector('.edu2'), stamp: document.getElementById('stamp'),
        ov: svg.querySelector('#thOV'), lids: [...document.querySelectorAll('#lids i')],
        dtk: [...svg.querySelectorAll('.dtk')], dtw: [...svg.querySelectorAll('.dtw')], dtrope: [...svg.querySelectorAll('.dtrope')], dtcue: [...svg.querySelectorAll('.dtcue')],
      };
      AREAS.forEach(a => { if (a.dt) a.g = svg.querySelector('#' + a.dt); });
      // console de la régie : chaque bouton change la couleur des projecteurs (dans la régie et sur la grande scène)
      svg.querySelectorAll('.lbtn').forEach(b => {
        const set = () => { svg.style.setProperty('--beam', b.dataset.c); svg.querySelectorAll('.lbtn').forEach(o => o.classList.toggle('on', o === b)); };
        b.addEventListener('click', set); b.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); set(); } });
      });
      // égaliseur : 29 points, plus hauts au centre, chacun avec sa propre amplitude
      const eq = document.getElementById('eq'), N = 29;
      for (let i = 0; i < N; i++) {
        const b = document.createElement('i'), c = 1 - Math.abs(i - (N - 1) / 2) / ((N - 1) / 2);
        b.dataset.a = (.25 + .75 * Math.pow(c, 1.4)) * (.55 + Math.random() * .45);
        b.style.animationDelay = (-Math.random()).toFixed(2) + 's';
        eq.appendChild(b); el.coups.push(b);
      }
      built = true;
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  }

  /* ---------------- la caméra ---------------- */
  function camAt(h) {
    let i = 0; while (i < KF.length - 2 && h > KF[i + 1][0]) i++;
    const [h0, A] = KF[i], [h1, B] = KF[i + 1];
    const t = eio(clamp((h - h0) / Math.max(1e-6, h1 - h0)));
    const za = A.z * (mobile ? 1.25 : 1), zb = B.z * (mobile ? 1.25 : 1);
    let z = Math.exp(lerp(Math.log(za), Math.log(zb), t));
    if (A !== B && A !== OV && B !== OV) z *= 1 - .28 * Math.sin(Math.PI * t); // on recule un peu pendant le trajet : effet travelling
    return { f: [lerp(A.f[0], B.f[0], t), lerp(A.f[1], B.f[1], t)], z };
  }

  let lastArea = -2;
  function setProgramme(i) {
    if (i === lastArea) return; lastArea = i;
    if (i < 0) {
      el.pgAct.textContent = i === -1 ? 'Ce soir' : 'Fin';
      el.pgTitle.textContent = i === -1 ? 'Six lieux, six familles' : 'Merci !';
      el.pgText.textContent = i === -1
        ? "Mon autre passion, c'est le théâtre. Ce soir, chaque partie de la salle joue une famille de compétences : suivez la caméra."
        : "Le rideau tombe. Formation, certification et entrées libres ci-dessous.";
      el.pgSkills.textContent = '';
      return;
    }
    const a = AREAS[i];
    el.pgAct.textContent = `${a.act} · ${a.place}`; el.pgTitle.textContent = a.fam; el.pgText.textContent = a.story;
    el.pgSkills.textContent = a.skills.join(' · ');
  }

  function render(e, h, x) {
    if (!built) return;
    const base = Math.min(W / 1600, H / 1000) * (mobile ? 1 : .84);
    const C = [W * (mobile ? .5 : .44), H * (mobile ? .42 : .6)];
    const cam = camAt(h);
    // plongeon : quand la caméra est arrivée sur un lieu « détaillé », on zoome très loin dans la vue d'ensemble
    // pendant que la scène détaillée arrive en se posant ; au départ, c'est l'inverse.
    let deep = 0;
    AREAS.forEach(a => {
      if (!a.g) return;
      const [w0, w1] = a.win, din = ss(clamp((h - w0) / .024)), out = ss(clamp((h - (w1 - .02)) / .02)), D = din * (1 - out);
      a.D = D; a.din = din; a.out = out; deep = Math.max(deep, D);
      a.g.style.opacity = D.toFixed(3); a.g.style.visibility = D > .005 ? 'visible' : 'hidden';
      if (D > .005) {
        const sc = (mobile ? W / (a.dfm ? 1640 : 1250) : base * 1.1) * lerp(.42, 1, eio(din)) * lerp(1, 2.1, out * out);
        const f = mobile && a.dfm ? a.dfm : a.df;
        a.g.setAttribute('transform', `translate(${(C[0] - f[0] * sc).toFixed(2)} ${(C[1] - f[1] * sc).toFixed(2)}) scale(${sc.toFixed(5)})`);
        a.g.style.setProperty('--d', (1 - clamp((h - w0 - .004) / .026)).toFixed(4));
      }
    });
    el.ov.style.opacity = (1 - deep).toFixed(3);
    const zMul = Math.exp(deep * 1.7);
    [[L.back, .82], [L.mid, 1], [L.front, 1.22]].forEach(([g, k]) => {
      const S = base * Math.pow(cam.z * zMul, k) * (1 + x * x * (k * 1.5)); // sortie : on fonce dans la salle
      g.setAttribute('transform', `translate(${(C[0] - cam.f[0] * S).toFixed(2)} ${(C[1] - cam.f[1] * S).toFixed(2)}) scale(${S.toFixed(5)})`);
    });

    // 1. les trois coups
    // chaque coup envoie une impulsion qui retombe : les points s'étirent puis redeviennent des points
    let imp = 0, knocks = 0;
    [.012, .028, .044].forEach(tk => { if (h >= tk) { knocks++; const d = (h - tk) / .014; imp = Math.max(imp, d < 1 ? Math.pow(1 - d, 2) : 0); } });
    const maxH = Math.min(220, H * .28);
    el.coups.forEach((b, i) => {
      const a = +b.dataset.a, wob = Math.sin(h * 900 + i * 1.7) * .18;
      b.style.height = (10 + imp * maxH * a * (1 + wob)).toFixed(1) + 'px';
    });
    el.coupsWrap.dataset.k = knocks;
    const cw = 1 - ss(clamp((h - .06) / .02));
    el.coupsWrap.style.opacity = (cw * clamp(e * 3)).toFixed(3); el.coupsWrap.style.visibility = cw > .01 ? 'visible' : 'hidden';

    // 2. le théâtre se dessine, groupe par groupe
    el.draws.forEach(g => { const k = +g.dataset.draw; g.style.setProperty('--d', (1 - clamp((h - .07 - k * .026) / .05)).toFixed(4)); });
    const red = ss(clamp((h - .22) / .025));
    svg.style.setProperty('--curtain', red.toFixed(3)); // rideau totalement opaque

    // 3. rideau : s'ouvre pour l'acte I, retombe pour le salut
    const open = ss(clamp((h - .34) / .04)) * (1 - ss(clamp((h - .945) / .035)));
    const sx = (1 - open * .84).toFixed(4);
    el.curtL.setAttribute('transform', `translate(340 0) scale(${sx} 1) translate(-340 0)`);
    el.curtR.setAttribute('transform', `translate(1260 0) scale(${sx} 1) translate(-1260 0)`);

    // quel lieu est « en scène » ?
    let active = h < .25 ? -1 : h > .88 ? -3 : -2, rv = 0;
    AREAS.forEach((a, i) => { if (h >= a.win[0] - .01 && h <= a.win[1] + .005) { active = i; rv = ss(clamp((h - a.win[0]) / .03)) * (1 - ss(clamp((h - a.win[1] + .012) / .015))); } });
    if (active >= -1 || active === -3) setProgramme(active);
    el.prog.style.opacity = (clamp((h - .07) / .03) * (1 - x)).toFixed(3);
    const R = (i, n) => clamp(rv * (n + 1.2) - i * .9 / Math.max(1, n) * n * .35);

    // billetterie : les billets sortent du guichet
    // révélation dans les scènes détaillées
    const RD = (a, i, n) => clamp(ss(clamp((h - a.win[0] - .026) / .03)) * (n + 1.2) - i * .32) * (1 - a.out);
    const A0 = AREAS[0], A1 = AREAS[1], A3 = AREAS[3], A5 = AREAS[5];
    el.dtk.forEach((t, i) => {
      const r = A0.D > 0 ? RD(A0, i, 4) : 0, st = clamp(r * 2.2 - 1.2);
      t.style.opacity = r; t.style.transform = `translate(${((1 - r) * 160).toFixed(1)}px, ${((1 - r) * -40).toFixed(1)}px)`;
      const sp = t.querySelector('.dtstamp'); sp.style.opacity = st; sp.style.transform = `scale(${(1 + (1 - st) * 1.4).toFixed(3)})`; sp.style.transformBox = 'fill-box'; sp.style.transformOrigin = 'center';
    });
    el.dtw.forEach((t, i) => { const r = A1.D > 0 ? RD(A1, i, 7) : 0; t.style.opacity = r; t.style.transform = `translateY(${((1 - r) * 50).toFixed(1)}px)`; });
    el.dtrope.forEach((r, i) => {
      const rr = A3.D > 0 ? RD(A3, i, 7) : 0, x0 = +r.dataset.x;
      r.style.opacity = rr; r.setAttribute('transform', `rotate(${(Math.sin(h * 70 + i * 1.3) * 3.5 * rr).toFixed(2)} ${x0} 0) translate(0 ${((1 - rr) * -320).toFixed(1)})`);
    });
    el.dtcue.forEach((c, i) => { const r = A5.D > 0 ? RD(A5, i, 6) : 0; c.style.opacity = r; c.querySelector('.ok').style.opacity = clamp(r * 2 - 1); });
    // clignement d'œil quand on s'assoit dans la salle (acte I)
    const bump = (c, w) => Math.max(0, 1 - Math.abs(h - c) / w);
    const lid = A1.D > 0 ? Math.max(bump(A1.win[0] + .024, .009), .75 * bump(A1.win[0] + .05, .006)) : 0;
    el.lids.forEach(l => { l.style.height = (Math.pow(lid, .6) * 51).toFixed(2) + '%'; });
    // scène : les comédiens-compétences surgissent du plancher
    el.fronts.forEach((t, i) => { const r = h > .9 ? .3 * ss(clamp((h - .9) / .02)) : 0; t.style.opacity = r; t.style.transform = `translateY(${((1 - Math.min(1, r * 1.2)) * 40).toFixed(1)}px)`; });
    // projecteurs : faisceaux qui balaient la scène, avec les compétences dans la lumière
    const beamOn = clamp((h - .36) / .03) * (1 - clamp((h - .9) / .03));
    el.beams.forEach((b, i) => {
      const lx = +b.dataset.x, sweep = active === 2 ? Math.sin(h * 90 + i * 2.1) * 150 : 0, tx = 600 + i * 200 + sweep;
      b.querySelector('.beamf').setAttribute('d', `M${lx - 10} 232 L${tx - 95} 652 L${tx + 95} 652 L${lx + 10} 232 Z`);
      b.style.opacity = (beamOn * (active === 2 ? 1 : .45)).toFixed(3);
      b.querySelectorAll('.beamt').forEach((t, j) => {
        const f = .3 + j * .34, r = active === 2 ? R(i * 2 + j, 6) : 0;
        t.setAttribute('x', lerp(lx, tx, f).toFixed(1)); t.setAttribute('y', lerp(232, 652, f).toFixed(1)); t.style.opacity = r;
      });
    });
    // coulisses : les décors descendent des cintres et se balancent au bout des cordes
    el.ropes.forEach((r, i) => {
      const rr = 0, drop = -260, x0 = +r.dataset.x;
      r.style.opacity = rr; r.setAttribute('transform', `rotate(${(Math.sin(h * 70 + i * 1.3) * 4 * rr).toFixed(2)} ${x0} 110) translate(0 ${drop.toFixed(1)})`);
    });
    // souffleur : le texte se déroule
    const sr = active === 4 ? clamp(rv * 1.6) : 0;
    el.script.style.opacity = sr; el.script.setAttribute('transform', `translate(0 704) scale(1 ${sr.toFixed(3)}) translate(0 -704)`);
    // régie : les tops s'enchaînent et se cochent
    el.cues.forEach(c => { c.style.opacity = 0; });
    // le comédien : entre en scène, puis salue
    const enter = ss(clamp((h - .36) / .05));
    const bow = ss(clamp((h - .9) / .02)) * (1 - ss(clamp((h - .925) / .02)));
    el.actor.style.opacity = enter;
    el.actor.setAttribute('transform', `translate(${lerp(300, 385, enter).toFixed(1)} 700)`);
    el.body.setAttribute('transform', `rotate(${(bow * 38).toFixed(1)} 0 -32)`);

    // salut final : formation + tampon
    const fin = ss(clamp((h - .93) / .04)) * (1 - x);
    el.edu.style.opacity = fin.toFixed(3);
    const st = ss(clamp((h - .95) / .03));
    el.stamp.style.opacity = (st * (1 - x)).toFixed(3);
    el.stamp.style.transform = `scale(${(1 + Math.pow(1 - st, 2) * 2.2).toFixed(3)}) rotate(${(-12 + (1 - st) * 40).toFixed(1)}deg)`;
  }

  window.CVTheatre = { build, render, AREAS };
})();
