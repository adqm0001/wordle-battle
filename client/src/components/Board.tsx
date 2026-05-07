import { Row } from './Row.tsx'
import { type TileResult } from '../types'
import styles from './Board.module.css'

interface BoardProps {
  guesses: string[]
  results: TileResult[][]
  currentGuess: string
}

export function Board({guesses, results, currentGuess}: BoardProps){
  return (
    <div className={styles.board}>
      {Array.from({length: 6}, (_, i) => i < guesses.length ? <Row key={i} letters={guesses[i].split('')} states={results[i].map(r => r.result)}/>
        : i === guesses.length ? <Row key={i} letters={currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''))} states={Array(currentGuess.length).fill('tbd')}/> 
        : <Row key={i} letters={Array(5).fill('')} states={Array(5).fill('empty')}/>)}
    </div>
  )
}
