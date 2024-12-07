import React from "react";

export function Authenticated({ userName, onLogout }) {
  return (
    <div>
      <h2>Welcome Back, {userName}!</h2>
      <button className="btn btn-danger" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
