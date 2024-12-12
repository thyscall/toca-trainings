import React, { useState, useEffect } from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";
import "./login.css";
import notifier from './loginNotifier';

export default function Login({ onAuthChange }) {
  const [authState, setAuthState] = useState(AuthState.Unknown);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);


  
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      
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

  const handleLogin = async (loginUserName) => {
    try {
      handleAuthChange(loginUserName, AuthState.Authenticated);
      notifier.sendLoginNotification(loginUserName); // Notify other users
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  

  return (
    <div>
    <main className="login-page bg-secondary text-center">
      {authState !== AuthState.Unknown && <h1>Welcome to Toca</h1>}
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
    </div>
  );
};