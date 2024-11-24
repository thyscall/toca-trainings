// model each web HTML page after this

import React from "react"
import "./about.css" 

function about(){
  return(
    <div>
      <header>
        <div class="logo"><h3>toca</h3></div>
          <div class="navbar">
            <nav class="nav-links">
                <li><a href="index.html">home</a></li>
                <li><a href="login.html">login</a></li>
                <li><a href="about.html">about</a></li>
            </nav>
          </div>

      </header>
        <body>
          <h2>About Toca</h2>
          <p>
            Each training with Toca is structured to improve technical ability, individual mentality, and personal growth. 
            My players will be the first to tell you that I match their commitment: any time, any place, any condition. 
            These are the trainings I wish I had early on in my career.
            <br/>
            Trainings are tailored to each player's goals, skillset, age, competition level, and schedule. Training sessions are held at Lakeside Sports Park in Orem, UT. See map below for details. 
          </p>
          <img src="Images/Lakeside Sports Park Google Maps.png" alt="Lakeside Sports Park" width="650" height="500"/>

          <h2>About Me</h2>
          <p>I started playing soccer at the age of two. I went on to play, watch, and coach soccer almost every day for the next 16 years. 
            After thousands of hours of training, I went on to play college soccer and gain an education at Brigham Young University. 
            I have been fortunate to be surrounded by incredible players and coaches throughout my career. 
            <br/>
          </p>
          <img src="Images/BYU-54_Original.jpg" alt="Thys Call BYU Soccer" width="400" height="500"/>
        </body>
        

        <footer>
            <hr />
            <span class="text-reset">Keep up with Toca</span>
            <br />
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://github.com/thyscall/web-startup.git">GitHub</a>
        </footer>
    </div>
  )
}