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
setInterval(crearPetalo, 1200);
