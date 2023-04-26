export function proverb(...list: string[]): string {
  let res = ''
  for (let i = 0; i < list.length - 1; i++) {
    res += `For want of a ${list[i]} the ${list[i + 1]} was lost.\n`
  }
  res += `And all for the want of a ${list[0]}.`
  return res
}