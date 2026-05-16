export async function validateWord(word: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/validate/${word}`, {
    method: 'POST',
  })
  const data = await res.json()
  return data
}
