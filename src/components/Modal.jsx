import { useState } from "react";

function Modal({ setModal, getData }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const addMarker = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/markers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, desc, lat, long }),
      });

      const data = await response.json();
      if (data["success"]) {
        // close modal
        getData();
        setModal(false);
      } else {
        console.log("something happened");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="center modal">
        <div className="card card-modal">
          <div className="modal-header">
            <h2 className="modal-title">Add new location</h2>
            <div style={{ cursor: "pointer" }} onClick={() => setModal(false)}>
              X
            </div>
          </div>
          <form action="/markers" method="post">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name of the place"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description of the place"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
                onChange={(e) => setLong(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button onClick={addMarker}>Add to map</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
