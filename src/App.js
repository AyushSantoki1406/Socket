import React, { useState, useEffect } from "react";

const App = () => {
  const [stats, setStats] = useState({
    rss: "",
    heapTotal: "",
    heapUsed: "",
    external: "",
  });

  useEffect(() => {
    const ws = new WebSocket(
      `wss://https://seahorse-app-53wlg.ondigitalocean.app}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats({
        rss: data.rss,
        heapTotal: data.heapTotal,
        heapUsed: data.heapUsed,
        external: data.external,
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Server stats</h1>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Memory usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RSS</td>
            <td>{stats.rss}</td>
          </tr>
          <tr>
            <td>Heap total</td>
            <td>{stats.heapTotal}</td>
          </tr>
          <tr>
            <td>Heap used</td>
            <td>{stats.heapUsed}</td>
          </tr>
          <tr>
            <td>External</td>
            <td>{stats.external}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
