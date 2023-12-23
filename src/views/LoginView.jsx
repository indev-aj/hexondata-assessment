import "../App.css";
import {useState} from "react";

import { NavLink, useNavigate } from "react-router-dom";

function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data['success']) {
        navigate('/');
      } else {
        console.log('no user found');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  return (
    <>
      <div className="center">
        <div className="card">
          <h2>Login</h2>
          <form action="/login" method="post">
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="alternate-action">
              <NavLink to={"/signup"}>No account? Sign up here</NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginView;
