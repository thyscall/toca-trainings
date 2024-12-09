import React, { useState, useEffect } from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";
import "./login.css";

export default function Login({ onAuthChange }) {
  const [authState, setAuthState] = useState(AuthState.Unknown);
  const [userName, setUserName] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // Verify the token with the server
      fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Invalid token");
        })
        .then((data) => {
          setUserName(data.userName);
          setAuthState(AuthState.Authenticated);
        })
        .catch(() => {
          setAuthState(AuthState.Unauthenticated);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, []);

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);
    onAuthChange(newUserName, newAuthState);
  };

  return (
    <main className="login-page bg-secondary text-center">
      {authState !== AuthState.Unknown && <h1></h1>}
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => handleAuthChange("", AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          onLogin={(loginUserName) =>
            handleAuthChange(loginUserName, AuthState.Authenticated)
          }
        />
      )}
    </main>
  );
};