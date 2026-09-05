const mapa = L.map('mapa').setView([19.4326, -99.1332], 11);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/">CARTO</a>' }).addTo(mapa);
const iconoCorazon = L.divIcon({ html: '❤️', className: 'icono-corazon', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -20] });
lugares.forEach(lugar => L.marker(lugar.coords, { icon: iconoCorazon }).addTo(mapa).bindPopup(`<strong>${lugar.nombre}</strong><br><span>${lugar.descripcion}</span>`));
mapa.on('popupopen', function (e) { const px = mapa.project(e.popup._latlng); px.y -= 100; mapa.panTo(mapa.unproject(px), { animate: true }); });
