import "leaflet/dist/leaflet.css";

import Modal from "../components/Modal";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function MapLocator() {
  const [modal, setModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  // center position Kuala Lumpur
  const centerPosition = [3.1498119894855927, 101.69660499707578];
  const zoom = 15;
  const scrollWheelZoom = true;

  // get markers from DB
  useEffect(() => {
    const getData = async () => {
      try {
        const respose = await fetch("http://localhost:5001/api/get/markers");

        if (!respose.ok) {
          console.log("error occured, error ${response.status}");
        }

        let data = await respose.json();
        setMarkers(data.markers);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <header>
        <h1>Map Locator</h1>
        <NavLink to={"/login"} style={{ color: "white" }}>
          Logout
        </NavLink>
      </header>

      <div className="map-wrapper">
        <div className="card card-map">
          <div className="welcome">
            <div className="welcome-text">Welcome, Amrin</div>
            <button className="button" onClick={toggleModal}>
              Add New
            </button>
          </div>
          <hr />
          {loading && <div>Loading...</div>}
          <MapContainer
            center={centerPosition}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers && markers.map((marker) => (
              <Marker key={marker.id} position={[marker.latitude, marker.longitude]} />
            ))}
          </MapContainer>

          {modal && <Modal setModal={setModal} />}
        </div>
      </div>
    </>
  );
}

export default MapLocator;
