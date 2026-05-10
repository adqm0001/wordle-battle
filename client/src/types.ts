export interface TileResult {
  letter: string
  result: 'correct' | 'present' | 'absent'
}

export type Screen = 'lobby' | 'waiting' | 'game' | 'gameover';
