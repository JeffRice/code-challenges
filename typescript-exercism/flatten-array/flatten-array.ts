export function flatten(nestedList: any[]): number[] {
  let flatArr = []
      for(const nestedItem of nestedList){
        if(typeof nestedItem ==='number'){  flatArr.push(nestedItem)  }
        if(Array.isArray(nestedItem)){
           flatArr.push(flatten(nestedItem))
         }
      }
  return flatArr.flat()
}