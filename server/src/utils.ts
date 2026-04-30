export function generateCode(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function isValidGuess(word: string): boolean {
  return word.length === 5;
}
