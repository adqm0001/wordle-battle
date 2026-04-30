import express from 'express'
const app = express()
const PORT = 3001

app.use(express.json())

app.get('/', (req, res) => {
  res.send('World Battle server is working!')
})

app.get('/health', (req, res) => {
  res.json({status: 'ok', timestamp: new Date().toISOString()})})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/ping', (req, res) => {
  res.json({message: 'pong', uptime: process.uptime()
})})

app.get('/version', (req, res) => {
  res.json({version: '1.0.0', name: 'Wordle Battle' }
)})

export default app

