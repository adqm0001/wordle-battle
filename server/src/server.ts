import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import {roomsRouter} from './routes/rooms';
import {isRealWord} from './words';
import { Socket, Server as SocketServer } from 'socket.io';
import { createServer } from 'http';
import { registerSocketHandlers } from './socketHandlers'

const PORT = parseInt(process.env.PORT || '4000', 10);
const ORIGIN = process.env.CLIENT_URL || 'http://localhost:3000';
const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {origin: process.env.CLIENT_URL, methods: ['GET', 'POST']}
});

registerSocketHandlers(io);

app.use(cors({origin: ORIGIN, methods: ['GET', 'POST', 'DELETE'], credentials: true}));
app.use(express.json());
app.use('/rooms', roomsRouter);

app.get('/', (req, res) => {
  res.send('World Battle server is working!')
});

app.get('/health', (req, res) => {
  res.json({status: 'ok', timestamp: new Date().toISOString()})});

app.get('/ping', (req, res) => {
  res.json({message: 'pong', uptime: process.uptime()
})});

app.get('/version', (req, res) => {
  res.json({version: '1.0.0', name: 'Wordle Battle' }
)});

app.get('/crash', (req, res) => {
  throw new Error('test crash');
});

app.post('/validate/:word', (req, res) => {
  const word = req.params.word;
  if (!word){
    res.json({valid: false, reason: 'No word provided!'});
  } else if (word.length != 5){
    res.json({valid: false, reason: 'Not exactly 5 letters'});
  } else if (!isRealWord(word)){
    res.json({valid: false, reason: 'Not in the world list'});
  } else {
    res.json({valid: true});
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

app.use((req, res) => {
  res.status(404).json({error: `Route ${req.method} ${req.path} not found`})
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err.message)
  res.status(500).json({error: 'Internal server error'})
});

export default app;
