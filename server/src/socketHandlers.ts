import { Server as SocketServer, Socket } from 'socket.io'
import { rooms } from './routes/rooms'
import {isRealWord} from './words';

export function registerSocketHandlers(io: SocketServer) {
 io.on("connection", (socket: Socket) => {
 console.log(`Socket ID: ${socket.id}`); 

  socket.on('join-room', ({roomCode, playerName }) => {
    const room = rooms.get(roomCode); 
    if (!room){
      socket.emit('error', {error: 'Room not found'});  
      return;
    }

    if (room.getPlayerCount() === 2){
      socket.emit('error', {error: 'Room is full!'});
      return;
    }
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.data.playerName = playerName;

    room.addPlayer(socket.id);
    
    io.to(socket.id).emit('room-joined');
    if (room.getPlayerCount() === 2){
      io.to(roomCode).emit('game-start');
    }
  });
  
  socket.on('typing', ({roomCode, typed}) => {
    const room = rooms.get(roomCode);
    if (!room){
      socket.emit('error', {error: 'Room not found'});
      return;
    }
    socket.to(roomCode).emit('opponent-typed', typed.length); 
  });

  socket.on('guess', ({roomCode, guess}) => {
    const room = rooms.get(roomCode);
    if (!room){
      socket.emit('error', {error: 'Room not found'});
      return;
    }
    
    if (!isRealWord(guess)){
      socket.emit('invalid-guess', {error: 'Invalid guess'});
      return;
    }
    const guessResult = room.submitGuess(socket.id, guess);
    io.to(socket.id).emit('guess-result', guessResult);
    socket.to(roomCode).emit('opponent-guess', guessResult.map((tile) => tile.result));
    
    if (room.status === 'finished' || room.getGuessCount(socket.id) === 6){
      if (room.status === 'finished'){
        io.to(roomCode).emit('game-over', {winner: socket.id});
        return;
      } else {
        io.to(roomCode).emit('game-over', {winner: null});
        return;
      }
    }
});

  socket.on('disconnect', () => {
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    const room = rooms.get(roomCode);
    if (!room) return;

    room.removePlayer(socket.id);

    const opponentId = room.getOtherPlayer(socket.id);

    if (opponentId) {
      io.to(opponentId).emit("opponent-disconnected");
    }

    if (room.isEmpty()) {
      rooms.delete(roomCode);
    }
  });

 });
 
};
 
