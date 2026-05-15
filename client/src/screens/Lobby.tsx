import { useState } from 'react'
import './Lobby.css'

export function Lobby({onRoomCreated, onRoomJoined, onLeaderboard} : {onRoomCreated: (code: string, name: string) => void , onRoomJoined: (code: string, name: string) => void, onLeaderboard: () => void}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [roomError, setRoomError] = useState('');

  async function handleClick() {
    if (!handleName()) return;
    const res = await fetch('http://localhost:3001/rooms', {
      method: 'POST',
    });
    const data = await res.json();
    return onRoomCreated(data.code, name); 
  }
  async function handleInput() {
    if (!name) {
      setRoomError('No username given.');
      setTimeout(() => {
        setRoomError('');
      }, 3000);
      return;
    }
    if (!handleName()) return;
    const res = await fetch(`http://localhost:3001/rooms/${code}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.error){
      setRoomError('Room not found.');
      setTimeout(() => {
        setRoomError('');
      }, 3000);
      return
    }
    return onRoomJoined(data.code, name);
  }
    
  function handleName(): boolean {
    if (!name || name.length > 10){
      setError('Please enter a valid name (max 10 chars).');
      setTimeout(() => {
        setError('');
      }, 3000);
      return false; 
    }
    return true;
  };
  
  function handleButton() {
    return onLeaderboard();
  }
 
  return (
  <div className="lobby">
  <h1>Wordle Battle</h1>
  <div className="name-section">
    <label>Name</label>
    <input value={name} onChange={v => setName(v.target.value)} />
    <p>{error}</p>
    <button onClick={handleClick}>Create a room</button>
  </div>
  <div className="join-room">
    <label>Room Code</label>
    <input value = {code} onChange={v => setCode(v.target.value)} /> 
    <p>{roomError}</p>
    <button onClick={handleInput}>Join a room</button>
  </div>
  <div className="leaderboard-section">
    <button onClick={handleButton}>Display leaderboard</button>
  </div>
  </div>
  )
}
