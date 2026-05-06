import { io } from 'socket.io-client';

async function main() {
  
  const res = await fetch('http://localhost:3001/rooms', { method: 'POST' });
  const { code } = await res.json() as {code: string};
  console.log('Room: ', code);

  const socket = io('http://localhost:3001');
  const socket2 = io('http://localhost:3001');
  
  socket.on('connect', () => {
    console.log('Alice connected');     
    socket.emit('join-room', {roomCode: code, playerName: 'Alice'});
  });

  socket2.on('connect', () => {
    console.log('Bob connected');
    socket2.emit('join-room', {roomCode: code, playerName: 'Bob'});
  });

  socket.on('room-joined', () => {
    console.log('Alice has joined');
  });

  socket2.on('room-joined', () => {
    console.log('Bob has joined');
  });

 socket.on('game-start', () => {
    console.log('Game started Alice');
  });

  socket2.on('game-start', () => {
    console.log('Game started Bob');
  });
}

main();
