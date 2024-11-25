import React from "react";
import { NavLink } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <h3>Toca Pro</h3>
        </div>
        <nav className="navbar fixed-top navbar-dark">
          <menu className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/myaccount">
                My Account
              </NavLink>
            </li>
          </menu>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <h1>Welcome to Toca</h1>
        <form>
          <div>
            <span>@</span>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <span>🔒</span>
            <input type="password" placeholder="password" />
          </div>
          <button type="submit">Login</button>
          <button type="button">Sign Up</button>
        </form>
      </main>

      {/* Footer */}
      <footer>
        <hr />
        <span className="text-reset">Keep up with Toca</span>
        <br />
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://github.com/thyscall/web-startup.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
