import React from "react";
import "./about.css";

export default function About() {
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
        <h2>About Toca</h2>
        <p>
          Each training with Toca is structured to improve technical ability, individual mentality, and personal growth. My
          players will be the first to tell you that I match their commitment: any time, any place, any condition. These are the
          trainings I wish I had early on in my career.
        </p>
        <p>
          Trainings are tailored to each player's goals, skillset, age, competition level, and schedule. Training sessions are
          held at Lakeside Sports Park in Orem, UT. See map below for details.
        </p>
        <img
          src="Images/Lakeside Sports Park Google Maps.png"
          alt="Lakeside Sports Park"
          width="650"
          height="500"
        />

        <h2>About Me</h2>
        <p>
          I started playing soccer at the age of two. I went on to play, watch, and coach soccer almost every day for the next
          16 years. After thousands of hours of training, I went on to play college soccer and gain an education at Brigham
          Young University. I have been fortunate to be surrounded by incredible players and coaches throughout my career.
        </p>
        <img src="Images/BYU-54_Original.jpg" alt="Thys Call BYU Soccer" width="400" height="500" />
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
export { About };