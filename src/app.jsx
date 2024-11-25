import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./app";
import Login from "./login/login";
import About from "./about/about";
import MyAccount from "./myaccount/myaccount";
import "./app.css";

function App() {
  return (
    <Router>
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

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>404</h1>
      <p>Return to sender. Address unknown.</p>
    </main>
  );
}