import React, { useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const [ws, setWs] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const wsInstance = new WebSocket("ws://localhost:4000"); // Explicit URL

    wsInstance.onopen = () => {
      console.log("WebSocket connection established");
    };

    wsInstance.onmessage = (event) => {
      console.log("Message received from server:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    wsInstance.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(wsInstance);

    return () => wsInstance.close(); // Cleanup
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Sending message:", input);
      ws.send(input);
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }
  };


  return (
    <div>

      <main>
      <h3><b><i>welcome to toca</i></b></h3>
      <p>Enhance your soccer performance through specialized training that emphasizes ball mastery, finishing, decision-making, mental resilience, and personal growth. Our expert coaches are dedicated to developing your skills and fostering a winning mindset, empowering you to achieve your goals on and off the field.</p>
      <p>Athletes currently performing at</p>
      <div className="image-grid">
        <img src="Images/UtahUnited.jpg" alt="Utah United" width="75" height="75"/>
        <img src="Images/BYUSoccer.jpg" alt="BYU Soccer" width="150" height="150"/>
        <img src="Images/UVU.png" alt="UVU Soccer" width="75" height="75"/>
        <img src="Images/SLCC.jpeg" alt="SLCC Soccer" width="100" height="90"/>
        <img src="Images/SVU.png" alt="SVU Soccer" width="75" height="75"/>
        <img src="Images/Utah Celtic FC.png" alt="Utah Celtic Soccer" width="75" height="75"/>
        <img src="Images/LaRoca.png" alt="La Roca Futbol Club" width="75" height="75"/>
        <img src="Images/UtahSurf.jpg" alt="Utah Surf Soccer" width="75" height="75"/>
        <img src="Images/ProvoAthleticClub.png" alt="Provo Athletic Club" width="75" height="75"/>
        </div>
        {/* Real-Time Notifications Section */}
        <div className="thought-section">
          <h3>what do you want to achieve with trainings?</h3>

          {/* Displaying Real-Time Messages */}
          <div className="thought-messages">
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>

          {/* Input Section */}
          <div className="thought-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="thought-input"
            />
            <button onClick={sendMessage} className="thought-button">Send</button>
          </div>
        </div>

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
export { Home };


