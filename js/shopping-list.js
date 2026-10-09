const formCompra = document.getElementById('form-compra');
const compraInput = document.getElementById('compra-input');
const listaCompras = document.getElementById('lista-compras');
const comprasRef = db.collection('compras');

function cargarComprasTiempoReal() {
  // Ordenamos por fecha descendente (lo más nuevo arriba)
  comprasRef.orderBy('fecha', 'desc').onSnapshot((snapshot) => {
    listaCompras.innerHTML = '';
    
    if (snapshot.empty) {
      listaCompras.innerHTML = '<p class="sin-compras" style="text-align:center; color:#8a75a8; font-style:italic;">No hay cositas pendientes. ¡Agrega una! 🛒</p>';
      return;
    }

    // Separamos pendientes y compradas para mostrarlas ordenadas
    const pendientes = [];
    const completadas = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.completado) {
        completadas.push({ id: doc.id, ...data });
      } else {
        pendientes.push({ id: doc.id, ...data });
      }
    });

    // Primero las pendientes, luego las completadas
    [...pendientes, ...completadas].forEach((item) => {
      crearElementoCompra(item);
    });

  }, (error) => {
    console.error('Error al cargar compras: ', error);
    listaCompras.innerHTML = '<p style="color:red; text-align:center;">Error al cargar las cositas 😢</p>';
  });
}

function crearElementoCompra(item) {
  const div = document.createElement('div');
  div.className = 'compra-item' + (item.completado ? ' completado' : '');
  
  const texto = document.createElement('span');
  texto.className = 'compra-texto';
  texto.textContent = item.texto;

  const acciones = document.createElement('div');
  acciones.className = 'compra-acciones';

  // Botón de completar / desmarcar
  const btnCompletar = document.createElement('button');
  btnCompletar.className = 'btn-completar-compra';
  btnCompletar.title = item.completado ? 'Marcar como pendiente' : 'Marcar como comprado';
  btnCompletar.textContent = item.completado ? '↩️' : '✅';
  btnCompletar.addEventListener('click', async () => {
    try {
      await comprasRef.doc(item.id).update({ completado: !item.completado });
    } catch (error) {
      console.error('Error al actualizar: ', error);
      alert('No se pudo actualizar 😢');
    }
  });

  // Botón de eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn-eliminar-compra';
  btnEliminar.title = 'Eliminar';
  btnEliminar.textContent = '🗑️';
  btnEliminar.addEventListener('click', async () => {
    if (!confirm('¿Seguro que quieres eliminar esta cosita?')) return;
    try {
      await comprasRef.doc(item.id).delete();
    } catch (error) {
      console.error('Error al eliminar: ', error);
      alert('No se pudo eliminar 😢');
    }
  });

  acciones.append(btnCompletar, btnEliminar);
  div.append(texto, acciones);
  listaCompras.appendChild(div);
}

// Agregar nueva cosita
formCompra.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = compraInput.value.trim();
  if (!texto) return;
  
  try {
    await comprasRef.add({
      texto,
      completado: false,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });
    compraInput.value = '';
    compraInput.focus();
  } catch (error) {
    console.error('Error al agregar: ', error);
    alert('No se pudo agregar la cosita 😢');
  }
});

// Iniciar la carga en tiempo real
document.addEventListener('DOMContentLoaded', cargarComprasTiempoReal);