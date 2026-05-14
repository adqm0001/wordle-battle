export function GameOver({won, word, onPlayAgain } : {won: boolean | null, word: string, onPlayAgain: () => void}){
  return (
    <div>
      { won === true ? <h1>You won the game!</h1> : won === false ? <h1>You lost the game.</h1> : <h1>The game ended in a tie.</h1>}
      <h2>Word was: {word}</h2>
      <button onClick={onPlayAgain}>Play again</button>
    </div>
  )
}

