export function randomInRange(start: number, end: number): number {
  return Math.floor(Math.max(start, Math.random() * (end+1)));
}

export function rollDice({ count = 1, sides = 6, extra = 0 }: {count?: number, sides?: number, extra?: number} = {}): number {
  let result = 0;
  for (let i = 0; i < count; i++) {
    result += randomInRange(1, sides);
  }
  return result + extra;
}