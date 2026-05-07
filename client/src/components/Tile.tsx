import styles from './Tile.module.css'
export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

interface TileProps {
  letter: string
  state: TileState
}

export function Tile({ letter, state }: TileProps) {
return (
  <div className={`${styles.tile} ${state !== 'empty' ? styles[state] : ''}`}>
    {letter}
  </div>
  )
}
