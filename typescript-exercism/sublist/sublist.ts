export class List {
  listEntries: number[] = []
  constructor(...entries: number[]) {
    for(const e of entries){
      this.listEntries.push(e)
    }
  }

  compare(list2: List): string{
    let superList = true
    if(this.listEntries.length < list2.listEntries.length){superList = false}
    let indexDifferenceSuper
    for(const L of list2.listEntries){
      if(!this.listEntries.includes(L)){
        superList = false; break
      }
      else{
        if(typeof indexDifferenceSuper === 'number' && indexDifferenceSuper !== list2.listEntries.indexOf(L) - this.listEntries.indexOf(L)){
                    superList = false; break
                }
        indexDifferenceSuper = list2.listEntries.indexOf(L) - this.listEntries.indexOf(L)
      }
    }

    let subList = true
    if(this.listEntries.length > list2.listEntries.length){subList = false}
    let list2Copy = list2.listEntries.slice()
    let indexDifference
    let entryCount = 0
    for(let i=0;i< this.listEntries.length; i++){
      let L = this.listEntries[i]
      entryCount++
      if(!list2Copy.includes(L)){
        subList = false;  break
      }
      else{    
        if(typeof indexDifference === 'number' && indexDifference !== this.listEntries.indexOf(L) - list2Copy.indexOf(L)){ //if the sequence exists but in the wrong order
          let indexToStartFrom = list2Copy.indexOf(L) - (entryCount - 1)
          list2Copy.fill(99, 0, indexToStartFrom);
          i = 0 //restart loop to check starting from next index position
          if(list2Copy.length - indexToStartFrom <= this.listEntries.length){
             subList = false; break
          }
        }
        indexDifference = this.listEntries.indexOf(L) - list2Copy.indexOf(L)
      }
    }
    
    if(superList && subList){  return 'equal'   }
    if(superList|| list2.listEntries.length===0){ return 'superlist' }
    if(subList || this.listEntries.length===0){   return 'sublist'   }
    return 'unequal'
  }
}