import { Board } from './Board.tsx'
import { type TileResult } from '../types.ts'

interface OpponentBoardProps {
  results: string[][]
  opponentTypingLength: number 
  guessCount: number
}

export function OpponentBoard({results, opponentTypingLength, guessCount}: OpponentBoardProps){
  function toTileResults(rows: string[][]): TileResult[][] {
    const result: TileResult[][] = []
    for (const row of rows) {
      const tileRow: TileResult[] = []
      for (const r of row) {
        tileRow.push({ letter: '', result: r as TileResult['result'] })
      }
      result.push(tileRow)
    }
    return result
  }
  return (
  <>
    <Board guesses={Array(guessCount).fill("     ")} results={toTileResults(results)} currentGuess={'•'.repeat(opponentTypingLength)} shaking={false} />
    <p className="opponent-guess-count">{`Opponent: ${guessCount} / 6 guesses`}</p>
  </>
  )
};

