import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

function MapLocator() {
  const centerPosition = [3.1498119894855927, 101.69660499707578];
  const zoom = 15;
  const scrollWheelZoom = true;

  return (
    <>
      <header>
        <h1>Map Locator</h1>
        <a href="#" className="logout">
          Logout
        </a>
      </header>

      <div className="map-wrapper">
        <div className="card card-map">
          <div className="welcome">
            <div className="welcome-text">Welcome, Amrin</div>
            <button className="button">Add New</button>
          </div>
          <hr />
          <MapContainer
            center={centerPosition}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default MapLocator;
