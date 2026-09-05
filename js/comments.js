const comentariosRef = db.collection('comentarios');
const formComentario = document.getElementById('form-comentario');
const comentarioInput = document.getElementById('comentario-input');
const listaComentarios = document.getElementById('lista-comentarios');
let comentariosMap = new Map();

async function eliminarComentarioYCascada(id) {
  try {
    const snapshot = await comentariosRef.where('parentId', '==', id).get();
    await Promise.all(snapshot.docs.map(doc => eliminarComentarioYCascada(doc.id)));
    await comentariosRef.doc(id).delete();
  } catch (error) {
    console.error('Error al eliminar en cascada: ', error);
    throw error;
  }
}

function renderizarComentario(doc, contenedor, nivel = 0) {
  try {
    const data = doc.data();
    const id = doc.id;
    const divComentario = document.createElement('div');
    divComentario.className = 'comentario-item';
    divComentario.dataset.id = id;
    divComentario.style.marginLeft = `${nivel * 20}px`;
    if (nivel > 0) {
      divComentario.style.borderLeft = '3px solid #ffb6c1';
      divComentario.style.paddingLeft = '12px';
      divComentario.style.marginTop = '8px';
    }
    const contenido = document.createElement('div');
    contenido.className = 'comentario-contenido';
    const textoP = document.createElement('p');
    textoP.className = 'comentario-texto';
    textoP.textContent = data.texto || '📝 Mensaje sin texto';
    const fechaSpan = document.createElement('span');
    fechaSpan.className = 'comentario-fecha';
    fechaSpan.textContent = (data.fecha?.toDate ? data.fecha.toDate() : new Date()).toLocaleString('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const acciones = document.createElement('div');
    acciones.className = 'comentario-acciones';
    const btnResponder = document.createElement('button');
    btnResponder.className = 'btn-responder';
    btnResponder.textContent = '💬 Responder';
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = '🗑️';
    btnEliminar.title = 'Eliminar comentario y respuestas';
    acciones.append(btnResponder, btnEliminar);
    contenido.append(textoP, fechaSpan, acciones);
    divComentario.appendChild(contenido);
    const respuestasContainer = document.createElement('div');
    respuestasContainer.className = 'comentario-respuestas';
    divComentario.appendChild(respuestasContainer);
    const formRespuesta = document.createElement('div');
    formRespuesta.className = 'comentario-form-respuesta';
    formRespuesta.style.display = 'none';
    formRespuesta.style.marginTop = '8px';
    formRespuesta.innerHTML = '<textarea placeholder="Escribe tu respuesta... ❤️" rows="2" style="width:100%; border-radius:10px; border:1px solid #ddd; padding:8px; font-family:inherit;"></textarea><button class="btn-enviar-respuesta" style="margin-top:5px; background:#ff6b81; color:white; border:none; padding:6px 16px; border-radius:20px; cursor:pointer;">Responder</button>';
    divComentario.appendChild(formRespuesta);
    btnResponder.addEventListener('click', () => {
      const oculto = formRespuesta.style.display === 'none';
      formRespuesta.style.display = oculto ? 'block' : 'none';
      if (oculto) setTimeout(() => formRespuesta.querySelector('textarea').focus(), 100);
    });
    btnEliminar.addEventListener('click', async () => {
      if (!confirm('¿Eliminar este comentario y todas sus respuestas?')) return;
      try { await eliminarComentarioYCascada(id); } catch { alert('Error al eliminar'); }
    });
    formRespuesta.querySelector('.btn-enviar-respuesta').addEventListener('click', async () => {
      const textarea = formRespuesta.querySelector('textarea');
      const texto = textarea.value.trim();
      if (!texto) return;
      try {
        await comentariosRef.add({ texto, fecha: firebase.firestore.FieldValue.serverTimestamp(), parentId: id });
        textarea.value = '';
        formRespuesta.style.display = 'none';
      } catch { alert('No se pudo guardar la respuesta'); }
    });
    contenedor.appendChild(divComentario);
    (comentariosMap.get(id) || []).forEach(hijo => renderizarComentario({ id: hijo.id, data: () => hijo.data }, respuestasContainer, nivel + 1));
  } catch (error) {
    console.error(`❌ Error al renderizar comentario ${doc.id}:`, error, doc.data());
  }
}

function cargarComentariosTiempoReal() {
  comentariosRef.orderBy('fecha', 'desc').onSnapshot((snapshot) => {
    comentariosMap.clear();
    listaComentarios.innerHTML = '';
    const docs = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    docs.forEach(({ id }) => comentariosMap.set(id, []));
    const roots = [];
    docs.forEach(({ id, data }) => {
      const parentId = data.parentId || null;
      if (!parentId || !comentariosMap.has(parentId)) roots.push({ id, data });
      else comentariosMap.get(parentId).push({ id, data });
    });
    comentariosMap.forEach(hijos => hijos.sort((a, b) => (a.data.fecha?.toDate?.() || new Date(0)) - (b.data.fecha?.toDate?.() || new Date(0))));
    roots.forEach(raiz => renderizarComentario({ id: raiz.id, data: () => raiz.data }, listaComentarios));
    if (!roots.length) listaComentarios.innerHTML = '<p class="comentario-texto" style="text-align:center; color:#999;">Todavía no hay mensajes. ¡Escribe el primero! ❤️</p>';
  }, () => { listaComentarios.innerHTML = '<p class="comentario-texto" style="color:red;">Error al cargar comentarios 😢</p>'; });
}

formComentario.addEventListener('submit', async function (e) {
  e.preventDefault();
  const texto = comentarioInput.value.trim();
  if (!texto) return;
  try {
    await comentariosRef.add({ texto, fecha: firebase.firestore.FieldValue.serverTimestamp(), parentId: null });
    comentarioInput.value = '';
  } catch { alert('No se pudo guardar el comentario 😢'); }
});
document.addEventListener('DOMContentLoaded', cargarComentariosTiempoReal);
