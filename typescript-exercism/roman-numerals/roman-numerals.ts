export const toRoman = (input: number): string => {
  let amounts = [1000,500,100,50,10,5,1]
  let amountRemaining = input.valueOf()
  let res = ''
  for(let i=0; i<amounts.length; i++){
    if(amountRemaining/amounts[i]>=1){console.log('@', amounts[i])
      if(amountRemaining.toString().startsWith('4')){        
          res += convert(amounts[i]) + convert(amounts[i-1])  
          amountRemaining-= Number('4'+'0'.repeat(amountRemaining.toString().length-1))
          continue
       }
      if(amountRemaining.toString().startsWith('9')){        
          res += convert(amounts[i+1]) + convert(amounts[i-1])  
          amountRemaining-= Number('9'+'0'.repeat(amountRemaining.toString().length-1))
       }   
    }
     while(amountRemaining - amounts[i]>=0){
       amountRemaining-= amounts[i]
       res += convert(amounts[i])
      }                  
  }
  return res
}

export const convert = (amount: number): string => {
  let res = ''
       if(amount===1)res += 'I'
       if(amount===5)res += 'V'
       if(amount===10)res += 'X'
       if(amount===50)res += 'L'
       if(amount===100)res += 'C'
       if(amount===500)res += 'D'
       if(amount===1000)res += 'M'
  return res
      }