import { type TileState, Tile} from './Tile.tsx'
import styles from './Row.module.css'

interface RowProps {
  letters: string[]
  states: TileState[]
  shaking: boolean
}

export function Row({letters, states, shaking}: RowProps) {
  return (
    <div className={`${styles.row} ${shaking ? styles.shake : ''}`}>
      {letters.map((letter, i) => <Tile key={i} letter={letter} state={states[i]} index={i}/>)} 
    </div>
  )
}
