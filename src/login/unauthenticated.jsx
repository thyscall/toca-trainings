import React, { useState } from "react";
import "./login.css";

export function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      onLogin(email); // Pass the username back to the parent
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await fetch("/api/auth/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to create account");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      onLogin(email); // Automatically log in the new user
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div>
      <h2>Welcome to Toca</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <br></br>
      <button onClick={handleCreateAccount}>Create an account</button>
    </div>
  );
}
