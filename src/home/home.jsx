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
      <header>
      </header>

      <main>
      <h3>Why Toca?</h3>
      <p>Enhance your soccer performance through specialized training that emphasizes ball mastery, finishing, decision-making, mental resilience, and personal growth. Our expert coaches are dedicated to developing your skills and fostering a winning mindset, empowering you to achieve your goals on and off the field.</p>
      <p>Athletes currently performing at</p>
        <header className="teams">
        <img src="Images/BYUSoccer.jpg" alt="BYU Soccer" width="150" height="150"/>
        <img src="Images/UVU.png" alt="UVU Soccer" width="100" height="100"/>
        <img src="Images/SLCC.jpeg" alt="SLCC Soccer" width="115" height="100"/>
        <img src="Images/SVU.png" alt="SVU Soccer" width="100" height="100"/>
        <img src="Images/Utah Celtic FC.png" alt="Utah Celtic Soccer" width="100" height="100"/>
        <img src="Images/UtahSurf.jpg" alt="Utah Surf Soccer" width="100" height="100"/>
        </header>

         {/* Real-Time Notifications Section */}
        <section className="notifications">
          <h4>Real-Time Notifications</h4>
          <ul>
            {messages.map((msg, index) => ( // Displaying real-time messages
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </section>
        {/* Input Section */}
        <div className="message-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
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


