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
//   const [error, setError] = useState(null);
//   const [socket, setSocket] = useState(null);

//   // WebSocket
//   useEffect(() => {
//     const ws = new WebSocket(`ws://${window.location.host}`);
    
//     ws.onopen = () => {
//       console.log("Connected to WebSocket");
//       setSocket(ws);
//     };
  
//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.type === "userLogin") {
//           // Display a notification that a user has logged in
//           alert(`${data.username} has logged in`);
//         }
//         // Keep existing logic for training session updates
//         if (data.type === "training-session-update") {
//           setTrainingHistory((prevHistory) => [...prevHistory, data.sessionDetails]);
//         }
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };
  
//     ws.onclose = () => {
//       console.log("WebSocket connection closed");
//       setSocket(null);
//     };
  
//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };
  
//     return () => {
//       if (ws) ws.close();
//     };
//   }, []);
  

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Submit a new training session
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.date || !formData.focus || !formData.type || !formData.duration) {
//       setError("All fields are required.");
//       return;
//     }
//     try {
//       const response = await fetch('/api/training-history', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ sessionDetails: formData }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to save training session');
//       }
//       const newSession = await response.json();
//       setTrainingHistory([...trainingHistory, newSession]);
//       setFormData({ date: '', focus: '', type: '', duration: '', feedback: '' });
//     } catch (err) {
//       console.error('Error saving training session:', err.message);
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchTrainingHistory = async () => {
//       try {
//         const response = await fetch('/api/training-history', {
//           credentials: 'include',
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch training history');
//         }
//         const history = await response.json();
//         setTrainingHistory(history);
//       } catch (err) {
//         console.error('Error fetching training history:', err.message);
//         setError(err.message);
//       }
//     };
  
//     fetchTrainingHistory();
//   }, []);
  
  

//   return (
//     <div>
//       <header></header>
//       <main className="full-width">
//         <h2>Training History</h2>
//         {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
//                 <td>{entry.date}</td>
//                 <td>{entry.focus}</td>
//                 <td>{entry.type}</td>
//                 <td>{entry.duration}</td>
//                 <td>{entry.feedback}</td>
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
  const [error, setError] = useState(null);
 // fetch tokens from cookies
  const fetchAuthToken = () => {
    let authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!authToken) {
      authToken = localStorage.getItem("authToken");
    }

    return authToken;
  };

  // Fetch training history
  useEffect(() => {
    const fetchTrainingHistory = async () => {
      try {
        const authToken = fetchAuthToken();

        if (!authToken) {
          throw new Error("No authentication token found");
        }

        const response = await fetch('/api/training-history', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized or failed to fetch training history");
        }

        const data = await response.json();
        setTrainingHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching training history:", err);
        setError(err.message);
        setTrainingHistory([]);
      }
    };

    fetchTrainingHistory();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit a new training session
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = fetchAuthToken

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch('/api/training-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ sessionDetails: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to save training session");
      }

      const newSession = await response.json();
      setTrainingHistory([...trainingHistory, newSession]);
      setFormData({
        date: "",
        focus: "",
        type: "",
        duration: "",
        feedback: "",
      });
    } catch (err) {
      console.error("Error saving training session:", err);
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