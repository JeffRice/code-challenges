export function accumulate<T>(list: T[], accumulator: (val: T) => T): T[] {
  let accArr=[]
  for(const l of list){    accArr.push(  accumulator(l)  )   }
  return accArr
}

