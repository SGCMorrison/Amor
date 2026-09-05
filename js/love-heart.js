function crearCorazonTexto() {
  const contenedor = document.getElementById('corazon-te-amo');
  if (!contenedor) return;

  const numPalabras = 80;
  const ancho = 350;
  const alto = 350;
  const escala = 10;
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

crearCorazonTexto();
