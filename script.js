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

// Arreglo de lugares
const lugares = [
  {
    nombre: "🌹 Donde te pedí que fueras mi novia 🌸",
    coords: [19.394553853335765, -99.173612732147], // latitud, longitud
    descripcion: "El lugar más importante de todos ❤️"
  },
  {
    nombre: "🫣 Donde pasan cosas ricas 💦",
    coords: [19.37748358925077, -99.18724494382177],
    descripcion: "La pasamos rico"
  },
  {
    nombre: "🌳 Tu compa el zedillo 👴🏻",
    coords: [19.415540288297382, -99.19151793846792],
    descripcion: "Ti amo"
  },
  {
    nombre: "🔔 Nuestro primer viaje 🏞️",
    coords: [20.913729784309794, -100.74383700158195],
    descripcion: "🌞 4 Dias y 3 noches con mi amorcito 🌚"
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

