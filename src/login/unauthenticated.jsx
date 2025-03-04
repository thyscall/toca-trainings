// import React, { useState } from "react";

// export function Unauthenticated({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isCreatingAccount, setIsCreatingAccount] = useState(false);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const data = await response.json();
//       document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`;
//       localStorage.setItem("authToken", data.token);
//       onLogin(email);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCreateAccount = async () => {
//     try {
//       const response = await fetch("/api/auth/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || "Failed to create account");
//       }

//       setError("Account created successfully! You can now log in.");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>{isCreatingAccount ? "Create New Account" : "Login"}</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {isCreatingAccount ? (
//         <button onClick={handleCreateAccount}>Create Account</button>
//       ) : (
//         <button onClick={handleLogin}>Login</button>
//       )}
//       <button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
//         {isCreatingAccount ? "Go to Login" : "Create New Account"}
//       </button>
//     </div>
//   );
// }
import React, { useState } from "react";

export function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`;
      localStorage.setItem("authToken", data.token);
      onLogin(email);
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
        const errorData = await response.json(); // Get detailed error
        throw new Error(errorData.msg || "Account creation failed");
      }
  
      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`;
      localStorage.setItem("authToken", data.token);
      onLogin(email); 
    } catch (err) {
      setError(err.message); 
    }
  };
  

  return (
    <div className="login-form">
      <h2>{isCreatingAccount ? "Create Account" : "Login"}</h2>
      {error && <p className="error-text">{error}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button
        onClick={isCreatingAccount ? handleCreateAccount : handleLogin}
        className="login-button"
      >
        {isCreatingAccount ? "Create Account" : "Login"}
      </button>

      <button
        onClick={() => setIsCreatingAccount(!isCreatingAccount)}
        className="toggle-button"
      >
        {isCreatingAccount ? "Go to Login" : "Create New Account"}
      </button>
    </div>
  );
}
