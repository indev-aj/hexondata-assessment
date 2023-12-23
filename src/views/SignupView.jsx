import "../App.css";
import {useState} from "react";

import { NavLink, useNavigate } from "react-router-dom";

function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      try {
        const response = await fetch("http://localhost:5001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (data['success']) {
          navigate('/');
        }
        
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("password mismatch");
    }
  };
  return (
    <>
      <div className="center">
        <div className="card">
          <h2>Sign up</h2>
          <form action="/register" method="post">
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
              <input
                type="password"
                id="confirm0password"
                name="confirm-password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button onClick={handleRegister}>Sign up</button>
            </div>
            <div className="alternate-action">
              <NavLink to={"/login"}>
                Already have an account? Login here
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginView;
