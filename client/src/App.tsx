//import { useState } from 'react'
import Header from './components/Header.tsx'
import StatusBadge from './components/StatusBadge.tsx'
import './App.css'

function App() {

  return (
    <>
      <Header title="Wordle Battle" />
      <StatusBadge status ="waiting" />
    </>
  )
}

export default App
