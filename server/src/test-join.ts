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
    socket.emit('guess', {roomCode: code, guess: 'CRANE'});
  });

  socket2.on('game-start', () => {
    console.log('Game started Bob');
    socket2.emit('typing', {roomCode: code, typed: 'CGEF'});
  });

  socket.on('opponent-typed', (typed) => {
    console.log(typed);
  });

  socket.on('invalid-guess', (error) => {
    console.log(error);
  });

  socket.on('guess-result', (guessResult) => {
    console.log(guessResult);
  });

  socket.on('opponent-guess', (opponentGuess) => {
    console.log(opponentGuess);
  });

  socket.on('game-over', (winner) => {
    console.log(winner);
  });

  socket2.on('opponent-typed', (typed) => {
    console.log(typed);
  });

  socket2.on('invalid-guess', (error) => {
    console.log(error);
  });

  socket2.on('guess-result', (guessResult) => {
    console.log(guessResult);
  });

  socket2.on('opponent-guess', (opponentGuess) => {
    console.log(opponentGuess);
  });

  socket2.on('game-over', (winner) => {
    console.log(winner);
  });
};

main();
