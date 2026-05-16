import { type TileResult } from '../types'
import './Keyboard.css'

type LetterResult = 'correct' | 'present' | 'absent'
function buildLetterMap(guesses: string[], results: TileResult[][]): Map<string, LetterResult> {

const map = new Map<string, LetterResult>()
const priority = { correct: 3, present: 2, absent: 1 }

guesses.forEach((guess, gi) => {
  results[gi]?.forEach((tile, ti) => {
    const letter = guess[ti].toUpperCase()
    const current = map.get(letter)
    if (!current || priority[tile.result] > priority[current]) {
      map.set(letter, tile.result)
    }
  })
})
  return map
}

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','BACK']
]

interface KeyboardProps {
  guesses: string[]
  results: TileResult[][]
  onKey: (key: string) => void
}

export function Keyboard({guesses, results, onKey}: KeyboardProps){
  const letterMap = buildLetterMap(guesses, results);

  return (
  <div className='keyboard'>
      {ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
        {row.map((letter, j) => (<button className={`key ${letterMap.get(letter) || 'unused'}`} key={j} onClick={() => onKey(letter)}>{letter}</button>))}
        </div>
      ))}
  </div>
 )
}
