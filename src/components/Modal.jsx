function Modal() {
  return (
    <>
      <div className="center">
        <div className="card card-modal">
          <h2 className="modal-title">Add new location</h2>
          <hr />
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
            <button type="submit">Add to map</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
