type LetterResult = 'correct' | 'present' | 'absent'

export interface TileResult {
  letter: string
  result: LetterResult
}

export function checkGuess(guess: string, secret: string): TileResult[] {
  let g = guess.toUpperCase().split('')
  let s = secret.toUpperCase().split('')
  let result: TileResult[] = new Array(5)
  let frequency: Map<string, number> = new Map<string, number>();

  for (let i = 0; i < 5; i++){
    if (g[i] === s[i]){
      result[i] = ({ letter: g[i], result: 'correct'});
      frequency.set(s[i], (frequency.get(s[i]) ?? 0) - 1);
    } else {
      result[i] = ({ letter: g[i], result: 'absent'});
    }
    frequency.set(s[i], (frequency.get(s[i]) ?? 0) + 1);
  }

  for (let i = 0; i < 5; i++){
    if (result[i].result !== 'correct' && s.includes(g[i])){
      if ((frequency.get(g[i]) ?? 0) > 0){
        result[i].result = 'present';
        frequency.set(g[i], (frequency.get(g[i]) ?? 0) - 1);
      } else {
        result[i].result = 'absent';
      }
    }
  }
  return result
}

