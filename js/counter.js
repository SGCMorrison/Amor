const fechaInicio = new Date('2026-07-17T00:00:00');

function actualizarContador() {
  const hoy = new Date();
  const diferenciaMs = hoy - fechaInicio;

  if (diferenciaMs < 0) {
    document.getElementById('contador').textContent = '💜 ¡Nuestra historia está por comenzar!';
    return;
  }

  const segundosTotales = Math.floor(diferenciaMs / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  const contador = document.getElementById('contador');
  if (contador) {
    contador.textContent = `💜 Llevamos ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos juntos 💜`;
  }
}

actualizarContador();
setInterval(actualizarContador, 1000);
