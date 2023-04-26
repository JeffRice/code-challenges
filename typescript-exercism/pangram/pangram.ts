export function isPangram(sentence: string): boolean {
  let splitSen = sentence.split('')
  let allLetters = []
  let numOfUnique = 0
  for(const s of splitSen){
    let lowerS = s.toLowerCase()
    if(lowerS.match(/[a-z]/i) && allLetters.includes(lowerS)===false){
      allLetters.push(lowerS)
      numOfUnique++
    }
  }
  return numOfUnique > 25 ? true : false
}