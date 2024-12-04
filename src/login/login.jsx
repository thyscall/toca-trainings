import React from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";
import "./login.css";

export default function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="login-page bg-secondary text-center">
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Toca</h1>}
        {authState === AuthState.Authenticated && (<Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) =>
              onAuthChange(loginUserName, AuthState.Authenticated)
            }
          />
        )}
      </div>
    
      <footer>
        <hr />
        <span className="text-reset">Keep up with Toca</span>
        <br />
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://github.com/thyscall/web-startup.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </main>
    
  );
}
export { Login };