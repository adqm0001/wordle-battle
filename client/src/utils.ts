export async function validateWord(word: string) {
  const res = await fetch(`http://localhost:3001/validate/${word}`, {
    method: 'POST',
  })
  const data = await res.json()
  return data
}
