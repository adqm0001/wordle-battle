import { Board } from './Board.tsx'
import { type TileResult } from '../types.ts'

interface OpponentBoardProps {
  results: TileResult[][]
  opponentTyping: string
  guessCount: number
}

export function OpponentBoard({results, opponentTyping, guessCount}: OpponentBoardProps){
  return (
  <>
    <div className="opponent-board">
      <Board guesses={Array(guessCount).fill("     ")} results = {results} currentGuess = {'•'.repeat(opponentTyping.length)} />
    </div>
    <p>{`Opponent: ${guessCount} / 6 guesses`}</p>
  </>
  )
};

