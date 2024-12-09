import React, { useState, useEffect } from "react";
import "./about.css";

export default function About() {
  const [leagueTable, setLeagueTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagueTable = async () => {
      try {
        // No need to manually read the token cookie
        const response = await fetch("/api/premier-league-standings", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent automatically
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching standings: ${response.statusText}`);
        }
  
        const data = await response.json(); // Parsing the data
        setLeagueTable(data.standings[0]?.table || []); // Handle undefined standings gracefully
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeagueTable();
  }, []);

  return (
    <div>
      {/* Header */}
      <header></header>

      {/* Main Content */}
      <main className="about">
        <h2>About Toca</h2>
        <p>
          Each training with Toca is structured to improve technical ability, individual mentality, and personal growth. My
          players will be the first to tell you that I match their commitment: any time, any place, any condition. These are the
          trainings I wish I had early on in my career.
        </p>

        {/* Inspirational Quote Section */}
        <div className="quote-box">
          <blockquote className="quote">
            "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing or learning to do."
          </blockquote>
          <p className="author">- Pele</p>
        </div>

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
        <img src="Images/BYU-54_Original.jpg" alt="Thys Call BYU Soccer" width="400" height="500" />
        <p>
          I started playing soccer at the age of two. I went on to play, watch, and coach soccer almost every day for the next
          16 years. After thousands of hours of training, I played college soccer and gained an education at Brigham
          Young University. I have been fortunate to be surrounded by incredible players and coaches throughout my career.
          I am a lifelong Arsenal fan and enjoy keeping up with all of the top leagues across the world, especially the Premier League. 
        </p>
        <h2>Premier League Table</h2>
        {loading && <p>Loading standings...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && leagueTable.length > 0 && (
          <table className="league-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Points</th>
                <th>Goal Difference</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.position}</td>
                  <td>
                    <img
                      src={team.team.crest}
                      alt={team.team.name}
                      width="30"
                      height="30"
                      style={{ marginRight: "10px" }}
                    />
                    {team.team.name}
                  </td>
                  <td>{team.playedGames}</td>
                  <td>{team.points}</td>
                  <td>{team.goalDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* Footer */}
      <footer>
        <hr />
        <span className="text-reset">Keep up with Toca</span>
        <br />
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"> Instagram </a>
        <a href="https://github.com/thyscall/web-startup.git" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  );
}

export { About };
