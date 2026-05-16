import './Tile.css'
import { useState, useEffect } from 'react'
export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

interface TileProps {
  letter: string
  state: TileState
  index: number
}

export function Tile({ letter, state, index}: TileProps) {
  const [flipping, setFlipping] = useState(false);
  const [displayState, setDisplayState] = useState(state);

  useEffect(() => {
  const triggerFlip = () => { 
  setTimeout(() => {
    setFlipping(true)
    setTimeout(() => setDisplayState(state), 250)
    setTimeout(() => setFlipping(false) , 400)
    }, index * 150)
  }
    if (state !== 'tbd' && state !== 'empty') triggerFlip() 
  }, [state, index])
  
  return (
    <div className={`tile ${displayState} ${flipping ? 'flip' : ''}`}>
      {letter}
    </div>
    )
}
