import { type TileState, Tile} from './Tile.tsx'
import styles from './Row.module.css'

interface RowProps {
  letters: string[]
  states: TileState[]
}

export function Row({letters, states}: RowProps) {
  return (
    <div className={styles.row}>
      {letters.map((letter, i) => <Tile key={i} letter={letter} state={states[i]}/>)} 
    </div>
  )
}
