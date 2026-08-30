const firebaseConfig = {
  apiKey: "AIzaSyC2nV5e8r5AS1Pt5Plh5prSeHrpkiztsTE",
  authDomain: "kenia-44e6b.firebaseapp.com",
  databaseURL: "https://kenia-44e6b-default-rtdb.firebaseio.com",
  projectId: "kenia-44e6b",
  storageBucket: "kenia-44e6b.firebasestorage.app",
  messagingSenderId: "748579728416",
  appId: "1:748579728416:web:4052bc5cdbab3a0ecce045"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
// 5. REPRODUCTOR DE MÚSICA (POPUP)
// ============================================
const playlist = [
  {
    src: 'AUDIO/Locos-Fondo.mp3',          // reemplaza con tu archivo
    titulo: 'Locos',
    artista: 'León Larregui',
    portada: 'IMAGENES/portada1.jpg'       // reemplaza con tu imagen
  },
  {
    src: 'AUDIO/Birds of a Feather-Billie Eilish.mp3',
    titulo: 'Birds of a Feather',
    artista: 'Billie Eilish',
    portada: 'IMAGENES/portada2.jpg'
  },
  {
    src: 'AUDIO/Tiziano Ferro-Alucinado.mp3',
    titulo: 'Alucinado',
    artista: 'Tiziano Ferro',
    portada: 'IMAGENES/portada3.jpg'
  },
  {
    src: 'AUDIO/The Killers - Mr. Brightside.mp3',
    titulo: 'Mr. Brightside',
    artista: 'The Killers',
    portada: 'IMAGENES/portada4.jpg'
  },
  {
    src: 'AUDIO/Eden Muñoz - La Magia de Conectar.mp3',
    titulo: 'La Magia de Conectar',
    artista: 'Eden Muñoz',
    portada: 'IMAGENES/portada5.jpg'
  },
  {
    src: 'AUDIO/Joan Sebastian - Me Gustas.mp3',
    titulo: 'Me Gustas',
    artista: 'Joan Sebastian',
    portada: 'IMAGENES/portada6.jpg'
  },
  {
    src: 'AUDIO/Enjambre-Ciencia De La Lluvia.mp3',
    titulo: 'Ciencia De La Lluvia',
    artista: 'Enjambre',
    portada: 'IMAGENES/portada7.jpg'
  },
  {
    src: 'AUDIO/Antes que al mío-Los Claxons.mp3',
    titulo: 'Antes que al mío',
    artista: 'Los Claxons',
    portada: 'IMAGENES/portada8.jpg'
  },
  {
    src: 'AUDIO/Koko Stambuk - Valiente.mp3',
    titulo: 'Valiente',
    artista: 'Koko Stambuk',
    portada: 'IMAGENES/portada9.jpg'
  },
  {
    src: 'AUDIO/Los Amigos Invisibles – Playa Azul.mp3',
    titulo: 'Playa Azul',
    artista: 'Los Amigos Invisibles',
    portada: 'IMAGENES/portada10.jpg'
  },
  {
    src: 'AUDIO/Lady Gaga, Bruno Mars - Die With A Smile.mp3',
    titulo: 'Die With A Smile',
    artista: 'Lady Gaga, Bruno Mars',
    portada: 'IMAGENES/portada11.jpg'
  }
  // Agrega más canciones aquí...
];

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

// Cargar canción según índice
function cargarCancion(indice) {
  const cancion = playlist[indice];
  if (!cancion) return;

  audio.src = cancion.src;
  portadaActual.src = cancion.portada;
  tituloCancion.textContent = cancion.titulo;
  artistaCancion.textContent = cancion.artista;

  // Actualizar duración total cuando se carguen metadatos
  audio.addEventListener('loadedmetadata', function() {
    tiempoTotal.textContent = formatoTiempo(audio.duration);
  });

  // Si estaba reproduciendo, continuar
  if (reproduciendo) {
    audio.play();
  }
}

// Formatear segundos a mm:ss
function formatoTiempo(segundos) {
  if (isNaN(segundos)) return '0:00';
  const min = Math.floor(segundos / 60);
  const sec = Math.floor(segundos % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Actualizar barra de progreso y tiempo actual
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  barraProgreso.value = progress;
  tiempoActual.textContent = formatoTiempo(audio.currentTime);
});

// Play/Pausa
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

// Siguiente canción
btnSiguiente.addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % playlist.length;
  cargarCancion(indiceActual);
  if (audio.paused) {
    audio.play();
    btnPlayPausa.textContent = '⏸';
    reproduciendo = true;
  }
});

// Anterior canción
btnAnterior.addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + playlist.length) % playlist.length;
  cargarCancion(indiceActual);
  if (audio.paused) {
    audio.play();
    btnPlayPausa.textContent = '⏸';
    reproduciendo = true;
  }
});

// Barra de progreso (buscar)
barraProgreso.addEventListener('input', () => {
  const seekTime = (barraProgreso.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Al terminar la canción, pasar a la siguiente
audio.addEventListener('ended', () => {
  btnSiguiente.click();
});

// Abrir/cerrar popup con el botón de música
botonMusica.addEventListener('click', () => {
  if (reproductorPopup.classList.contains('abierto')) {
    reproductorPopup.classList.remove('abierto');
  } else {
    reproductorPopup.classList.add('abierto');
    btnPlayPausa.textContent = audio.paused ? '▶' : '⏸';
    // Si aún no se ha cargado ninguna canción, cargar la primera
    if (!audio.src) {
      cargarCancion(indiceActual);
    }
  }
});

// Cerrar popup con la X
btnCerrarReproductor.addEventListener('click', () => {
  reproductorPopup.classList.remove('abierto');
});

// Cerrar al hacer clic fuera del popup (pero no en el botón)
document.addEventListener('click', (e) => {
  if (!reproductorPopup.contains(e.target) && e.target !== botonMusica) {
    reproductorPopup.classList.remove('abierto');
  }
});

// Inicializar con la primera canción
cargarCancion(0);

// Generar la lista de canciones en el popup
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

// Marcar la canción activa en la lista
function marcarCancionActiva(indice) {
  const items = document.querySelectorAll('#lista-canciones li');
  items.forEach((item, idx) => {
    if (idx === indice) {
      item.classList.add('activa');
    } else {
      item.classList.remove('activa');
    }
  });
}

// Llamar a generarListaCanciones al inicio
generarListaCanciones();

// Agregar funcionalidad de despliegue
const btnToggleLista = document.getElementById('btn-toggle-lista');
const playlistDesplegable = document.querySelector('.playlist-desplegable');

btnToggleLista.addEventListener('click', () => {
  playlistDesplegable.classList.toggle('abierto');
});



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

// Obtener elementos
const btnCarta = document.getElementById('btnCarta');
const carta = document.getElementById('carta');
const cartaCerrar = document.getElementById('cartaCerrar');

// Abrir carta
btnCarta.addEventListener('click', () => {
  carta.classList.add('mostrar');
  // Opcional: reproducir sonido o música
});

// Cerrar carta con la X
cartaCerrar.addEventListener('click', () => {
  carta.classList.remove('mostrar');
});

// Cerrar carta al hacer clic fuera del contenido
carta.addEventListener('click', (e) => {
  if (e.target === carta) {
    carta.classList.remove('mostrar');
  }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && carta.classList.contains('mostrar')) {
    carta.classList.remove('mostrar');
  }
});

// ===== SECCIÓN DE COMENTARIOS (FIREBASE FIRESTORE) =====
const formComentario = document.getElementById('form-comentario');
const comentarioInput = document.getElementById('comentario-input');
const listaComentarios = document.getElementById('lista-comentarios');

// Referencia a la colección de comentarios en Firestore
const comentariosRef = db.collection('comentarios');

// Cargar comentarios en tiempo real
function cargarComentariosTiempoReal() {
  comentariosRef
    .orderBy('fecha', 'desc') // ordenar por fecha (más reciente primero)
    .onSnapshot((snapshot) => {
      listaComentarios.innerHTML = '';
      snapshot.forEach((doc) => {
        const data = doc.data();
        crearElementoComentario(data.texto, data.fecha, doc.id);
      });
    }, (error) => {
      console.error("Error al cargar comentarios: ", error);
      listaComentarios.innerHTML = '<p class="comentario-texto">Error al cargar comentarios 😢</p>';
    });
}

// Crear elemento de comentario en el DOM
function crearElementoComentario(texto, fecha, id) {
  const div = document.createElement('div');
  div.className = 'comentario-item';
  
  // Mostrar fecha legible
  let fechaMostrar = fecha;
  if (fecha && fecha.toDate) {
    fechaMostrar = fecha.toDate().toLocaleString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  div.innerHTML = `
    <p class="comentario-texto">${texto}</p>
    <span class="comentario-fecha">${fechaMostrar}</span>
    <button class="btn-eliminar" data-id="${id}" title="Eliminar">🗑️</button>
  `;
  
  // Evento para eliminar
  div.querySelector('.btn-eliminar').addEventListener('click', async function() {
    const idComentario = this.getAttribute('data-id');
    try {
      await db.collection('comentarios').doc(idComentario).delete();
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert("No se pudo eliminar el comentario 😢");
    }
  });
  
  listaComentarios.appendChild(div);
}

// Guardar comentario
async function guardarComentario(texto) {
  try {
    await comentariosRef.add({
      texto: texto,
      fecha: firebase.firestore.FieldValue.serverTimestamp() // usa la hora del servidor
    });
    // Limpiar el textarea
    comentarioInput.value = '';
  } catch (error) {
    console.error("Error al guardar: ", error);
    alert("No se pudo guardar el comentario 😢");
  }
}

// Evento submit del formulario
formComentario.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const texto = comentarioInput.value.trim();
  if (texto === '') return;
  
  guardarComentario(texto);
});

// Iniciar carga en tiempo real
document.addEventListener('DOMContentLoaded', cargarComentariosTiempoReal);

// ===== MAPA DE RECUERDOS =====
// Inicializar el mapa (centro en México, puedes ajustar)
const mapa = L.map('mapa').setView([19.4326, -99.1332], 11); // Guadalajara como ejemplo

// Capa de OpenStreetMap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/">CARTO</a>'
}).addTo(mapa);

// Crear icono personalizado con corazón
const iconoCorazon = L.divIcon({
  html: '❤️',
  className: 'icono-corazon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20]
});

// Arreglo de lugares (agrega todos los que quieras)
const lugares = [
  {
    nombre: "🌹 Donde te pedí que fueras mi novia",
    coords: [19.394553853335765, -99.173612732147], // latitud, longitud
    descripcion: "El lugar más importante de todos ❤️"
  },
  {
    nombre: "Donde pasan cosas ricas",
    coords: [19.37748358925077, -99.18724494382177],
    descripcion: "La pasamos sabroso"
  },
  {
    nombre: "🌳 Tu compa el zedillo",
    coords: [19.415540288297382, -99.19151793846792],
    descripcion: "Ti amo"
  },
  {
    nombre: "🔔 Nuestro primer viaje 🏞️",
    coords: [20.913729784309794, -100.74383700158195],
    descripcion: "🌞 4 dias y 3 noches con amorcito 🌚"
  },
  {
    nombre: "🌳 Nuestro primer paseo en bici 🚲",
    coords: [20.624135, -100.348090],
    descripcion: "🦆 Quiero pasear asi en distintos lugares ⛰️"
  }
];

// Agregar marcadores con corazón al mapa
lugares.forEach(lugar => {
  const marcador = L.marker(lugar.coords, { icon: iconoCorazon }).addTo(mapa);
  marcador.bindPopup(`
    <strong>${lugar.nombre}</strong><br>
    <span>${lugar.descripcion}</span>
  `);
});

// Hacer zoom cuando se haga clic en un marcador
mapa.on('popupopen', function(e) {
  const px = mapa.project(e.popup._latlng);
  px.y -= 100;
  mapa.panTo(mapa.unproject(px), { animate: true });
});


// ===== SECCIÓN DE PLANES (FIREBASE FIRESTORE) =====
const formPlan = document.getElementById('form-plan');
const planInput = document.getElementById('plan-input');
const listaPlanes = document.getElementById('lista-planes');

// Referencia a la colección "planes"
const planesRef = db.collection('planes');

// Cargar planes en tiempo real
function cargarPlanesTiempoReal() {
  planesRef
    .orderBy('fecha', 'desc')
    .onSnapshot((snapshot) => {
      listaPlanes.innerHTML = '';
      snapshot.forEach((doc) => {
        const data = doc.data();
        crearElementoPlan(data.texto, data.completado || false, data.fecha, doc.id);
      });
    }, (error) => {
      console.error("Error al cargar planes: ", error);
      listaPlanes.innerHTML = '<p class="error">Error al cargar planes 😢</p>';
    });
}

// Crear elemento plan en el DOM
function crearElementoPlan(texto, completado, fecha, id) {
  const div = document.createElement('div');
  div.className = 'plan-item' + (completado ? ' completado' : '');
  
  // Mostrar fecha legible
  let fechaMostrar = '';
  if (fecha && fecha.toDate) {
    fechaMostrar = fecha.toDate().toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  div.innerHTML = `
    <div>
      <span class="plan-texto">${texto}</span>
      <span class="plan-fecha">${fechaMostrar}</span>
    </div>
    <div class="plan-acciones">
      <button class="btn-completar" data-id="${id}" title="Marcar como completado">✅</button>
      <button class="btn-eliminar-plan" data-id="${id}" title="Eliminar">🗑️</button>
    </div>
  `;

  // Evento completar
  div.querySelector('.btn-completar').addEventListener('click', async function() {
    const idPlan = this.getAttribute('data-id');
    const nuevoEstado = !completado;
    try {
      await db.collection('planes').doc(idPlan).update({
        completado: nuevoEstado
      });
    } catch (error) {
      console.error("Error al actualizar plan: ", error);
      alert("No se pudo actualizar el plan 😢");
    }
  });

  // Evento eliminar
  div.querySelector('.btn-eliminar-plan').addEventListener('click', async function() {
    const idPlan = this.getAttribute('data-id');
    if (confirm('🫣¿Segura que quieres eliminar este plan?🥲')) {
      try {
        await db.collection('planes').doc(idPlan).delete();
      } catch (error) {
        console.error("Error al eliminar plan: ", error);
        alert("No se pudo eliminar el plan 😢");
      }
    }
  });

  listaPlanes.appendChild(div);
}

// Agregar plan
async function agregarPlan(texto) {
  try {
    await planesRef.add({
      texto: texto,
      completado: false,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });
    planInput.value = '';
  } catch (error) {
    console.error("Error al agregar plan: ", error);
    alert("No se pudo agregar el plan 😢");
  }
}

// Evento submit del formulario de planes
formPlan.addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = planInput.value.trim();
  if (texto === '') return;
  agregarPlan(texto);
});

// Iniciar carga en tiempo real de planes
document.addEventListener('DOMContentLoaded', cargarPlanesTiempoReal);

// ============================================
// 9. BOTÓN "DAME UNA RAZÓN PARA SONREÍR"
// ============================================

// Lista de frases positivas y románticas
const frases = [
  "Eres la razón por la que sonrío todos los días 😊",
  "Tu sonrisa ilumina mi mundo 🌟",
  "Eres más hermosa hasta sin rimel 😊",
  "Cada día a tu lado es un regalo 🎁",
  "Tu risa es mi canción favorita 🎵",
  "Eres la persona más increíble que conozco 💖",
  "Contigo, hasta los días grises son coloridos 🌈",
  "Eres mi sueño hecho realidad 🌙",
  "No hay nadie como tú en el mundo 🌍",
  "Tu felicidad es mi prioridad número uno ❤️",
  "Cada instante contigo es mágico 🪄",
  "Tu abrazo es mi lugar favorito 🤗",
  "Me encanta cómo me miras 👀",
  "Eres mi mejor decisión 🥇",
  "Contigo aprendí qué es el amor a primera vista 💘",
  "Eres la razón por la que mi corazón late más rápido cada día ❤️",
  "Tus besos son mi medicina favorita 😊",
  "No hay distancia que pueda apagar el amor que siento por ti 🌍",
  "Me encanta cómo ríes cuando te cuento algo tonto 😂",
  "Contigo, hasta el día más aburrido se vuelve especial ✨",
  "Me fascina cómo te emocionas por las cosas pequeñas 🥰🌼",
  "Compartir un helado contigo es mi plan favorito 🍦❤️",
  "Ver cómo te preocupas por los perritos me hace quererte más 🐶🥺",
  "Creo en ti y en todo lo que puedes lograr 💪🌟",
  "Recuerda que siempre tienes a alguien que te ama incondicionalmente 🤗💖",
  "Eres capaz de cosas increíbles, nunca lo dudes 🚀✨",
  "Tu felicidad es mi mayor motivación 😊💪",
  "Contigo, hasta ir al supermercado es una aventura 🛒🎢",
  "El universo nos puso juntos, y yo le agradezco eternamente 🌌🙏",
];

// Obtener elementos
const btnRazon = document.getElementById('btnRazon');
const razonTexto = document.getElementById('razonTexto');

// Función para mostrar una frase aleatoria con animación
function mostrarRazon() {
  // Seleccionar una frase aleatoria
  const indice = Math.floor(Math.random() * frases.length);
  const frase = frases[indice];
  
  // Aplicar animación de cambio
  razonTexto.classList.remove('cambiando');
  // Forzar reflujo para reiniciar la animación
  void razonTexto.offsetWidth;
  razonTexto.classList.add('cambiando');
  
  // Actualizar el texto
  razonTexto.textContent = frase;
}

// Evento click del botón
btnRazon.addEventListener('click', mostrarRazon);

// Opcional: mostrar una frase aleatoria al cargar la página
window.addEventListener('load', () => {
  // Mostrar una frase inicial aleatoria (pero sin animación)
  const indice = Math.floor(Math.random() * frases.length);
  razonTexto.textContent = frases[indice];
});
