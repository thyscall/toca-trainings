import React, { useEffect, useState } from "react";
import "./myaccount.css";

export function MyAccount() {
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    focus: "",
    type: "",
    duration: "",
    feedback: "",
  });

  useEffect(() => {
    fetch('/api/training-history')
      .then((response) => response.json())
      .then((data) => setTrainingHistory(data))
      .catch((err) => console.error("Error fetching training history:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit a new training session
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/training-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionDetails: formData, user: "current-user@example.com" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save training session");
        }
      })
      .then(() => {
        setTrainingHistory([...trainingHistory, formData]);
        setFormData({
          date: "",
          focus: "",
          type: "",
          duration: "",
          feedback: "",
        });
      })
      .catch((err) => console.error("Error saving training session:", err));
  };

  return (
    <div>
      <header></header>
      <main className="full-width">
        <h1>My Training History</h1>
        <table className="training-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Focus</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {trainingHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.sessionDetails?.date || entry.date}</td>
                <td>{entry.sessionDetails?.focus || entry.focus}</td>
                <td>{entry.sessionDetails?.type || entry.type}</td>
                <td>{entry.sessionDetails?.duration || entry.duration}</td>
                <td>{entry.sessionDetails?.feedback || entry.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Record a New Training Session</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Focus:
            <input
              type="text"
              name="focus"
              value={formData.focus}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="Private">Private</option>
              <option value="Group">Group</option>
            </select>
          </label>
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Feedback:
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              required
            ></textarea>
          </label>
          <button type="submit">Save Training Session</button>
        </form>
      </main>
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
