import { Server as SocketServer, Socket } from 'socket.io'
import { rooms } from './routes/rooms'
import {isRealWord} from './words';
import { prisma } from './db'

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

  socket.on('guess', async ({roomCode, guess}) => {
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
    
    const playerStatus = room.getPlayerStatus(socket.id);

    if (playerStatus === 'won' || playerStatus === 'lost'){
      if (!room.areBothDone(socket.id)){
        io.to(socket.id).emit('spectate');
      }
    }

    if (room.status === 'finished'){
      const winner = room.getWinner(socket.id);
      io.to(roomCode).emit('game-over', {winner, word: room.getWord()});
      const opponentId = room.getOtherPlayer(socket.id);
      const opponentSocket = io.sockets.sockets.get(opponentId!);
      await prisma.match.create({
        data: {
          roomCode,
          word: room.getWord(),
          winnerId: winner,
          players: {
            create: [
              {
                socketId: socket.id,
                playerName: socket.data.playerName,
                guessCount: room.getGuessCount(socket.id),
                won: socket.id === winner, 
              },
              {
                socketId: opponentSocket!.id,
                playerName: opponentSocket!.data.playerName,
                guessCount: room.getGuessCount(opponentSocket!.id),
                won: opponentSocket!.id == winner,
              }
            ]
          }
        }
      });
      return;
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
      io.to(opponentId).emit("opponent-disconnected", {word: room.getWord()});
    }

    if (room.isEmpty()) {
      rooms.delete(roomCode);
    }
  });

 });
 
};
 
