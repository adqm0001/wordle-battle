import { useState } from 'react'

export function Lobby({onRoomCreated, onRoomJoined, onLeaderboard} : {onRoomCreated: (code: string, name: string) => void , onRoomJoined: (code: string, name: string) => void, onLeaderboard: () => void}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  async function handleClick() {
    if (!handleName()) return;
    const res = await fetch('http://localhost:3001/rooms', {
      method: 'POST',
    });
    const data = await res.json();
    return onRoomCreated(data.code, name); 
  }
  async function handleInput() {
    if (!handleName()) return;
    const res = await fetch(`http://localhost:3001/rooms/${code}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.error) return;
    return onRoomJoined(data.code, name);
  }
  function handleName(): boolean {
    if (!name || name.length > 10){
      setError('Please enter a valid name (max 10 chars)');
      return false; 
    }
    return true;
  };
  
  function handleButton() {
    return onLeaderboard();
  }
 
  return (
  <>
  <input value={name} onChange={v => setName(v.target.value)} />
  <p>{error}</p>
  <div>
    <button onClick={handleClick}>Create a room</button>
  </div>
  <div>
    <input value = {code} onChange={v => setCode(v.target.value)} /> 
    <button onClick={handleInput}>Join a room</button>
  </div>
  <div>
    <button onClick={handleButton}>Display leaderboard</button>
  </div>
  </>
  )
}
