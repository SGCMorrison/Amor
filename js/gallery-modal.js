const modal = document.getElementById('modal-imagen');
const modalImg = document.getElementById('modal-img');
const modalCerrar = document.getElementById('modal-cerrar');

document.querySelectorAll('.tarjeta img').forEach(img => {
  img.addEventListener('click', () => {
    if (modal && modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('modal-abierto');
    }
  });
});

if (modalCerrar) {
  modalCerrar.addEventListener('click', () => modal.classList.remove('modal-abierto'));
}
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('modal-abierto');
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('modal-abierto')) {
    modal.classList.remove('modal-abierto');
  }
});
