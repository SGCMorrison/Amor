// Cambia esta fecha por la del día en que empezaron su relación
const fechaInicio = new Date('2026-07-17T00:00:00');

function actualizarContador() {
  const hoy = new Date();
  const diferenciaMs = hoy - fechaInicio;

  // Si la fecha aún no llega, mostramos ceros
  if (diferenciaMs < 0) {
    document.getElementById('contador').textContent = '💜 ¡Nuestra historia está por comenzar!';
    return;
  }

  // Cálculo de días, horas, minutos y segundos
  const segundosTotales = Math.floor(diferenciaMs / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  // Construir el texto del contador
  const contador = document.getElementById('contador');
  if (contador) {
    contador.textContent = `💜 Llevamos ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos juntos 💜`;
  }
}

// Pétalos flotantes (orquídea)
function crearPetalo() {
  const petalo = document.createElement('div');
  petalo.classList.add('petalo');
  
  const emojis = ['🌸', '🌺', '🧘🏻‍♀️', '🥰'];
  petalo.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  petalo.style.left = Math.random() * 100 + 'vw';
  petalo.style.animationDuration = 5 + Math.random() * 5 + 's';
  petalo.style.fontSize = 18 + Math.random() * 20 + 'px';
  document.body.appendChild(petalo);

  setTimeout(() => {
    petalo.remove();
  }, 10000);
}

// Estilos para los pétalos flotantes
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

// Iniciar
actualizarContador();
setInterval(actualizarContador, 1000); // actualiza cada segundo
setInterval(crearPetalo, 1200); // pétalo cada 1.2 segundos

// Control de música
const botonMusica = document.getElementById('botonMusica');
const musicaFondo = document.getElementById('musicaFondo');

botonMusica.addEventListener('click', () => {
  if (musicaFondo.paused) {
    musicaFondo.play();
    botonMusica.textContent = '🎶';
  } else {
    musicaFondo.pause();
    botonMusica.textContent = '🎵';
  }
});

// Previsualización de imágenes (lightbox)
const modal = document.getElementById('modal-imagen');
const modalImg = document.getElementById('modal-img');
const modalCerrar = document.getElementById('modal-cerrar');

// Selecciona todas las imágenes de la galería
const imagenesGaleria = document.querySelectorAll('.tarjeta img');

imagenesGaleria.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;          // copia la ruta de la imagen
    modalImg.alt = img.alt;          // copia el texto alternativo
    modal.classList.add('modal-abierto');
  });
});

// Cerrar con el botón X
modalCerrar.addEventListener('click', () => {
  modal.classList.remove('modal-abierto');
});

// Cerrar al hacer clic fuera de la imagen (sobre el fondo oscuro)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('modal-abierto');
  }
});

// Cerrar con la tecla Escape (opcional)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('modal-abierto')) {
    modal.classList.remove('modal-abierto');
  }
});

// Corazón hecho con la palabra "Te amo"
function crearCorazonTexto() {
  const contenedor = document.getElementById('corazon-te-amo');
  const numPalabras = 80;        // cuántas veces se repetirá la palabra
  const ancho = 350;
  const alto = 350;
  const escala = 10;             // tamaño del corazón

  for (let i = 0; i < numPalabras; i++) {
    const t = (i / numPalabras) * Math.PI * 2;
    // Ecuación paramétrica del corazón
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    // Convertir a coordenadas del contenedor
    const px = ancho / 2 + x * escala;
    const py = alto / 2 - y * escala;

    const span = document.createElement('span');
    span.textContent = 'Te amo';
    span.style.left = px + 'px';
    span.style.top = py + 'px';
    span.style.animationDelay = (i * 0.1) + 's';  // retardo progresivo
    contenedor.appendChild(span);
  }
}

crearCorazonTexto();


function crearCorazonTexto() {
  const contenedor = document.getElementById('corazon-te-amo');
  const numPalabras = 80;
  const ancho = 350;
  const alto = 350;
  const escala = 10;

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

  // Tiempo total: número de palabras * retardo (0.1s) + duración de la animación (0.5s) + un pequeño margen
  const tiempoTotal = numPalabras * 100 + 500 + 200; // en milisegundos

  setTimeout(() => {
    contenedor.classList.add('girando');
  }, tiempoTotal);
}

