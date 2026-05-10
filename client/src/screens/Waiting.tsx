export function Waiting({roomCode}: {roomCode: string}){
  return (
  <div>
    <p>Share this code with your opponent</p>
    <h1>CODE: {roomCode}</h1>
    <h2>Waiting for second player...</h2>
  </div>
  )
}
