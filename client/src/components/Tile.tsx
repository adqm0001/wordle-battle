import styles from './Tile.module.css'
import { useState, useEffect } from 'react'
export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

interface TileProps {
  letter: string
  state: TileState
  index: number
}

export function Tile({ letter, state, index}: TileProps) {
  const [flipping, setFlipping] = useState(false);

  function triggerFlip() {
    setFlipping(true)
    setTimeout(() => setFlipping(false), 400)
  }

  useEffect(() => {
      if (state !== 'tbd' && state !== 'empty') triggerFlip() 
  }, [state])
  
  return (
    <div className={`${styles.tile} ${state !== 'empty' ? styles[state] : ''} ${flipping ? styles.flip : ''}`} style={flipping ? { animationDelay: `${index * 100}ms` } : {}}>
      {letter}
    </div>
    )
}
