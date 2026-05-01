import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {generateCode} from './utils'
import {GameRoom} from './GameRoom'

dotenv.config();
const PORT = parseInt(process.env.PORT || '4000', 10);
const ORIGIN = process.env.CLIENT_URL || 'http://localhost:3000';
const app = express()
app.use(cors({origin: ORIGIN, methods: ['GET', 'POST', 'DELETE'], credentials: true}));
app.use(express.json());

const rooms = new Map<string, GameRoom>();
const WORDS = ['CRANE', 'AUDIO', 'LIGHT', 'STARE', 'TRUST']
function getRandomWord(){
  return WORDS[(Math.floor(Math.random() * WORDS.length))]; 
}

app.post('/room', (req, res) => {
  const code: string = generateCode();
  const word: string = getRandomWord();
  const gameRoom = new GameRoom(code, word);
  rooms.set(code, gameRoom);
  res.status(201).json({code: code});
})

app.get('/room/:code', (req, res) => {
  const code = req.params.code;
  const room = rooms.get(code);
  if (!room){
    res.status(404).json({error: 'Room not found'});
  } else {
    res.json({code: code, playerCount: room.getPlayerCount(), status: room.status})
  }
})

app.delete('/room/:code', (req, res) => {
  const code = req.params.code;
  if (!rooms.get(code)){
    res.status(404).json({error: 'Room not found'});
  } else {
    rooms.delete(code);
    res.json({success: true, code: code})
  }
})

app.get('/', (req, res) => {
  res.send('World Battle server is working!')
})

app.get('/health', (req, res) => {
  res.json({status: 'ok', timestamp: new Date().toISOString()})})

app.get('/ping', (req, res) => {
  res.json({message: 'pong', uptime: process.uptime()
})})

app.get('/version', (req, res) => {
  res.json({version: '1.0.0', name: 'Wordle Battle' }
)})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app

