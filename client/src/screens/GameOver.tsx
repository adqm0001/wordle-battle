import './GameOver.css'

export function GameOver({won, word, onPlayAgain } : {won: boolean | null, word: string, onPlayAgain: () => void}){
  return (
    <div className="gameover">
      <h1 className={won === true ? 'win' : won === false ? 'lose' : 'tie'}>
      {won === true ? 'You won the game!' : won === false ? 'You lost the game' : 'The game ended in a tie.'}
      </h1>
      <p className="word-reveal">The word was: <span>{word.toUpperCase()}</span></p>
      <button onClick={onPlayAgain}>Play again</button>
    </div>
  )
}

