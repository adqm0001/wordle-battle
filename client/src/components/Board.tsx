import { Row } from './Row.tsx'
import { type TileResult } from '../types'
import styles from './Board.module.css'

interface BoardProps {
  guesses: string[]
  results: TileResult[][]
  currentGuess: string
  shaking: boolean
}

export function Board({guesses, results, currentGuess, shaking}: BoardProps){
  return (
    <div className={styles.board}>
      {Array.from({length: 6}, (_, i) => i < guesses.length ? <Row key={i} letters={guesses[i].split('')} states={results[i].map(r => r.result)} shaking={false}/>
        : i === guesses.length ? <Row key={i} letters={currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''))} states={Array(currentGuess.length).fill('tbd').concat(Array(5-currentGuess.length).fill('empty'))} shaking={shaking}/> 
        : <Row key={i} letters={Array(5).fill('')} states={Array(5).fill('empty')} shaking={false}/>)}
    </div>
  )
}
