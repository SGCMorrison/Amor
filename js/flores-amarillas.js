/* ============================================================
   SECCIÓN: 21 de Septiembre · Flores Amarillas
   Lógica de la flor SVG, canvas de partículas y explosiones.
   ============================================================ */
(function () {
  'use strict';

  const stage = document.getElementById('faStage');
  const canvas = document.getElementById('faFx');
  if (!stage || !canvas) return;

  const ctx = canvas.getContext('2d');

  /* =========================================================
     1. FLOR PRINCIPAL (SVG generado)
     ========================================================= */
  (function buildHeroFlower () {
    const NS = 'http://www.w3.org/2000/svg';
    const back  = document.getElementById('faBackPetals');
    const front = document.getElementById('faFrontPetals');
    if (!back || !front) return;

    // Capa trasera: 12 pétalos grandes
    for (let i = 0; i < 12; i++) {
      const el = document.createElementNS(NS, 'ellipse');
      el.setAttribute('cx', 100);
      el.setAttribute('cy', 52);
      el.setAttribute('rx', 13);
      el.setAttribute('ry', 36);
      el.setAttribute('fill', 'url(#faPg2)');
      el.setAttribute('class', 'fa-petal');
      el.style.setProperty('--r', (i * 30) + 'deg');
      el.style.animationDelay = (i * 0.055) + 's';
      back.appendChild(el);
    }

    // Capa frontal: 10 pétalos más pequeños y luminosos
    for (let i = 0; i < 10; i++) {
      const el = document.createElementNS(NS, 'ellipse');
      el.setAttribute('cx', 100);
      el.setAttribute('cy', 62);
      el.setAttribute('rx', 10);
      el.setAttribute('ry', 27);
      el.setAttribute('fill', 'url(#faPg)');
      el.setAttribute('class', 'fa-petal');
      el.style.setProperty('--r', (i * 36 + 18) + 'deg');
      el.style.animationDelay = (0.25 + i * 0.055) + 's';
      front.appendChild(el);
    }
  })();


  /* =========================================================
     2. SPRITES PRE-RENDERIZADOS (mucho más rápido)
     ========================================================= */
  function makeFlowerSprite (petals, hue) {
    const S = 160;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    g.translate(S / 2, S / 2);
    const R = S * 0.40;

    g.shadowColor = `hsla(${hue}, 100%, 62%, .95)`;
    g.shadowBlur  = 16;

    for (let i = 0; i < petals; i++) {
      g.save();
      g.rotate((Math.PI * 2 / petals) * i);
      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(R * 0.35, -R * 0.52, R * 0.92, -R * 0.30, R, 0);
      g.bezierCurveTo(R * 0.92,  R * 0.30, R * 0.35,  R * 0.52, 0, 0);

      const grd = g.createRadialGradient(0, 0, 0, 0, 0, R);
      grd.addColorStop(0,    `hsl(${hue}, 100%, 82%)`);
      grd.addColorStop(0.55, `hsl(${hue}, 100%, 62%)`);
      grd.addColorStop(1,    `hsl(${hue - 12}, 100%, 48%)`);
      g.fillStyle = grd;
      g.fill();
      g.restore();
    }

    g.shadowBlur = 10;
    g.beginPath();
    g.arc(0, 0, R * 0.24, 0, Math.PI * 2);
    g.fillStyle = `hsl(${hue - 28}, 92%, 44%)`;
    g.fill();

    return c;
  }

  function makePetalSprite (hue) {
    const S = 120;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    g.translate(S / 2, S / 2);
    const R = S * 0.38;

    g.shadowColor = `hsla(${hue}, 100%, 62%, .9)`;
    g.shadowBlur  = 12;

    g.beginPath();
    g.moveTo(0, 0);
    g.bezierCurveTo(R * 0.40, -R * 0.62, R * 1.0, -R * 0.34, R * 1.15, 0);
    g.bezierCurveTo(R * 1.0,   R * 0.34, R * 0.40,  R * 0.62, 0, 0);

    const grd = g.createRadialGradient(0, 0, 0, 0, 0, R * 1.2);
    grd.addColorStop(0,   `hsl(${hue}, 100%, 85%)`);
    grd.addColorStop(0.6, `hsl(${hue}, 100%, 62%)`);
    grd.addColorStop(1,   `hsl(${hue - 14}, 100%, 48%)`);
    g.fillStyle = grd;
    g.fill();

    return c;
  }

  function makeGlowSprite () {
    const S = 64;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(S/2, S/2, 0, S/2, S/2, S/2);
    grd.addColorStop(0,    'rgba(255,240,170,1)');
    grd.addColorStop(0.25, 'rgba(255,205,60,.75)');
    grd.addColorStop(1,    'rgba(255,170,0,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, S, S);
    return c;
  }

  const HUES = [38, 43, 48, 53];
  const FLOWER_SPRITES = [];
  const PETAL_SPRITES  = [];

  HUES.forEach(h => {
    FLOWER_SPRITES.push(makeFlowerSprite(5, h));
    FLOWER_SPRITES.push(makeFlowerSprite(6, h));
    PETAL_SPRITES.push(makePetalSprite(h));
  });

  const GLOW = makeGlowSprite();
  const ALL_SPRITES = FLOWER_SPRITES.concat(PETAL_SPRITES);

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[(Math.random() * arr.length) | 0];


  /* =========================================================
     3. ESTADO Y FÁBRICAS DE PARTÍCULAS
     ========================================================= */
  let W = 0, H = 0, DPR = 1;
  let particles = [];
  let fireflies = [];
  let bursts    = [];

  function makeParticle (initial) {
    const isFlower = Math.random() < 0.58;
    const sprite   = isFlower ? pick(FLOWER_SPRITES) : pick(PETAL_SPRITES);

    return {
      sprite,
      isFlower,
      x: Math.random() * W,
      y: initial ? Math.random() * H : -120 - Math.random() * 160,
      size: isFlower ? rand(18, 50) : rand(9, 20),
      vy:   isFlower ? rand(20, 52) : rand(30, 70),
      vx:   rand(-14, 14),
      rot:  Math.random() * Math.PI * 2,
      vrot: rand(-1.3, 1.3),
      swayAmp:  rand(10, 38),
      swayFreq: rand(0.35, 1.0),
      phase: Math.random() * Math.PI * 2,
      alpha: rand(0.5, 1),
      t: 0
    };
  }

  function makeFirefly () {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: rand(6, 20),
      vy: rand(-16, -4),
      vx: rand(-8, 8),
      phase: Math.random() * Math.PI * 2,
      speed: rand(0.5, 1.6),
      base: rand(0.18, 0.6)
    };
  }


  /* =========================================================
     4. RESIZE
     ========================================================= */
  function resize () {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth;
    H = stage.clientHeight;
    canvas.width  = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const isSmall = W < 760;
    const count   = isSmall ? 38 : 78;
    const ffCount = isSmall ? 22 : 45;

    particles = Array.from({ length: count }, () => makeParticle(true));
    fireflies = Array.from({ length: ffCount }, makeFirefly);
    bursts = [];
  }


  /* =========================================================
     5. EXPLOSIÓN AL HACER CLIC / TAP
     ========================================================= */
  function burst (x, y) {
    const n = W < 760 ? 12 : 20;
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(60, 240);
      bursts.push({
        sprite: pick(ALL_SPRITES),
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 70,
        size: rand(12, 34),
        rot: Math.random() * 6.28,
        vrot: rand(-7, 7),
        life: 1,
        decay: 1 / rand(1.1, 2.0)
      });
    }
  }

  stage.addEventListener('pointerdown', e => {
    const r = stage.getBoundingClientRect();
    burst(e.clientX - r.left, e.clientY - r.top);
  });


  /* =========================================================
     6. BUCLE PRINCIPAL
     ========================================================= */
  let last = performance.now();

  function loop (now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.clearRect(0, 0, W, H);

    /* --- Luciérnagas (modo aditivo) --- */
    ctx.globalCompositeOperation = 'lighter';
    for (const f of fireflies) {
      f.phase += f.speed * dt;
      f.y += f.vy * dt;
      f.x += f.vx * dt + Math.sin(f.phase * 1.7) * 10 * dt;

      if (f.y < -40) { f.y = H + 40; f.x = Math.random() * W; }
      if (f.x < -40) f.x = W + 40;
      if (f.x > W + 40) f.x = -40;

      const a = f.base * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(f.phase * 2.4)));
      ctx.globalAlpha = a;
      ctx.drawImage(GLOW, f.x - f.size / 2, f.y - f.size / 2, f.size, f.size);
    }
    ctx.globalCompositeOperation = 'source-over';

    /* --- Flores y pétalos cayendo --- */
    for (const p of particles) {
      p.t += dt;
      p.y += p.vy * dt;
      p.x += (p.vx + Math.sin(p.t * p.swayFreq + p.phase) * p.swayAmp) * dt;
      p.rot += p.vrot * dt;

      if (p.y > H + 130) {
        Object.assign(p, makeParticle(false));
        continue;
      }
      if (p.x < -160) p.x = W + 160;
      if (p.x > W + 160) p.x = -160;

      ctx.globalAlpha = p.alpha;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    /* --- Explosiones --- */
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.vy += 300 * dt;
      b.vx *= 0.985;
      b.x  += b.vx * dt;
      b.y  += b.vy * dt;
      b.rot += b.vrot * dt;
      b.life -= b.decay * dt;

      if (b.life <= 0 || b.y > H + 200) {
        bursts.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = Math.max(b.life, 0);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.drawImage(b.sprite, -b.size / 2, -b.size / 2, b.size, b.size);
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }


  /* =========================================================
     7. ARRANQUE
     ========================================================= */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  requestAnimationFrame(loop);
})();