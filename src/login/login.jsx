import React from "react";
import "./login.css";

export default function Login() {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <h3>Toca Pro</h3>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <h1>Welcome to Toca</h1>
        <form>
          <div>
            <span>@</span>
            <input type="text" placeholder="username" />
          </div>
          <div>
            <span>🔒</span>
            <input type="password" placeholder="password" />
          </div>
          <button type="submit">Login</button>
          <button type="button">Sign Up</button>
        </form>
      </main>

      {/* Footer */}
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
    </div>
  );
}
export { Login };