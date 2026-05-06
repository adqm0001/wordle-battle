import { Server as SocketServer, Socket } from 'socket.io'
import { rooms } from './routes/rooms'

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
 
