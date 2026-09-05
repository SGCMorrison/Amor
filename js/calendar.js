const formEvento = document.getElementById('form-evento');
const eventoFecha = document.getElementById('evento-fecha');
const eventoTexto = document.getElementById('evento-texto');
const eventoTipo = document.getElementById('evento-tipo');
const calendarioTitulo = document.getElementById('calendario-titulo');
const calendarioDias = document.getElementById('calendario-dias');
const listaAcontecimientos = document.getElementById('lista-acontecimientos');
const acontecimientosTitulo = document.getElementById('acontecimientos-titulo');
const btnCalendarioAnterior = document.getElementById('calendario-anterior');
const btnCalendarioSiguiente = document.getElementById('calendario-siguiente');

const fechaActual = new Date();
let mesVisible = fechaActual.getMonth();
let anoVisible = fechaActual.getFullYear();
let acontecimientos = [];

function fechaLocalISO(fecha) {
  const ano = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function fechaDesdeISO(fecha) {
  return new Date(`${fecha}T12:00:00`);
}

function renderizarCalendario() {
  const fechaMes = new Date(anoVisible, mesVisible, 1);
  const nombreMes = fechaMes.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  calendarioTitulo.textContent = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
  acontecimientosTitulo.textContent = `Acontecimientos de ${nombreMes}`;
  calendarioDias.replaceChildren();

  const primerDia = (fechaMes.getDay() + 6) % 7;
  const diasDelMes = new Date(anoVisible, mesVisible + 1, 0).getDate();
  const hoy = fechaLocalISO(new Date());
  const eventosPorFecha = new Map();
  acontecimientos.forEach((evento) => {
    if (!eventosPorFecha.has(evento.fecha)) eventosPorFecha.set(evento.fecha, []);
    eventosPorFecha.get(evento.fecha).push(evento);
  });

  for (let i = 0; i < primerDia; i += 1) {
    const vacio = document.createElement('div');
    vacio.className = 'dia-calendario dia-vacio';
    calendarioDias.appendChild(vacio);
  }
  for (let dia = 1; dia <= diasDelMes; dia += 1) {
    const fecha = fechaLocalISO(new Date(anoVisible, mesVisible, dia));
    const eventos = eventosPorFecha.get(fecha) || [];
    const botonDia = document.createElement('button');
    botonDia.type = 'button';
    botonDia.className = 'dia-calendario';
    botonDia.classList.toggle('hoy', fecha === hoy);
    botonDia.classList.toggle('con-eventos', eventos.length > 0);
    botonDia.title = eventos.map((evento) => `${evento.tipo} ${evento.texto}`).join('\n');
    const numero = document.createElement('span');
    numero.textContent = dia;
    botonDia.appendChild(numero);
    if (eventos.length) {
      const marcas = document.createElement('small');
      marcas.textContent = eventos.slice(0, 3).map((evento) => evento.tipo).join('');
      botonDia.appendChild(marcas);
    }
    botonDia.addEventListener('click', () => {
      eventoFecha.value = fecha;
      eventoTexto.focus();
    });
    calendarioDias.appendChild(botonDia);
  }

  listaAcontecimientos.replaceChildren();
  const eventosDelMes = acontecimientos
    .filter((evento) => {
      const fecha = fechaDesdeISO(evento.fecha);
      return fecha.getFullYear() === anoVisible && fecha.getMonth() === mesVisible;
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  if (!eventosDelMes.length) {
    const vacio = document.createElement('p');
    vacio.className = 'sin-acontecimientos';
    vacio.textContent = 'Todavía no hay anécdotas para este mes. Inventemos una bonita (o muy cagada) ❤️';
    listaAcontecimientos.appendChild(vacio);
    return;
  }

  eventosDelMes.forEach((evento) => {
    const item = document.createElement('div');
    item.className = 'acontecimiento-item';
    const contenido = document.createElement('div');
    const fecha = document.createElement('time');
    fecha.textContent = fechaDesdeISO(evento.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
    const texto = document.createElement('span');
    texto.textContent = `${evento.tipo} ${evento.texto}`;
    contenido.append(fecha, texto);
    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.className = 'btn-eliminar-evento';
    eliminar.textContent = '🗑️';
    eliminar.title = 'Eliminar acontecimiento';
    eliminar.addEventListener('click', async () => {
      if (!confirm('¿Eliminar este acontecimiento?')) return;
      try {
        await db.collection('acontecimientos').doc(evento.id).delete();
      } catch (error) {
        console.error('Error al eliminar acontecimiento:', error);
        alert('No se pudo eliminar el acontecimiento 😢');
      }
    });
    item.append(contenido, eliminar);
    listaAcontecimientos.appendChild(item);
  });
}

formEvento.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fecha = eventoFecha.value;
  const texto = eventoTexto.value.trim();
  if (!fecha || !texto) return;
  try {
    await db.collection('acontecimientos').add({
      fecha,
      texto,
      tipo: eventoTipo.value,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp()
    });
    eventoTexto.value = '';
  } catch (error) {
    console.error('Error al guardar acontecimiento:', error);
    alert('No se pudo guardar el acontecimiento 😢');
  }
});

btnCalendarioAnterior.addEventListener('click', () => {
  mesVisible -= 1;
  if (mesVisible < 0) { mesVisible = 11; anoVisible -= 1; }
  renderizarCalendario();
});
btnCalendarioSiguiente.addEventListener('click', () => {
  mesVisible += 1;
  if (mesVisible > 11) { mesVisible = 0; anoVisible += 1; }
  renderizarCalendario();
});

document.addEventListener('DOMContentLoaded', () => {
  eventoFecha.value = fechaLocalISO(new Date());
  db.collection('acontecimientos').onSnapshot((snapshot) => {
    acontecimientos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderizarCalendario();
  }, (error) => {
    console.error('Error al cargar acontecimientos:', error);
    listaAcontecimientos.innerHTML = '<p class="sin-acontecimientos">No se pudieron cargar los acontecimientos 😢</p>';
  });
  renderizarCalendario();
});
