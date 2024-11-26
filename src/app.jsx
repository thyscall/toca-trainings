import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Login } from "./login/login";
import { About } from "./about/about";
import { MyAccount } from "./myaccount/myaccount";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";

function App() {
  return (
      
      <div className="body bg-dark text-light">
      <BrowserRouter>
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">
              Toca Pro
            </div>
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
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Toca Pro Team</span>
            <a
              className="text-reset"
              href="https://github.com/webprogramming260/simon-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </div>
        </footer>
      </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;