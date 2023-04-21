type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({}: Options): Triplet[] {
  let all = []
  let sum = arguments[0].sum
  let minFactor = 0
  let maxFactor = sum
  if(arguments[0]?.minFactor){ minFactor = arguments[0]?.minFactor }
  if(arguments[0]?.maxFactor){ maxFactor = arguments[0]?.maxFactor }
  
  for(let a=minFactor;a<maxFactor;a++){
      for(let b=minFactor;b<maxFactor;b++){
          for(let c=minFactor;c<maxFactor;c++){
            if(a+b+c===sum && a**2+b**2===c**2 && a < b && b < c){
              let t = new Triplet(a,b,c)
              all.push(t)
            }
          }
      }
  }
    return all
}

class Triplet {
  arr: [number, number, number]
  
  constructor(a: number,b: number,c: number ) {
    this.arr = [a,b,c]
  }

  toArray(): [number, number, number] {
    return this.arr
  }
  
}