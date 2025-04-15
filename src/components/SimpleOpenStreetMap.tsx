import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface SimpleOpenStreetMapProps {
  initialLocation: { lat: number; lng: number };
  height?: string;
  readOnly?: boolean;
  locationName?: string;
  showControls?: boolean;
}

const SimpleOpenStreetMap: React.FC<SimpleOpenStreetMapProps> = ({
  initialLocation,
  height = '400px',
  readOnly = true,
  locationName = '',
  showControls = true,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([initialLocation.lat, initialLocation.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      markerRef.current = L.marker([initialLocation.lat, initialLocation.lng], { icon })
        .addTo(mapRef.current)
        .bindPopup(locationName);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialLocation, locationName]);

  return (
    <div id="map" style={{ height, width: '100%' }} />
  );
};

export default SimpleOpenStreetMap; 