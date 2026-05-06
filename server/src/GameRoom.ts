import { GameStatus } from "./types"; 
import { TileResult, checkGuess} from "./gameLogic";
import { isValidGuess } from "./utils";

export class GameRoom {
  private secretWord: string;
  private playerGuesses: Map<string, string[]> = new Map(); 
  public code: string;
  public status: GameStatus = 'waiting';

  constructor(code: string, secretWord: string){
    this.code = code;
    this.secretWord = secretWord;
  }

  public addPlayer(playerId: string){
    this.playerGuesses.set(playerId, this.playerGuesses.get(playerId) ?? []);
    if (this.playerGuesses.size === 2){
      this.status = 'playing';
    }
  }
  public submitGuess(playerId: string, guess: string): TileResult[]{
    if (!isValidGuess(guess)){
      throw new Error('Guess must be 5 letters');
    }
    const guesses = this.playerGuesses.get(playerId) ?? []; 
    guesses.push(guess);
    this.playerGuesses.set(playerId, guesses);
    const tileResult = checkGuess(guess, this.secretWord);
    if (tileResult.every(r => r.result === 'correct')){
      this.status = 'finished';
    }
    return tileResult;
  }

  public getGuessCount(playerId: string): number {
    return (this.playerGuesses.get(playerId) ?? []).length;
  }

  public getWord(): string {
    return this.secretWord;
  }
  
  public getPlayerCount(): number {
    return this.playerGuesses.size;
  }
  
  public getOtherPlayer(excludeId: string): string | undefined{
    for (const playerId of this.playerGuesses.keys()) {
      if (playerId !== excludeId) {
        return playerId;
      }
      return undefined;
    }
  }
  public isEmpty(): boolean {
    return this.playerGuesses.size === 0;
  }

  public hasPlayer(playerId: string): boolean {
    return this.playerGuesses.has(playerId);
  }
  
  public removePlayer(playerId: string): void {
    this.playerGuesses.delete(playerId);
  }
}
