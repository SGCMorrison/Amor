const botonMusica = document.getElementById('botonMusica');
const audio = document.getElementById('musicaFondo');
const reproductorPopup = document.getElementById('reproductor-popup');
const btnCerrarReproductor = document.getElementById('cerrar-reproductor');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnPlayPausa = document.getElementById('btn-play-pausa');
const barraProgreso = document.getElementById('barra-progreso');
const tiempoActual = document.getElementById('tiempo-actual');
const tiempoTotal = document.getElementById('tiempo-total');
const portadaActual = document.getElementById('portada-actual');
const tituloCancion = document.getElementById('titulo-cancion');
const artistaCancion = document.getElementById('artista-cancion');

let indiceActual = 0;
let reproduciendo = false;

function cargarCancion(indice) {
  const cancion = playlist[indice];
  if (!cancion) return;
  audio.src = cancion.src;
  portadaActual.src = cancion.portada;
  tituloCancion.textContent = cancion.titulo;
  artistaCancion.textContent = cancion.artista;
  audio.addEventListener('loadedmetadata', function () {
    tiempoTotal.textContent = formatoTiempo(audio.duration);
  });
  if (reproduciendo) audio.play();
}

function formatoTiempo(segundos) {
  if (isNaN(segundos)) return '0:00';
  const min = Math.floor(segundos / 60);
  const sec = Math.floor(segundos % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  barraProgreso.value = progress;
  tiempoActual.textContent = formatoTiempo(audio.currentTime);
});

function togglePlay() {
  if (audio.paused) {
    audio.play();
    btnPlayPausa.textContent = '⏸';
    reproduciendo = true;
  } else {
    audio.pause();
    btnPlayPausa.textContent = '▶';
    reproduciendo = false;
  }
}

btnPlayPausa.addEventListener('click', togglePlay);
btnSiguiente.addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % playlist.length;
  cargarCancion(indiceActual);
  if (audio.paused) {
    audio.play();
    btnPlayPausa.textContent = '⏸';
    reproduciendo = true;
  }
});
btnAnterior.addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + playlist.length) % playlist.length;
  cargarCancion(indiceActual);
  if (audio.paused) {
    audio.play();
    btnPlayPausa.textContent = '⏸';
    reproduciendo = true;
  }
});
barraProgreso.addEventListener('input', () => {
  const seekTime = (barraProgreso.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
audio.addEventListener('ended', () => btnSiguiente.click());
botonMusica.addEventListener('click', () => {
  if (reproductorPopup.classList.contains('abierto')) {
    reproductorPopup.classList.remove('abierto');
  } else {
    reproductorPopup.classList.add('abierto');
    btnPlayPausa.textContent = audio.paused ? '▶' : '⏸';
    if (!audio.src) cargarCancion(indiceActual);
  }
});
btnCerrarReproductor.addEventListener('click', () => reproductorPopup.classList.remove('abierto'));
document.addEventListener('click', (e) => {
  if (!reproductorPopup.contains(e.target) && e.target !== botonMusica) {
    reproductorPopup.classList.remove('abierto');
  }
});

cargarCancion(0);

function generarListaCanciones() {
  const ul = document.getElementById('lista-canciones');
  ul.innerHTML = '';
  playlist.forEach((cancion, idx) => {
    const li = document.createElement('li');
    li.dataset.indice = idx;
    li.innerHTML = `
      <span class="num">${idx + 1}</span>
      <span>${cancion.titulo}</span>
      <span style="margin-left:auto; font-size:0.8rem; color:#888;">${cancion.artista}</span>
    `;
    li.addEventListener('click', () => {
      indiceActual = idx;
      cargarCancion(indiceActual);
      audio.play();
      btnPlayPausa.textContent = '⏸';
      reproduciendo = true;
      marcarCancionActiva(idx);
    });
    ul.appendChild(li);
  });
}

function marcarCancionActiva(indice) {
  const items = document.querySelectorAll('#lista-canciones li');
  items.forEach((item, idx) => item.classList.toggle('activa', idx === indice));
}

generarListaCanciones();
const btnToggleLista = document.getElementById('btn-toggle-lista');
const playlistDesplegable = document.querySelector('.playlist-desplegable');
btnToggleLista.addEventListener('click', () => playlistDesplegable.classList.toggle('abierto'));
