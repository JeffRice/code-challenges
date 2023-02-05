//
// This is only a SKELETON file for the 'Matching Brackets' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isPaired = (d) => {
  let brackets = 0, braces = 0, parentheses = 0
  let strLen = d.length
  let lastOpened = []
  
  for(var i = 0; i < strLen; i++){
    if(d[i] === '{'){
      braces += 1
      lastOpened.push('braces')
    }
    if(d[i] === '}'){
      // check if there is an opening char first
      if (braces === 0 || lastOpened[lastOpened.length - 1] !== 'braces'){return false}
      braces -= 1
      lastOpened.pop()
    }
    if(d[i] === '['){
      brackets += 1
      lastOpened.push('brackets')
    }
    if(d[i] === ']'){
      // check if there is an opening char first
      if (brackets === 0 || lastOpened[lastOpened.length - 1] !== 'brackets'){return false}
      brackets -= 1
      lastOpened.pop()
    }
    if(d[i] === '('){
      parentheses += 1
      lastOpened.push('parentheses')
    }
    if(d[i] === ')'){
      // check if there is an opening char first
      if (parentheses === 0 || lastOpened[lastOpened.length - 1] !== 'parentheses'){return false}
      parentheses -= 1
      lastOpened.pop()
    }    
  }
  
  if(braces === 0  && brackets === 0 && parentheses === 0)  {
    return true
   }
    return false
};
