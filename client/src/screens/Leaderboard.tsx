import { useEffect, useState } from 'react'
import './Leaderboard.css'

type LeaderboardEntry = {
  playerName: string
  _count: { won: number }
}

export function Leaderboard({onLobby} : {onLobby: () => void}){
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    async function fetchLeaderboard() {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
      const Leaderboard = await data.json();
      setLeaderboard(Leaderboard)
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  function handleClick(){
    return onLobby();
  }

  return(
    <div className="leaderboard">
    <h1>Leaderboard</h1>
      {loading  ? <p className="loading">Loading...</p> : (
        <div className="leaderboard-list">
          {leaderboard.map((entry,index) => (
            <div key={entry.playerName} className="leaderboard-entry">
              <span className="rank">#{index+1}</span>
              <span className="player-name">{entry.playerName}</span>
              <span className="wins">{entry._count.won} wins</span>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleClick}>Back to Lobby</button>
    </div>
  )
}
