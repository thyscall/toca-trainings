import React from "react";

export function Authenticated({ onLogout }) {
  return (
    <div>
      <h1>Welcome Back!</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
