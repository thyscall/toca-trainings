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
        <h2><b><i>about toca</i></b></h2>
        <p>
          Each training with Toca is structured to improve technical ability, individual mentality, and personal growth. My
          players will be the first to tell you that I match their commitment: any time, any place, any condition. These are the
          trainings I wish I had early on in my career.
        </p>

        <p>
          Trainings are tailored to each player's goals, skillset, age, competition level, and schedule. Training sessions are
          held at Lakeside Sports Park in Orem, UT.
        </p>

        <h2><b><i>about me</i></b></h2>
        <img src="Images/BYU-54_Original.jpg" alt="Thys Call BYU Soccer" width="400" height="500" />
        <p>
          I started playing soccer at the age of two. I went on to play, watch, and coach soccer almost every day for the next
          16 years. After thousands of hours of training, I played college soccer and gained an education at Brigham
          Young University. I have been fortunate to be surrounded by incredible players and coaches throughout my career.
          I am a lifelong Arsenal fan and enjoy keeping up with all of the top leagues across the world, especially the Premier League. 
        </p>
        <h2><b><i>premier league table</i></b></h2>
{loading && <p>Loading standings...</p>}
{error && <p style={{ color: "red" }}>Error: {error}</p>}
{!loading && !error && leagueTable.length > 0 && (
    <table className="league-table">
    <thead>
      <tr>
        <th className="position-column">Position</th>
        <th className="team-column">Team</th>
        <th className="played-column">Played</th>
        <th className="points-column">Points</th>
        <th className="goal-diff-column">Goal Difference</th>
      </tr>
    </thead>
    <tbody>
      {leagueTable.map((team) => (
        <tr key={team.team.id}>
          <td className="position-column">{team.position}</td>
          <td className="team-column">
            <div className="team-info">
              <img src={team.team.crest} alt={team.team.name} className="team-logo" />
              <span className="team-name">{team.team.name}</span>
            </div>
          </td>
          <td className="played-column">{team.playedGames}</td>
          <td className="points-column">{team.points}</td>
          <td className="goal-diff-column">{team.goalDifference}</td>
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
