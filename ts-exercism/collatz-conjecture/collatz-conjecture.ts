export function steps(count: number): number {
  let numSteps = 0
  if(count<1){throw new Error('Only positive numbers are allowed')}
  while(count!=1){
      if(count % 2 === 0){  count = count / 2}
    else{count = count * 3 + 1}
  numSteps++
  }
return numSteps
}