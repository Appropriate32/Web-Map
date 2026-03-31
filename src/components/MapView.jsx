import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView() {
  const position = [51.505, -0.09];

  return (
    <div className="h-125 w-full rounded-xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
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
