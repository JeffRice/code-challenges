export const answer = (problem: string) => {
  let splitProblem = problem.split(' ').filter(x => x!=='by')
  splitProblem[splitProblem.length-1] = splitProblem[splitProblem.length-1].substring(0, splitProblem[splitProblem.length-1].length-1) //remove question mark

  if(splitProblem.length===2){throw new Error('Syntax error')}
  if(splitProblem.length===3){return Number(splitProblem[2])}
  if(splitProblem.length===4) {
    if(splitProblem[splitProblem.length-1] === 'plus' || splitProblem[splitProblem.length-1] === 'minus' || splitProblem[splitProblem.length-1] === 'multiplied' || splitProblem[splitProblem.length-1] === 'divided'){
            throw new Error('Syntax error') 
    }
            throw new Error('Unknown operation') 
  } 
  if(splitProblem.length===8){ throw new Error('Unknown operation')  }
        
        for(let i=2; i<splitProblem.length; i++){
        if(i%2===0 && isNaN(Number(splitProblem[i]))===true ){
         throw new Error('Syntax error')
    } } 

  if(splitProblem.length===5){
     splitProblem[4] = splitProblem[4]
     return mathOperate(Number(splitProblem[2]), splitProblem[3], Number(splitProblem[4]))
  }
  if(splitProblem.length===6){throw new Error('Syntax error')}

  if(splitProblem.length===7){
     splitProblem[6] = splitProblem[6]
     let firstAmount = mathOperate(Number(splitProblem[2]), splitProblem[3], Number(splitProblem[4]))
     return mathOperate(firstAmount, splitProblem[5], Number(splitProblem[6]))
  }

  throw new Error('Syntax error')
}

export function mathOperate(firstNum: number, operand: string, secondNum: number): number{
  if(operand === 'plus'){  return firstNum + secondNum}
  if(operand === 'minus'){ return firstNum - secondNum}
  if(operand === 'multiplied'){ return firstNum * secondNum}
  if(operand === 'divided'){ return firstNum / secondNum}
  return 0
}