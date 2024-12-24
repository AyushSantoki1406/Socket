import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  const connectWebSocket = () => {
    // Try connecting to the WebSocket server
    const socket = new WebSocket(
      "wss://seahorse-app-53wlg.ondigitalocean.app/strategy_1"
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setConnectionStatus("Connected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Display error message
      setMessage(`WebSocket error: ${error.message || "Unknown error"}`);
      setConnectionStatus("Error: Connection failed");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed, reconnecting...");
      setConnectionStatus("Reconnecting...");
      setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
    };

    // Listen for messages from the server
    socket.onmessage = (event) => {
      console.log("Message received from server:", event.data);
      setMessage(event.data);
    };

    setSocket(socket);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Status: {connectionStatus}</p>
      <p>Message from server: {message}</p>
    </div>
  );
}

export default App;
