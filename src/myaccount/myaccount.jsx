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
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // // Initialize WebSocket connection
  // useEffect(() => {
  //   const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  //   const ws = new WebSocket(`ws://localhost:4000/ws`);

  //   ws.onopen = () => {
  //     console.log("Connected to WebSocket");
  //     setSocket(ws);
  //   };

  //   ws.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);

  //       if (data.type === "training-session-update") {
  //         console.log("New training session update received:", data.sessionDetails);
  //         setTrainingHistory((prevHistory) => [...prevHistory, data.sessionDetails]);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing WebSocket message:", error);
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket connection closed");
  //     setSocket(null);
  //   };

  //   ws.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   // Cleanup WebSocket connection on component unmount
  //   return () => {
  //     if (ws) ws.close();
  //   };
  // }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit a new training session
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation for session details
    if (!formData.date || !formData.focus || !formData.type || !formData.duration) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/training-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionDetails: formData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save training session');
      }
  
      const newSession = await response.json();
      setTrainingHistory([...trainingHistory, newSession]);
      setFormData({ date: '', focus: '', type: '', duration: '', feedback: '' });
    } catch (err) {
      console.error('Error saving training session:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <header></header>
      <main className="full-width">
        <h2>Training History</h2>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
                <td>{entry.date}</td>
                <td>{entry.focus}</td>
                <td>{entry.type}</td>
                <td>{entry.duration}</td>
                <td>{entry.feedback}</td>
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
