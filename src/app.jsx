// router: pulls in each page that I have 
// header and footer 

// in source folder, each jsx file (take old html and wrap it in a function to return (class -> class name) replace a tags with nav link imported from react)
import React from "react"
import "./app.css" 

function app(){
  return(
    <div>
        <header>
        <div class="logo"><h3>toca</h3>
            <div class="navbar">
                <nav class="nav-links">
                    <li><a href="index.html">home</a></li>
                    <li><a href="login.html">login</a></li>
                    <li><a href="about.html">about</a></li>
                </nav>
            </div>
        </div>

        </header>
        <body>
        <main>
        <h3><i>why toca?</i></h3>
        <p>Enhance your soccer performance through specialized training that emphasizes ball mastery, finishing, decision-making, mental resilience, and personal growth. Our expert coaches are dedicated to developing your skills and fostering a winning mindset, empowering you to achieve your goals on and off the field.</p>

        <p><b><i>athletes currently performing at</i></b></p>
        <br/>
        <img src="Images/BYUSoccer.jpg" alt="BYU Soccer" width="100" height="100"/>
        <img src="Images/UVU.png" alt="UVU Soccer" width="100" height="100"/>
        <img src="Images/SLCC.jpeg" alt="SLCC Soccer" width="115" height="100"/>
        <img src="Images/SVU.png" alt="SVU Soccer" width="100" height="100"/>
        <img src="Images/Utah Celtic FC.png" alt="Utah Celtic Soccer" width="100" height="100"/>
        <img src="Images/UtahSurf.jpg" alt="Utah Surf Soccer" width="100" height="100"/>
        </main>

        <footer>
        <span class="text-reset">keep up with Toca</span>
        <br/>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://github.com/thyscall/web-startup.git">GitHub</a>
        </footer>
        </body>
    </div>
    )
}