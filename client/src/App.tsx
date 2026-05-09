import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.tsx'
import StatusBadge from './components/StatusBadge.tsx'
import GuessInput from './components/GuessInput.tsx'
import { Board } from './components/Board.tsx'
import { Keyboard } from './components/Keyboard.tsx'
import { OpponentBoard } from './components/OpponentBoard.tsx'
import { validateWord } from './utils.ts'
import './App.css'


function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [validWordMessage, setValidWordMessage] = useState('');

  const handleMessage = async(word: string) => {
    const info = await validateWord(word); 
    if (!info.valid){
      setValidWordMessage(info.reason);
      setTimeout(() => {
        setValidWordMessage('');
      }, 2000);
    } else {
      setValidWordMessage('');
    }
  };

  const handleKey = useCallback((key: string) => {
    if (key === 'BACK') setCurrentGuess(prev => prev.slice(0, -1))
    else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) setCurrentGuess(prev => prev.concat(key))
    else if (key === 'ENTER') {
      handleMessage(currentGuess)
    } 
  }, [currentGuess]) 

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('BACK')
      else handleKey(e.key)
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey]) 
           
  return (
    <>
      <Header title="Wordle Battle" />
      <StatusBadge status ="waiting" />
      <GuessInput onSubmit={(word) => {
        setGuesses(prev => [...prev, word]);
      }} />
      {guesses.map((guess, i) => (
        <p key={i}>{guess}</p>
      ))}
      <p>{validWordMessage}</p>
      <Board 
      guesses = {['CRANE']}
      results={[[
        { letter: 'C', result: 'absent' },
        { letter: 'R', result: 'present' },
        { letter: 'A', result: 'correct' },
        { letter: 'N', result: 'absent' },
        { letter: 'E', result: 'absent' }
        ]]}
      currentGuess={currentGuess}/>
      <OpponentBoard 
      results={[[
        { letter: 'C', result: 'absent' },
        { letter: 'R', result: 'present' },
        { letter: 'A', result: 'correct' },
        { letter: 'N', result: 'absent' },
        { letter: 'E', result: 'absent' }
        ]]}
      opponentTyping="HEL" guessCount = {1}/>
    <Keyboard
    guesses = {['CRANE']}
    results={[[
      { letter: 'C', result: 'absent' },
      { letter: 'R', result: 'present' },
      { letter: 'A', result: 'correct' },
      { letter: 'N', result: 'absent' },
      { letter: 'E', result: 'absent' }
    ]]}
    onKey={handleKey}
    />
    </>
  )
}

export default App
