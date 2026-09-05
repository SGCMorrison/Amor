const btnRazon = document.getElementById('btnRazon');
const razonTexto = document.getElementById('razonTexto');
function mostrarRazon() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  razonTexto.classList.remove('cambiando');
  void razonTexto.offsetWidth;
  razonTexto.classList.add('cambiando');
  razonTexto.textContent = frase;
}
btnRazon.addEventListener('click', mostrarRazon);
window.addEventListener('load', () => { razonTexto.textContent = frases[Math.floor(Math.random() * frases.length)]; });
