export function score(word: string): number {
    if(typeof word === 'undefined'){
      return 0
    }
  word = word.toLowerCase()
  let wordValue = 0
  for(let i=0;i<word.length;i++){
    if(word[i] === 'd' || word[i]=== 'g'){ wordValue+= 2 }
    else if(word[i] === 'b' || word[i]=== 'c' || word[i]=== 'm' || word[i]=== 'p'){ wordValue+= 3 }
    else if(word[i] === 'f' || word[i]=== 'h' || word[i]=== 'v' || word[i]=== 'w' || word[i]=== 'y'){
      wordValue+= 4 }
    else if(word[i] === 'k'){ wordValue+= 5 }
    else if(word[i] === 'j' || word[i]=== 'x'){ wordValue+= 8 }
    else if(word[i] === 'q' || word[i]=== 'z'){ wordValue+= 10 }
    else {  wordValue+= 1 }
  } 
  return wordValue
}