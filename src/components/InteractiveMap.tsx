"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { areasData } from '@/data';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js/Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: { position: [number, number]; popup: string }[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ center = [35.85, -78.8], zoom = 10, markers }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[500px] w-full rounded-lg shadow-xl bg-slate-100 animate-pulse border-4 border-white mx-auto max-w-5xl"></div>;
  }

  return (
    <div className="h-[500px] w-full rounded-lg shadow-xl overflow-hidden border-4 border-white mx-auto max-w-5xl">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers ? (
          markers.map((marker, idx) => (
            <Marker key={idx} position={marker.position} icon={customIcon}>
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))
        ) : (
          areasData.map((area) => (
            <Marker key={area.slug} position={[area.lat, area.lng]} icon={customIcon}>
              <Popup>
                <div className="text-center p-1">
                  <h3 className="font-bold text-lg mb-1">{area.name}</h3>
                  <p className="text-sm mb-2 max-w-xs">{area.description}</p>
                  <Link href={`/locations/${area.slug}`} className="text-blue-600 font-semibold hover:underline text-base">
                    View Services in {area.name} &rarr;
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;