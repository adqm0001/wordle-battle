import { useState, useEffect, useCallback, useRef } from 'react'
import { type TileResult } from '../types'
import { validateWord } from '../utils'
import { Board } from '../components/Board.tsx'
import { Keyboard } from '../components/Keyboard.tsx'
import { OpponentBoard } from '../components/OpponentBoard.tsx'
import { type RefObject } from 'react'
import { type Socket } from 'socket.io-client'

export function Game({roomCode, socket, onGameOver}: {roomCode: string, socket: RefObject<Socket | null>, onGameOver: (socketWon: boolean) => void}){
  const currentGuessRef = useRef('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentOpponentGuessLength, setCurrentOpponentGuessLength] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<TileResult[][]>([]);
  const [opponentGuesses, setOpponentGuesses] = useState<string[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validWordMessage, setValidWordMessage] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleMessage = useCallback(async(word: string) => {
    const info = await validateWord(word); 
    if (!info.valid){
      setValidWordMessage(info.reason);
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
      }, 400);
      setTimeout(() => {
        setValidWordMessage('');
      }, 2000);
    } else {
      socket.current?.emit('guess', {roomCode, guess: word});
      setValidWordMessage('');
    }
  }, [roomCode]);

  const handleKey = useCallback((key: string) => {
    if (key === 'BACK') {
        setCurrentGuess(prev => {
          currentGuessRef.current = prev.slice(0, -1);
          return currentGuessRef.current;
        })
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(prev => {
          currentGuessRef.current = prev + key;
          return currentGuessRef.current;
        })
      } else if (key === 'ENTER') {
        handleMessage(currentGuessRef.current)
      }
    }, [currentGuess, handleMessage])
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('BACK')
      else {
        handleKey(e.key)
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey]) 

  useEffect(() => {
    socket.current?.emit('typing', { roomCode, typed: currentGuess });
  }, [currentGuess, roomCode, socket]);

  useEffect(() => {
    if (!socket.current) {
      return;
    }

    socket.current.on("guess-result", (guessResult: TileResult[]) => {
      if (!guessResult){
        setErrorMessage("Failed to process guess result.");
        return;
      }
      setGuesses(prev => [...prev, currentGuessRef.current]);
      setResults(prev => [...prev, guessResult]);
      setCurrentGuess('');
    });

    socket.current.on("opponent-guess", (tileResult: string[]) => {
      if (!tileResult){
        setErrorMessage("Lost connection to opponent.");
        return;
      }
      setOpponentGuesses(prev => [...prev, tileResult]);
    });

    socket.current.on("opponent-typed", (guessLength: number) => {
      if (guessLength === null || guessLength === undefined ){
        setErrorMessage("Connection issue.");
        return;
      }
      setCurrentOpponentGuessLength(guessLength);
    });

    socket.current.on("invalid-guess", (error: string) => {
      setErrorMessage(error);
    });

    socket.current.on ("game-over", ({winner} : {winner: string | null}) => {
      const socketWon = winner === socket.current?.id;
      setGameOver(true);
      onGameOver(socketWon);
    });

    socket.current.on("opponent-disconnected", () => {
      setErrorMessage('Opponent disconnected.');
      setGameOver(true);
      onGameOver(true);
    });

    return () => { 
      socket.current?.off('guess-result')
      socket.current?.off('opponent-guess')
      socket.current?.off('opponent-typed')
      socket.current?.off('invalid-guess')
      socket.current?.off('game-over')
      socket.current?.off('opponent-disconnected')
    };
  }, [onGameOver, socket])

  return (
    <div>
      <Board 
      guesses = {guesses}
      results={results}
      currentGuess={currentGuess} shaking={shaking}/>
      <OpponentBoard 
      results={opponentGuesses}
      opponentTypingLength={currentOpponentGuessLength} guessCount = {opponentGuesses.length}/>
    <Keyboard
    guesses = {guesses}
    results={results}
    onKey={handleKey}
    />
    <p>{errorMessage}</p>
    <p>{validWordMessage}</p>
    </div>
  )
}
