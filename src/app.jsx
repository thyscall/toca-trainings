import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Login } from "./login/login";
import { About } from "./about/about";
import { MyAccount } from "./myaccount/myaccount";
import { AuthState } from "./login/authState";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import Home from "./home/home";

function App() {
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);
  const [userName, setUserName] = useState("");

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
                <NavLink className="nav-link" to="/" exact="true">
                  Home
                </NavLink>
              </li>
              {/* Only show Login link if unauthenticated */}
              {authState === AuthState.Unauthenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {/* Authenticated-only links */}
              {authState === AuthState.Authenticated && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/myaccount">
                      My Account
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </menu>
          </nav>
        </header>
          <Routes>
            <Route path="/" element={<Home />} exact="true" />
            <Route
            path="/login"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, newAuthState) => {
                  setAuthState(newAuthState);
                  setUserName(userName);
                }}
              />
            }
          />
            <Route path="/about" element={<About />} />
            <Route path="/about" element={<About />} />
          {/* MyAccount is protected */}
          {authState === AuthState.Authenticated && (
            <Route path="/myaccount" element={<MyAccount />} />
          )}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Toca Pro</span>
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