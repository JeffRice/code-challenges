export function reverse(str: string): string {
  return str.split('').reverse().reduce( (acc, cur) => acc + cur, '' )
  }
