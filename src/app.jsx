import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./login/login"; // Corrected import
import { About } from "./about/about";
import { MyAccount } from "./myaccount/myaccount";
import { AuthState } from "./login/authState";
import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home/home";

function App() {
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);
  const [userName, setUserName] = useState("");

  return (
    <div className="body bg-dark text-light">
      <BrowserRouter>
      <header className="container-fluid">
      <nav className="navbar">
        {/* Make "Toca Pro" clickable and link to Home */}
        <NavLink className="navbar-brand" to="/">toca</NavLink>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">home</NavLink>
            </li>
            {authState === AuthState.Unauthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">login</NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">about</NavLink>
            </li>
            {authState === AuthState.Authenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myaccount">my account</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">logout</NavLink>
                </li>
              </>
            )}
          </ul>
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
          {/* MyAccount is protected */}
          {authState === AuthState.Authenticated && (
            <Route path="/myaccount" element={<MyAccount />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;
