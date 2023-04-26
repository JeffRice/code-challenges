export function valid(digitString: string): boolean {
  if(digitString.trim().length<2){ return false }
  let tmpArr = []
  let doubleFlag = false
  digitString = digitString.split('').reverse().reduce(   (acc, cur) => acc + cur, ''  )
  for(let i=0;i<digitString.length;i++){
     if(!digitString[i].match(/^\d+$/) && digitString[i] !== ' '){ return false }
     if(digitString[i] === ' '){ continue }
     if(doubleFlag){
       const doubleDigit = Number(digitString[i])*2 > 9 ? Number(digitString[i])*2 - 9 : Number(digitString[i])*2
       tmpArr.push(doubleDigit)
     }
      else{ tmpArr.push(Number(digitString[i])) }
      if(doubleFlag){  doubleFlag = false }
      else          {  doubleFlag = true  }
  }
  let sum = tmpArr.reduce(   (acc, cur) => acc + cur, 0  )
  if(sum % 10 === 0){ return true }
  return false
}