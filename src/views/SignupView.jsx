import "../App.css";

import { NavLink } from 'react-router-dom'

function LoginView() {
  return (
    <>
    <div className="center">
      <div className="card">
        <h2>Sign up</h2>
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
          <button type="submit">Sign up</button>
        </div>
        <div className="alternate-action"><NavLink to={'/login'}>Already have an account? Login here</NavLink></div>
      </div>
      </div>
    </>
  );
}

export default LoginView;
