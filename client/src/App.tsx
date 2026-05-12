import { useState } from 'react'
import { useSocket } from './hooks/useSocket.ts'
import type { Screen } from './types.ts'
import { Lobby } from './screens/Lobby.tsx'
import { Waiting } from './screens/Waiting.tsx'
import { Game } from './screens/Game.tsx'
import { GameOver } from './screens/GameOver.tsx'
import './App.css'


function App() {
  const [screen, setScreen] = useState<Screen>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const socket = useSocket();

  function onRoomCreated(roomCode: string, name: string) {
    setScreen('waiting');
    setPlayerName(name);
    setRoomCode(roomCode);
  }

  function onRoomJoined(roomCode: string, name: string) {
    setScreen('waiting');
    setPlayerName(name);
    setRoomCode(roomCode);
  }

  function onGameStart(){
    setScreen('game');
  }

  function onGameOver() {
    setScreen('gameover');
  }

  function onPlayAgain() {
    setScreen('lobby');
    setRoomCode('');
  }

  if (screen === 'lobby') return <Lobby onRoomCreated={onRoomCreated} onRoomJoined={onRoomJoined} />
  if (screen === 'waiting') return <Waiting roomCode={roomCode} socket={socket} playerName={playerName} onGameStart={onGameStart}/>
  if (screen === 'game') return <Game roomCode={roomCode} socket={socket} onGameOver={onGameOver} />
  if (screen === 'gameover') return <GameOver won={true} word={'CRANE'} onPlayAgain={onPlayAgain}/>
  return (
    <>
    </>
  )
}

export default App
