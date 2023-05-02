export class CustomSet {
  numberSet: number[] = []

  constructor(initial?: number[]) {
    if(initial){
      this.numberSet = Array.from(new Set(initial));
    }
  }

  empty(): boolean {  return this.numberSet.length===0  }

  contains(element: number): boolean { return this.numberSet.includes(element) }

  add(element: number): CustomSet {
    let mySet = new Set(this.numberSet);
    mySet.add(element)
    return new CustomSet(Array.from(mySet))
  }

  subset(other: CustomSet): boolean{ return this.numberSet.every(el => other.numberSet.includes(el)) }

  disjoint(other: CustomSet): boolean{ return this.numberSet.every(el => !other.numberSet.includes(el)) }

  eql(other: CustomSet): boolean {
    if(this.numberSet.length !== other.numberSet.length){return false}
    return this.numberSet.every(el => other.numberSet.includes(el))
  }

  union(other: CustomSet): CustomSet { return new CustomSet([...this.numberSet, ...other.numberSet]) }

  intersection(other: CustomSet): CustomSet {
    let tmpArr = []
    for(const item of this.numberSet){
       if(other.numberSet.includes(item)) {tmpArr.push(item)} 
    }
    return new CustomSet(tmpArr)
  }

  difference(other: CustomSet): CustomSet {
    let tmpArr = []
    for(const item of this.numberSet){
       if(!other.numberSet.includes(item)) {tmpArr.push(item)} 
    }
    return new CustomSet(tmpArr)
  }
}