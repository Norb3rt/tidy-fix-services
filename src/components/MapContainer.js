// Suponiendo que tu archivo está en: src/components/MapContainer.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Asumiendo que usas Leaflet
import 'leaflet/dist/leaflet.css'; // No olvides importar los estilos

const MapContainer = ({ center, zoom }) => {
  // 1. Refs para el contenedor del mapa y la instancia del mapa
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // 2. Este useEffect se ejecuta UNA SOLA VEZ, después del primer render,
    //    gracias al array de dependencias vacío [].
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // 3. Si el contenedor existe y el mapa AÚN NO se ha inicializado...
      //    Lo creamos y guardamos la instancia en el ref
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, zoom);

      // Agregamos la capa de teselas (el mapa base)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // 4. Función de limpieza: se ejecuta solo cuando el componente se desmonta.
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // Destruye la instancia del mapa
        mapInstanceRef.current = null; // Limpia la referencia
      }
    };
  }, []); // <-- ¡IMPORTANTE! El array de dependencias debe estar vacío.

  // Si quieres que el mapa reaccione a cambios en `center` o `zoom` sin reinicializarse:
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);


  // 5. Asignamos el ref al div que contendrá el mapa
  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapContainer;
