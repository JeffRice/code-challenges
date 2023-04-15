export function isIsogram(word: string): boolean {
  let letters = []
  for(let i=0; i<word.length; i++){
    if(letters.includes(word[i])===true && word[i].match(/[a-z]/i)){
      return false
    }
    letters.push(word[i].toLowerCase())
  }
  return true
}