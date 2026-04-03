import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
function MapController({ location }) {
  const map = useMap();
  useEffect(() => {
    if (!location) return;
    map.flyTo([location.lat, location.lon], 13, { duration: 1.3 });
  }, [location, map]);
  return null;
}
export default function MapView({ location }) {
  if (!location) {
    return <div></div>;
  }
  const position = [location.lat, location.lon];
  return (
    <div className="h-125 w-full rounded-xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <MapController location={location}></MapController>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>This is your starting location!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
