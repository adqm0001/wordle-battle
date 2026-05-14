import { GameStatus } from "./types"; 
import { TileResult, checkGuess} from "./gameLogic";
import { isValidGuess } from "./utils";

export class GameRoom {
  private secretWord: string;
  private playerGuesses: Map<string, string[]> = new Map(); 
  private playerStatus: Map<string, 'playing' | 'won' | 'lost'> = new Map();
  public code: string;
  public status: GameStatus = 'waiting';

  constructor(code: string, secretWord: string){
    this.code = code;
    this.secretWord = secretWord;
  }

  public addPlayer(playerId: string){
    this.playerGuesses.set(playerId, this.playerGuesses.get(playerId) ?? []);
    this.playerStatus.set(playerId, 'playing');
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
      this.playerStatus.set(playerId, 'won'); 
    }  
    if (this.getGuessCount(playerId) === 6 && this.playerStatus.get(playerId) !== 'won'){
        this.playerStatus.set(playerId, 'lost');
    }

    if (this.areBothDone(playerId)){
      this.status = 'finished';
    }
    
    return tileResult;
  }

  public getWinner(playerId: string): string | undefined {
    if (this.status !== 'finished') return;
    const opponentId = this.getOtherPlayer(playerId);
    if (!opponentId) return undefined;
    const playerStatus = this.playerStatus.get(playerId);
    const opponentStatus = this.playerStatus.get(opponentId);
    const playerGuessCount = this.getGuessCount(playerId);
    const opponentGuessCount = this.getGuessCount(opponentId);

    if (playerStatus === 'won' && opponentStatus === 'won'){
      if (playerGuessCount < opponentGuessCount){
        return playerId;
      } else if (playerGuessCount > opponentGuessCount){
        return opponentId; 
      } else {
        this.status = 'tie';
      }
    } else if (playerStatus === 'won' && opponentStatus === 'lost'){
      return playerId;
    } else if (playerStatus === 'lost' && opponentStatus === 'lost'){
      this.status = 'tie';
      return undefined;
    } else {
      return opponentId;
    }
  }

  public getPlayerStatus(playerId: string): string {
    return (this.playerStatus.get(playerId) ?? 'undefined');
  }

  public areBothDone(playerId: string): boolean {
    const opponentId = this.getOtherPlayer(playerId);
    if (!opponentId) return false;
    const playerStatus = this.playerStatus.get(playerId);
    const opponentStatus = this.playerStatus.get(opponentId);
    
    if ((playerStatus === 'won' || playerStatus === 'lost') && (opponentStatus === 'won' || opponentStatus === 'lost')){
      return true;
    } 
    return false;
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
    }
    return undefined;
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
