import { type TileState, Tile} from './Tile.tsx'
import './Row.css'

interface RowProps {
  letters: string[]
  states: TileState[]
  shaking: boolean
}

export function Row({letters, states, shaking}: RowProps) {
  return (
    <div className={`row ${shaking ? 'shake' : ''}`}>
      {letters.map((letter, i) => <Tile key={i} letter={letter} state={states[i]} index={i}/>)} 
    </div>
  )
}
