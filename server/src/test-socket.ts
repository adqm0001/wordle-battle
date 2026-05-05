import { io } from 'socket.io-client';

const socket = io ('http://localhost:3001');

socket.on('connect', () => {
  console.log(`Connected, socket id: ${socket.id}`);
  socket.emit('ping');
});

socket.on('pong', (data) => {
  console.log('Data received:', data);
  socket.disconnect();
});

