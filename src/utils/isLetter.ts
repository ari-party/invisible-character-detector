const regex = /\p{L}/u;

export default function isLetter(char: string): boolean {
  return regex.test(char);
}
