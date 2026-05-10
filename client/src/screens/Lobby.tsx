import { useState } from 'react'

export function Lobby({onRoomCreated, onRoomJoined } : {onRoomCreated: (code: string) => void , onRoomJoined: (code: string) => void}) {
  const [code, setCode] = useState('');
  async function handleClick() {
    const res = await fetch('http://localhost:3001/rooms', {
      method: 'POST',
    });
    const data = await res.json();
    return onRoomCreated(data.code); 
  }
  async function handleInput() {
    const res = await fetch(`http://localhost:3001/rooms/${code}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.error) return;
    return onRoomJoined(data.code);
  }
  return (
  <>
  <div>
    <button onClick={handleClick}>Create a room</button>
  </div>
  <div>
    <input value = {code} onChange={v => setCode(v.target.value)} /> 
    <button onClick={handleInput}>Join a room</button>
  </div>
  </>
  )
}
