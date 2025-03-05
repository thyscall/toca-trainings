const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  // Handle protocol upgrades
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Store all active WebSocket connections
  let connections = [];

  // Broadcast a message to all connected clients
  function broadcastMessage(message) {
    connections.forEach((c) => {
      c.ws.send(JSON.stringify(message));
    });
  }

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws };
    connections.push(connection);

    // Forward messages to all other clients
    ws.on('message', (data) => {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Handle close event
    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== connection.id);
    });

    // Respond to pong messages to maintain connection
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep connections alive with ping/pong
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  return { broadcastMessage };
}

module.exports = { peerProxy };
