function Modal({ setModal }) {
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
          <form action="/marker" method="get">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name of the place"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description of the place"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Latitude"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
              />
            </div>
            <div className="form-group">
              <button type="submit" onClick={() => setModal(false)}>
                Add to map
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
