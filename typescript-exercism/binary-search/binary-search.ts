export function find(array: number[], find: number): number | never {
  let lower = 0;
  let upper = array.length - 1;

  while (lower <= upper) {
    const midpoint = Math.floor((lower + upper) / 2);
    const curr = array[midpoint];

    if (curr === find) {
      return midpoint;
    }
    if (curr > find) {
      upper = midpoint - 1;
    } else {
      lower = midpoint + 1;
    }
  }

  throw new Error('Value not in array');
}