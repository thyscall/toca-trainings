import React, { useState, useEffect } from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";
import "./login.css";

export default function Login({ onAuthChange }) {
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);
  const [userName, setUserName] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Verify authentication token with server
        const response = await fetch("/api/auth/verify", {
          method: "GET", // Updated to use GET method
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        const data = await response.json();
        setUserName(data.email); // Use the email from server response
        setAuthState(AuthState.Authenticated);
      } catch (err) {
        setAuthState(AuthState.Unauthenticated);
      }
    };

    verifyAuth();
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