const formPlan = document.getElementById('form-plan');
const planInput = document.getElementById('plan-input');
const listaPlanes = document.getElementById('lista-planes');
const planesRef = db.collection('planes');

function cargarPlanesTiempoReal() {
  planesRef.orderBy('fecha', 'desc').onSnapshot((snapshot) => {
    listaPlanes.innerHTML = '';
    snapshot.forEach((doc) => {
      const data = doc.data();
      crearElementoPlan(data.texto, data.completado || false, data.fecha, doc.id);
    });
  }, (error) => {
    console.error('Error al cargar planes: ', error);
    listaPlanes.innerHTML = '<p class="error">Error al cargar planes 😢</p>';
  });
}

function crearElementoPlan(texto, completado, fecha, id) {
  const div = document.createElement('div');
  div.className = 'plan-item' + (completado ? ' completado' : '');
  let fechaMostrar = '';
  if (fecha && fecha.toDate) fechaMostrar = fecha.toDate().toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
  div.innerHTML = `<div><span class="plan-texto">${texto}</span><span class="plan-fecha">${fechaMostrar}</span></div><div class="plan-acciones"><button class="btn-completar" data-id="${id}" title="Marcar como completado">✅</button><button class="btn-eliminar-plan" data-id="${id}" title="Eliminar">🗑️</button></div>`;
  div.querySelector('.btn-completar').addEventListener('click', async function () {
    try { await db.collection('planes').doc(this.getAttribute('data-id')).update({ completado: !completado }); }
    catch (error) { console.error('Error al actualizar plan: ', error); alert('No se pudo actualizar el plan 😢'); }
  });
  div.querySelector('.btn-eliminar-plan').addEventListener('click', async function () {
    if (!confirm('¿Seguro que quieres eliminar este plan?')) return;
    try { await db.collection('planes').doc(this.getAttribute('data-id')).delete(); }
    catch (error) { console.error('Error al eliminar plan: ', error); alert('No se pudo eliminar el plan 😢'); }
  });
  listaPlanes.appendChild(div);
}

async function agregarPlan(texto) {
  try {
    await planesRef.add({ texto, completado: false, fecha: firebase.firestore.FieldValue.serverTimestamp() });
    planInput.value = '';
  } catch (error) { console.error('Error al agregar plan: ', error); alert('No se pudo agregar el plan 😢'); }
}

formPlan.addEventListener('submit', function (e) {
  e.preventDefault();
  const texto = planInput.value.trim();
  if (texto) agregarPlan(texto);
});
document.addEventListener('DOMContentLoaded', cargarPlanesTiempoReal);
