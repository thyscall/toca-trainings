const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a WebSocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all connections to forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws };
    connections.push(connection);

ws.on('message', (data) => {
    try {
        const parsedData = JSON.parse(data);
    
        // Check if the message is about a new training session
        if (parsedData.type === 'new-training-session') {
        console.log('New training session received:', parsedData.sessionDetails);
    
        // Broadcast the new training session to all connected clients
        connections.forEach((client) => {
            if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(
                JSON.stringify({
                type: 'training-session-update',
                sessionDetails: parsedData.sessionDetails,
                })
            );
            }
        });
        }
    } catch (error) {
        console.error('Error handling WebSocket message:', error);
    }
    });
      

    // Handle client disconnections
    ws.on('close', () => {
      const index = connections.findIndex((client) => client.id === connection.id);
      if (index >= 0) {
        connections.splice(index, 1);
      }
    });

    // Respond to pings to keep connections alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Periodic ping to keep connections alive
  setInterval(() => {
    connections.forEach((client) => {
      if (!client.alive) {
        client.ws.terminate();
      } else {
        client.alive = false;
        client.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
