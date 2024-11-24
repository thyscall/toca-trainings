import React from "react"
import "./app.css" 

function login(){
  return(
    <div>
    <header>
      <div class="logo"><h3>Toca Pro</h3></div>
        <div class="navbar">
          <nav class="nav-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="login.html">Login</a></li>
              <li><a href="about.html">About</a></li>
          </nav>
      </div>
    </header>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toca Trainings</title>
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    <main>
      <h1>Welcome to Toca</h1>
      <form method="get" action="play.html">
        <div>
          <span>@</span>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit"><a href="myaccount.html">Login</a></button>
        <button type="submit">Sign Up</button>
      </form>
    </main>

    <footer>
        <hr />
        <span class="text-reset">Keep up with Toca</span>
        <br />
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://github.com/thyscall/web-startup.git">GitHub</a>
      </footer>
  </body>
  </div>
  )
}
