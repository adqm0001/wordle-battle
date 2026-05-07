import { useState } from 'react'
import Header from './components/Header.tsx'
import StatusBadge from './components/StatusBadge.tsx'
import GuessInput from './components/GuessInput.tsx'
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
    </>
  )
}

export default App
