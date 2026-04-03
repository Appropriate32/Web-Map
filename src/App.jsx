import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        q,
        format: "json",
        limit: "1",
        addressdetails: "1",
      });

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "GeoFinder/1.0 (your@email)",
          },
        },
      );
      if (!res.ok) throw new Error("Geocoding failed");
      const data = await res.json();
      if (!data.length) {
        setError("No location found");
        setLocation(null);
      } else {
        const { lat, lon, display_name, address } = data[0];
        setLocation({
          lat: Number(lat),
          lon: Number(lon),
          display_name,
          address,
        });
      }
    } catch (err) {
      setError(err.message || "Network error");
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-300 p-4 md:p-8 flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">
          Geo<span className="text-primary"> Finder</span>
        </h1>
        <p className="text-base-content/60 text-sm mt-1">
          Search any location worldwide
        </p>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="card bg-base-100 shadow-xl border border-base-content/10 ">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-2">Search Location</h2>
              <SearchBar onSearch={handleSearch}></SearchBar>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-content/10 flex-1">
            <div className="card-body p-4">
              <h2 className="card-title text-lg">Location Details</h2>
              <div className="flex flex-col gap-2 mt-4 text-base-content/70">
                <p>Start typing to see data here...</p>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-8 h-[50vh] lg:h-auto min-h-100">
          <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-base-content/10">
            <MapView></MapView>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
