const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });


const messageHistory = [];

server.on('connection', ws => {
  ws.on('message', data => {
    const messageData = JSON.parse(data);
    if (messageData.type === 'newMessage') {
      const message = `${messageData.username}: ${messageData.message}`;
      messageHistory.push(message);
      server.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'newMessage', message }));
        }
      });
    }
  });

  // Send message history to the new client
  ws.send(JSON.stringify({ type: 'messageHistory', messageHistory }));

  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the chat!' }));
});

console.log('WebSocket server is running on ws://localhost:8080');

