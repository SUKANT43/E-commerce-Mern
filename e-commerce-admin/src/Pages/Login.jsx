import logo from "../Components/Assets/click.png";
import { useState } from "react";
import "./CSS/Login.css";

export function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  function handleClick() {
    if (name === "dummy@gmail.com" && pass === "dummy1234") {
      setName("");
      setPass("");
      setErr(false);
      onLogin(true); // Call authentication function
    } else {
      setErr(true);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo" />
        </div>
        <h2 className="title">Admin Login</h2>
        <form>
          <div className="input-group">
            <label>Admin ID</label>
            <input
              type="text"
              placeholder="Enter Admin ID"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className="login-button" type="button" onClick={handleClick}>
            Login
          </button>
          {err && <p className="error-text">Enter password or username correctly</p>}
        </form>
      </div>
    </div>
  );
}
