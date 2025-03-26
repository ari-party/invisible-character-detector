const regex = /\p{Extended_Pictographic}/u;

export default function isEmoji(char: string): boolean {
  return regex.test(char);
}
