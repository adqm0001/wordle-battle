import {GameRoom} from './types'

export function generateCode(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function isValidGuess(word: string): boolean {
  return word.length === 5;
}

export function createRoom(code: string, word: string): GameRoom {
 return {
   code,
   players: [],
   secretWord: word,
   status: 'waiting'
  }
}
