import * as fs from 'fs';
import * as path from 'path'

const filePath: string = path.join(__dirname, 'wordlist.txt');
const content: string = fs.readFileSync(filePath, 'utf-8');
const lines: string[] = content.split('\n').map(l => l.trim()).filter(Boolean);

const WORDS = new Set<string>();

for (const line of lines){
  WORDS.add(line.toUpperCase());
}

export function isRealWord(word: string): boolean{
  return WORDS.has(word.toUpperCase());
}

export function getRandomWord(): string{
  let wordsArr = Array.from(WORDS);
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
}

