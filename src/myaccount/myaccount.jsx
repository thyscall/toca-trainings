import React from "react";
import "./myaccount.css";

export default function MyAccount() {
  return (
    <div>


      {/* Main Content */}
      <main>
        <h1>Welcome back to Toca</h1>
        <h2>User Training History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Training Focus</th>
              <th>Training Type</th>
              <th>Duration</th>
              <th>Coach's Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuesday, 10/15/24</td>
              <td>Ball Mastery</td>
              <td>Private</td>
              <td>60 minutes</td>
              <td>Great ball control, focus on dribbling at speed.</td>
            </tr>
            <tr>
              <td>Wednesday, 10/16/24</td>
              <td>Finishing</td>
              <td>Group</td>
              <td>75 minutes</td>
              <td>Good improvement in accuracy, work on timing shots.</td>
            </tr>
            <tr>
              <td>Thursday, 10/17/24</td>
              <td>Decision Making & Mentality</td>
              <td>Private</td>
              <td>60 minutes</td>
              <td>Check your shoulder, improve defensive awareness.</td>
            </tr>
          </tbody>
        </table>

        <h2>Athlete Improvement Tracker</h2>
        <p>Record your perceived improvement after each training session:</p>
        <form id="improvement-form">
          <label htmlFor="improvement">Enter Improvement (1-10): </label>
          <input
            type="number"
            id="improvement"
            name="improvement"
            min="1"
            max="10"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <div className="chart-container">
          <canvas id="improvementChart"></canvas>
        </div>
        <img
          src="Images/LineChart.png"
          alt="Player Progression"
          width="500"
          height="300"
        />
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
export { MyAccount };