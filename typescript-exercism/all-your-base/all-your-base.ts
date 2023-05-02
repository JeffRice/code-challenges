export function convert(  digits: number[],  inputBase: number,  outputBase: number): number[] {
  if(inputBase < 2){ throw new Error('Wrong input base') }
  if(outputBase < 2 || outputBase !== Math.round(outputBase)){ throw new Error('Wrong output base') }
  if(!digits.length){throw new Error('Input has wrong format')}
  if(digits[0]===0 && digits.length===1){ return [0] }
  if(digits[0]===0 && digits.length>1){ throw new Error('Input has wrong format') }
  let total = 0
  let i=0
  for(const dig of digits.reverse()){
    if(inputBase === 2 && dig > 1){ throw new Error('Input has wrong format') }
    if(dig<0){ throw new Error('Input has wrong format') }
    total += dig * (inputBase**i)
    i++
  }

  let converted: number[] = []
    let totalToSubtract = total
    i=10 // arbitrary number to start from
    let startingFlag = false // only want to add zero after a divisor has been found
    while(i>=0){
      let currentVal = 1 * (outputBase**i)
      let expTest =  totalToSubtract / currentVal
      if(expTest >= 1){
        converted.push(Math.floor(expTest))
        totalToSubtract -=  currentVal * Math.floor(expTest)
        startingFlag = true
      }
      else{   if(startingFlag){converted.push(0)}    }
      i--
    }
  return converted
}