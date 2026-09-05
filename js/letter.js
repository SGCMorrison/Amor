const btnCarta = document.getElementById('btnCarta');
const carta = document.getElementById('carta');
const cartaCerrar = document.getElementById('cartaCerrar');

btnCarta.addEventListener('click', () => carta.classList.add('mostrar'));
cartaCerrar.addEventListener('click', () => carta.classList.remove('mostrar'));
carta.addEventListener('click', (e) => {
  if (e.target === carta) carta.classList.remove('mostrar');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && carta.classList.contains('mostrar')) carta.classList.remove('mostrar');
});
