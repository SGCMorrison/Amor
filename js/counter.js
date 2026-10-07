const fechaInicio = new Date('2026-07-17T00:00:00');

function actualizarContador() {
  const ahora = new Date();
  const contador = document.getElementById('contador');
  if (!contador) return;

  // Si la fecha de inicio es en el futuro
  if (ahora < fechaInicio) {
    contador.textContent = '💜 ¡Nuestra historia está por comenzar!';
    return;
  }

  // Clonamos la fecha de inicio para ir sumando
  let tempDate = new Date(fechaInicio.getTime());

  // 1. Calcular Años
  let years = 0;
  tempDate.setFullYear(tempDate.getFullYear() + 1);
  while (tempDate <= ahora) {
    years++;
    tempDate.setFullYear(tempDate.getFullYear() + 1);
  }
  tempDate.setFullYear(tempDate.getFullYear() - 1);

  // 2. Calcular Meses
  let months = 0;
  tempDate.setMonth(tempDate.getMonth() + 1);
  while (tempDate <= ahora) {
    months++;
    tempDate.setMonth(tempDate.getMonth() + 1);
  }
  tempDate.setMonth(tempDate.getMonth() - 1);

  // 3. Calcular Días
  let days = 0;
  tempDate.setDate(tempDate.getDate() + 1);
  while (tempDate <= ahora) {
    days++;
    tempDate.setDate(tempDate.getDate() + 1);
  }
  tempDate.setDate(tempDate.getDate() - 1);

  // 4. Calcular el resto (Horas, Minutos, Segundos)
  const restoMs = ahora.getTime() - tempDate.getTime();
  const horas = Math.floor(restoMs / (1000 * 60 * 60));
  const minutos = Math.floor((restoMs % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((restoMs % (1000 * 60)) / 1000);

  // 5. Construir el texto bonito
  const partes = [];
  
  if (years > 0) partes.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months > 0) partes.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  if (days > 0) partes.push(`${days} ${days === 1 ? 'día' : 'días'}`);

  // El tiempo siempre se muestra
  const tiempoTexto = `${horas} ${horas === 1 ? 'hora' : 'horas'}, ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'} y ${segundos} ${segundos === 1 ? 'segundo' : 'segundos'}`;
  partes.push(tiempoTexto);

  // Unir todo con comas y "y" al final
  let texto = '💜 Llevamos ';
  if (partes.length > 1) {
    const ultimo = partes.pop();
    texto += partes.join(', ') + ' y ' + ultimo;
  } else {
    texto += partes[0];
  }

  texto += ' juntos 💜';
  contador.textContent = texto;
}

// Ejecutar de inmediato y actualizar cada segundo
actualizarContador();
setInterval(actualizarContador, 1000);