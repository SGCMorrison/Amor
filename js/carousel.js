const track = document.getElementById('carruselTrack');
const btnPrev = document.getElementById('carruselPrev');
const btnNext = document.getElementById('carruselNext');
const indicadores = document.getElementById('carruselIndicadores');
let currentIndex = 0;
const totalSlides = track.children.length;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 4000;

for (let i = 0; i < totalSlides; i++) {
  const punto = document.createElement('button');
  punto.classList.add('punto');
  if (i === 0) punto.classList.add('activo');
  punto.dataset.index = i;
  punto.addEventListener('click', () => irASlide(i));
  indicadores.appendChild(punto);
}
function irASlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentIndex = index;
  track.style.transform = `translateX(${-currentIndex * 100}%)`;
  actualizarIndicadores();
}
function actualizarIndicadores() { indicadores.querySelectorAll('.punto').forEach((p, i) => p.classList.toggle('activo', i === currentIndex)); }
function siguienteSlide() { irASlide(currentIndex + 1); reiniciarAutoplay(); }
function anteriorSlide() { irASlide(currentIndex - 1); reiniciarAutoplay(); }
function iniciarAutoplay() { if (autoPlayInterval) clearInterval(autoPlayInterval); autoPlayInterval = setInterval(siguienteSlide, AUTO_PLAY_DELAY); }
function reiniciarAutoplay() { if (autoPlayInterval) { clearInterval(autoPlayInterval); iniciarAutoplay(); } }
function detenerAutoplay() { if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; } }
btnNext.addEventListener('click', () => { siguienteSlide(); reiniciarAutoplay(); });
btnPrev.addEventListener('click', () => { anteriorSlide(); reiniciarAutoplay(); });
const carruselContainer = document.querySelector('.carrusel-container');
carruselContainer.addEventListener('mouseenter', detenerAutoplay);
carruselContainer.addEventListener('mouseleave', iniciarAutoplay);
carruselContainer.addEventListener('touchstart', detenerAutoplay);
carruselContainer.addEventListener('touchend', () => setTimeout(iniciarAutoplay, 3000));
iniciarAutoplay();
window.addEventListener('resize', () => irASlide(currentIndex));
