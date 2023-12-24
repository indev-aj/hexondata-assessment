import "leaflet/dist/leaflet.css";

import Modal from "../components/Modal";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";

function MapLocator() {
  const [modal, setModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Updated isLoggedIn state

  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  // center position Kuala Lumpur
  const centerPosition = [3.1498119894855927, 101.69660499707578];
  const zoom = 15;
  const scrollWheelZoom = true;

  const handleLogout = async () => {
    try {
      // Make a request to your server to handle the logout logic
      await fetch("http://localhost:5001/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Delete the session cookie on the client side
      document.cookie =
        "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Update the isLoggedIn state
      setIsLoggedIn(false);

      // Redirect to the login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/get/markers", {
        method: "GET",
      });

      let data = await response.json();
      setMarkers(data.markers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // get markers from DB
  useEffect(() => {
    

    const fetchLoginData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/login", {
          method: "GET",
          credentials: "include",
        });

        let data = await response.json();
      } catch (err) {
        console.log(err);
      }
    };

    fetchLoginData();
    fetchData();
  }, []);

  useEffect(() => {
    // Check if the user is logged in and update the state
    const checkLoggedInStatus = async () => {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data.loggedIn) {
        setUser(data.user.username);
        setIsLoggedIn(data.loggedIn);
      } else {
        setIsLoggedIn(false);
        console.log("go back");
        navigate("/login", { replace: true });
      }
    };

    checkLoggedInStatus();
  }, [navigate]); // Run only once when the component mounts

  return (
    <>
      <header>
        <h1>Map Locator</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="map-wrapper">
        <div className="card card-map">
          <div className="welcome">
            <div className="welcome-text">Welcome, {user}</div>
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

          {modal && <Modal setModal={setModal} getData={fetchData} />}
        </div>
      </div>
    </>
  );
}

export default MapLocator;
