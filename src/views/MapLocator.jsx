import "leaflet/dist/leaflet.css";

import Modal from "../components/Modal";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MapLocator() {
  const [modal, setModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const toggleModal = () => {
    setModal(!modal);
  };

  // center position Kuala Lumpur
  const centerPosition = [3.1498119894855927, 101.69660499707578];
  const zoom = 15;
  const scrollWheelZoom = true;

  const getUser = async () => {
    try {
      const respose = await fetch("http://localhost:5001/api/get/user", {
        method: "GET",
      });

      if (!respose.ok) {
        console.log("error occured, error ${response.status}");
      }

      let data = await respose.json();
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

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

  // get markers from DB
  useEffect(() => {
    getData();
    // getUser();
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
            <div className="welcome-text">Welcome, {location.state.user}</div>
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

            {markers &&
              markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.latitude, marker.longitude]}
                />
              ))}
          </MapContainer>

          {modal && <Modal setModal={setModal} getData={getData} />}
        </div>
      </div>
    </>
  );
}

export default MapLocator;
