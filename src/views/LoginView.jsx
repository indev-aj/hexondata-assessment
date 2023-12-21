import "../App.css";

import { NavLink, useNavigate } from 'react-router-dom'

function LoginView() {
  const navigate = useNavigate();

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
            <button type="submit" onClick={() => navigate('/')}>Login</button>
          </div>
          <div className="alternate-action"><NavLink to={'/signup'}>No account? Sign up here</NavLink></div>
        </div>
      </div>
    </>
  );
}

export default LoginView;
