import { useState } from 'react'
import Header from './components/Header.tsx'
import StatusBadge from './components/StatusBadge.tsx'
import GuessInput from './components/GuessInput.tsx'
import { Board } from './components/Board.tsx'
import './App.css'

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);

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
      <Board 
      guesses = {['CRANE']}
      results={[[
        { letter: 'C', result: 'absent' },
        { letter: 'R', result: 'present' },
        { letter: 'A', result: 'correct' },
        { letter: 'N', result: 'absent' },
        { letter: 'E', result: 'absent' }
        ]]}
      currentGuess="HEL"/>
    </>
  )
}

export default App
