import { useEffect, useState } from 'react'

type LeaderboardEntry = {
  playerName: string
  _count: { won: number }
}

export function Leaderboard({onLobby} : {onLobby: () => void}){
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    async function fetchLeaderboard() {
      const data = await fetch('http://localhost:3001/leaderboard');
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
    <>
    <div>
      <p>{loading === true ? 'Loading please wait...' : ''}</p> 
    </div>
    <div>
     <h1>Leaderboard</h1>
      {leaderboard.map((entry, index) => (
      <p key={entry.playerName}>{index + 1}. {entry.playerName} - {entry._count.won} wins</p>
    ))} 
    </div>
    <div>
      <button onClick={handleClick}>Go back to lobby</button>
    </div>
    </>
  )
}
