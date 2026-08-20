// ============================================
// 1. FECHA DE INICIO (cámbiala por la tuya)
// ============================================
const fechaInicio = new Date('2026-07-17T00:00:00');

// ============================================
// 2. CONTADOR DE TIEMPO JUNTOS
// ============================================
function actualizarContador() {
  const hoy = new Date();
  const diferenciaMs = hoy - fechaInicio;

  if (diferenciaMs < 0) {
    document.getElementById('contador').textContent = '💜 ¡Nuestra historia está por comenzar!';
    return;
  }

  const segundosTotales = Math.floor(diferenciaMs / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  const contador = document.getElementById('contador');
  if (contador) {
    contador.textContent = `💜 Llevamos ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos juntos 💜`;
  }
}

// ============================================
// 3. PÉTALOS FLOTANTES (ORQUÍDEA)
// ============================================
function crearPetalo() {
  const petalo = document.createElement('div');
  petalo.classList.add('petalo');
  const emojis = ['🌸', '🌺', '🧘🏻‍♀️', '🥰'];
  petalo.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  petalo.style.left = Math.random() * 100 + 'vw';
  petalo.style.animationDuration = 5 + Math.random() * 5 + 's';
  petalo.style.fontSize = 18 + Math.random() * 20 + 'px';
  document.body.appendChild(petalo);

  setTimeout(() => petalo.remove(), 10000);
}

// Estilos de los pétalos (se inyectan automáticamente)
const estiloPetalos = document.createElement('style');
estiloPetalos.textContent = `
  .petalo {
    position: fixed;
    bottom: -60px;
    animation: subirPetalo linear forwards;
    pointer-events: none;
    z-index: 999;
    opacity: 0.9;
    filter: drop-shadow(0 0 3px rgba(150, 70, 180, 0.4));
  }
  @keyframes subirPetalo {
    to {
      transform: translateY(-110vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(estiloPetalos);

// ============================================
// 4. INICIAR CONTADOR Y PÉTALOS
// ============================================
actualizarContador();
setInterval(actualizarContador, 1000);
setInterval(crearPetalo, 1200);

// ============================================
// 5. CONTROL DE MÚSICA
// ============================================
const botonMusica = document.getElementById('botonMusica');
const musicaFondo = document.getElementById('musicaFondo');

if (botonMusica && musicaFondo) {
  botonMusica.addEventListener('click', () => {
    if (musicaFondo.paused) {
      musicaFondo.play();
      botonMusica.textContent = '🎶';
    } else {
      musicaFondo.pause();
      botonMusica.textContent = '🎵';
    }
  });
}

// ============================================
// 6. LIGHTBOX / MODAL PARA IMÁGENES
// ============================================
const modal = document.getElementById('modal-imagen');
const modalImg = document.getElementById('modal-img');
const modalCerrar = document.getElementById('modal-cerrar');

// Abrir modal al hacer clic en cualquier imagen de la galería
document.querySelectorAll('.tarjeta img').forEach(img => {
  img.addEventListener('click', () => {
    if (modal && modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('modal-abierto');
    }
  });
});

// Cerrar con la X
if (modalCerrar) {
  modalCerrar.addEventListener('click', () => {
    modal.classList.remove('modal-abierto');
  });
}

// Cerrar al hacer clic fuera de la imagen (fondo oscuro)
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('modal-abierto');
    }
  });
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('modal-abierto')) {
    modal.classList.remove('modal-abierto');
  }
});

// ============================================
// 7. CORAZÓN CON "TE AMO" + INICIALES "K & S"
// ============================================
function crearCorazonTexto() {
  const contenedor = document.getElementById('corazon-te-amo');
  if (!contenedor) return;

  const numPalabras = 80;
  const ancho = 350;
  const alto = 350;
  const escala = 10;

  // Generar las palabras "Te amo" en forma de corazón
  for (let i = 0; i < numPalabras; i++) {
    const t = (i / numPalabras) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const px = ancho / 2 + x * escala;
    const py = alto / 2 - y * escala;

    const span = document.createElement('span');
    span.textContent = 'Te amo';
    span.style.left = px + 'px';
    span.style.top = py + 'px';
    span.style.animationDelay = (i * 0.1) + 's';
    contenedor.appendChild(span);
  }

  // Agregar las iniciales K & S en el centro
  const iniciales = document.createElement('div');
  iniciales.id = 'iniciales-ks';
  iniciales.textContent = 'K & S';
  iniciales.style.position = 'absolute';
  iniciales.style.top = '50%';
  iniciales.style.left = '50%';
  iniciales.style.transform = 'translate(-50%, -50%)';
  iniciales.style.fontSize = '40px';
  iniciales.style.fontWeight = 'bold';
  iniciales.style.fontFamily = "'Georgia', 'Times New Roman', cursive";
  iniciales.style.color = '#FFD700';
  iniciales.style.textShadow = '0 0 30px rgba(200, 50, 200, 0.9), 0 0 60px rgba(255, 0, 150, 0.5)';
  iniciales.style.zIndex = '10';
  iniciales.style.pointerEvents = 'none';
  iniciales.style.letterSpacing = '8px';
  contenedor.appendChild(iniciales);
}

// Ejecutar la creación del corazón
crearCorazonTexto();