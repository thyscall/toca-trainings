// import React, { useEffect, useState } from "react";
// import "./myaccount.css";

// export function MyAccount() {
//   const [trainingHistory, setTrainingHistory] = useState([]);
//   const [formData, setFormData] = useState({
//     date: "",
//     focus: "",
//     type: "",
//     duration: "",
//     feedback: "",
//   });

//   useEffect(() => {
//     fetch('/api/training-history')
//       .then((response) => response.json())
//       .then((data) => setTrainingHistory(data))
//       .catch((err) => console.error("Error fetching training history:", err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Submit a new training session
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     fetch('/api/training-history', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionDetails: formData, user: "current-user@example.com" }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to save training session");
//         }
//       })
//       .then(() => {
//         setTrainingHistory([...trainingHistory, formData]);
//         setFormData({
//           date: "",
//           focus: "",
//           type: "",
//           duration: "",
//           feedback: "",
//         });
//       })
//       .catch((err) => console.error("Error saving training session:", err));
//   };

//   return (
//     <div>
//       <header></header>
//       <main className="full-width">
//         <h1>My Training History</h1>
//         <table className="training-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Focus</th>
//               <th>Type</th>
//               <th>Duration</th>
//               <th>Feedback</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trainingHistory.map((entry, index) => (
//               <tr key={index}>
//                 <td>{entry.sessionDetails?.date || entry.date}</td>
//                 <td>{entry.sessionDetails?.focus || entry.focus}</td>
//                 <td>{entry.sessionDetails?.type || entry.type}</td>
//                 <td>{entry.sessionDetails?.duration || entry.duration}</td>
//                 <td>{entry.sessionDetails?.feedback || entry.feedback}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h2>Record a New Training Session</h2>
//         <form onSubmit={handleFormSubmit}>
//           <label>
//             Date:
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Focus:
//             <input
//               type="text"
//               name="focus"
//               value={formData.focus}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Type:
//             <select name="type" value={formData.type} onChange={handleInputChange} required>
//               <option value="">Select</option>
//               <option value="Private">Private</option>
//               <option value="Group">Group</option>
//             </select>
//           </label>
//           <label>
//             Duration:
//             <input
//               type="text"
//               name="duration"
//               value={formData.duration}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Feedback:
//             <textarea
//               name="feedback"
//               value={formData.feedback}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </label>
//           <button type="submit">Save Training Session</button>
//         </form>
//       </main>
//       <footer>
//         <hr />
//         <span className="text-reset">Keep up with Toca</span>
//         <br />
//         <a
//           href="https://www.instagram.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Instagram
//         </a>
//         <a
//           href="https://github.com/thyscall/web-startup.git"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           GitHub
//         </a>
//       </footer>
//     </div>
//   );
// }
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
    fetch("/api/training-history")
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
    fetch("/api/training-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionDetails: formData, user: "current-user@example.com" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save training session");
        }
        return response.json();
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
    <div className="myaccount-container">
      

    {/* Booking Section */}
    <section className="booking-section">
      <h2>Book a Future Training</h2>
      <p>Select a date, time, and type of training session</p>
      <form className="booking-form">
        {/* Date Selection */}
        <label>Date:</label>
        <input type="date" name="trainingDate" required />

        {/* Time Selection */}
        <label>Time:</label>
        <select name="trainingTime" required>
          <option value="">Select Time</option>
          <option value="3:30-4:30">3:30 - 4:30 PM</option>
          <option value="4:30-5:30">4:30 - 5:30 PM</option>
          <option value="5:30-6:30">5:30 - 6:30 PM</option>
        </select>

        {/* Training Type */}
        <label>Type:</label>
        <select name="trainingType" required>
          <option value="">Select Type</option>
          <option value="Private">Private</option>
          <option value="Group">Group</option>
        </select>

        {/* Location (Only 1 Option) */}
        <label>Location:</label>
        <select name="trainingLocation" required>
          <option value="Lakeside Park, Orem, UT">Lakeside Park, Orem, UT</option>
        </select>

        {/* Duration (Only 1 Option) */}
        <label>Duration:</label>
        <select name="trainingDuration" required>
          <option value="1 hour">1 Hour</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="primary-button">Book Now</button>
      </form>
    </section>


      {/* Data Visualization Section (Placeholder) */}
      <section className="data-visualization">
        <h2>Performance Overview</h2>
        <p>Graphs and performance data will be displayed here</p>
        <div className="chart-placeholder">📊 [Charts Coming Soon]</div>
      </section>

      {/* Training History */}
      <section className="training-history">
        <h2>Training History</h2>
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
      </section>
    </div>
  );
}
