interface expected{
  [index: string]: number;
}

export function transform(old: { [key: string]: string[]}): expected {
  let newObj: expected = {}
  for(const o in old){
    for(const oldLetter of old[o]){
      newObj[oldLetter.toLowerCase()] = Number(o)
    }
  }
  return newObj
}