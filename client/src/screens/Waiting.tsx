import { type RefObject } from 'react'
import { type Socket } from 'socket.io-client'
import { useEffect } from 'react'

export function Waiting({roomCode, socket, playerName, onGameStart}: {roomCode: string, socket: RefObject<Socket | null>, playerName: string, onGameStart: () => void}){
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
  return (
  <div>
    <p>Share this code with your opponent</p>
    <h1>CODE: {roomCode}</h1>
    <h2>Waiting for second player...</h2>
  </div>
  )
}
