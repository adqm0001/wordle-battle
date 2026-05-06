import {generateCode} from '../utils'
import {GameRoom} from '../GameRoom'
import {getRandomWord} from '../words'
import { Router } from 'express'
const router = Router()

export const rooms = new Map<string, GameRoom>();

router.post('/', (req, res) => {
  const code: string = generateCode();
  const word: string = getRandomWord();
  const gameRoom = new GameRoom(code, word);
  rooms.set(code, gameRoom);
  res.status(201).json({code: code});
})

router.get('/:code', (req, res) => {
  const code = req.params.code;
  const room = rooms.get(code);
  if (!room){
    res.status(404).json({error: 'Room not found'});
  } else {
    res.json({code: code, playerCount: room.getPlayerCount(), status: room.status})
  }
})

router.delete('/:code', (req, res) => {
  const code = req.params.code;
  if (!rooms.get(code)){
    res.status(404).json({error: 'Room not found'});
    return;
  }
    rooms.delete(code);
    res.json({success: true, code: code})
})


export { router as roomsRouter }
