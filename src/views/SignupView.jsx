import "../App.css";

function LoginView() {
  return (
    <>
    <div className="center">
      <div className="card">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        <div className="alternate-action">No account? Sign up here</div>
      </div>
      </div>
    </>
  );
}

export default LoginView;
