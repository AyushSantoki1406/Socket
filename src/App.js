// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [stats, setStats] = useState({
//     rss: "",
//     heapTotal: "",
//     heapUsed: "",
//     external: "",
//   });

//   useEffect(() => {
//     const ws = new WebSocket("wss://seahorse-app-53wlg.ondigitalocean.app");

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setStats({
//         rss: data.rss,
//         heapTotal: data.heapTotal,
//         heapUsed: data.heapUsed,
//         external: data.external,
//       });
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Server stats</h1>
//       <table>
//         <thead>
//           <tr>
//             <th colSpan="2">Memory usage</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>RSS</td>
//             <td>{stats.rss}</td>
//           </tr>
//           <tr>
//             <td>Heap total</td>
//             <td>{stats.heapTotal}</td>
//           </tr>
//           <tr>
//             <td>Heap used</td>
//             <td>{stats.heapUsed}</td>
//           </tr>
//           <tr>
//             <td>External</td>
//             <td>{stats.external}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    // WebSocket URL for the server
    const socket = new WebSocket("wss://seahorse-app-53wlg.ondigitalocean.app");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("Connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);
      setMessage(`Symbol: ${data.symbol}, P&L: ${data.runningPnL}`);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Error");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("Disconnected");
      // Optionally implement reconnection logic here
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
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
