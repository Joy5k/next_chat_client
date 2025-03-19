import { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize socket connection to the backend
const socket = io("https://next-chat-server.onrender.com");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message); 
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..."
      />
   
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
