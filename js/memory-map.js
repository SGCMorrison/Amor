/* ============================================================
   MAPA DE RECUERDOS — Esri Dark Gray Canvas
   Tiles oscuros nativos · Sin API key · Solo Leaflet
   ============================================================ */

   const mapa = L.map('mapa', {
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: false
  }).setView([19.4326, -99.1332], 11);
  
  // Tiles oscuros oficiales de Esri (ArcGIS)
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 16,
      attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
    }
  ).addTo(mapa);
  
  // Etiquetas de texto encima (nombres de calles, lugares)
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 16,
      attribution: ''
    }
  ).addTo(mapa);
  
  // Icono corazón
  const iconoCorazon = L.divIcon({
    html: '❤️',
    className: 'icono-corazon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20]
  });
  
  lugares.forEach(lugar => {
    L.marker(lugar.coords, { icon: iconoCorazon })
      .addTo(mapa)
      .bindPopup(
        `<strong>${lugar.nombre}</strong><br><span>${lugar.descripcion}</span>`,
        { className: 'popup-romantico' }
      );
  });
  
  mapa.on('popupopen', function (e) {
    const px = mapa.project(e.popup._latlng);
    px.y -= 100;
    mapa.panTo(mapa.unproject(px), { animate: true });
  });
  
  mapa.on('click', () => mapa.scrollWheelZoom.enable());
  mapa.on('mouseout', () => mapa.scrollWheelZoom.disable());
