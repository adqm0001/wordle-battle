import { type RefObject } from 'react'
import { type Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'
import './Waiting.css'

export function Waiting({roomCode, socket, playerName, onGameStart}: {roomCode: string, socket: RefObject<Socket | null>, playerName: string, onGameStart: () => void}){
  const [copiedMessage, setCopiedMessage] = useState('');
  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("join-room", {roomCode, playerName})

    socket.current.on ("game-start", () => {
      onGameStart();
    });
    return () => {
      socket.current?.off("game-start")
    }
  }, [])

  function handleClick() {
    navigator.clipboard.writeText(roomCode);
    setCopiedMessage('Copied!');
    setTimeout(() => {
      setCopiedMessage('');
    }, 3000)
  }

  return (
  <div className="waiting">
    <h1>Wordle Battle</h1>
    <p className="waiting-subtitle">Share this code with your opponent</p>
    <div className="room-code-wrapper">
      <div className="room-code" onClick={handleClick}>{roomCode}</div>
      <span className="copied-msg">{copiedMessage}</span>
    </div>
    <p className="waiting-status">Waiting for second player...</p>
  </div>
  )
}
