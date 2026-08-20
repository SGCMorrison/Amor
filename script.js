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
    contador.textContent = `💜 Llevamos ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos juntos`;
  }
}

// Pétalos flotantes (orquídea)
function crearPetalo() {
  const petalo = document.createElement('div');
  petalo.classList.add('petalo');
  
  const emojis = ['🌸', '🌺', '💮', '🏵️'];
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