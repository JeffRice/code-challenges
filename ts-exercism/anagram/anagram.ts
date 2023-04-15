export class Anagram {
  testAnagram: string;  
  constructor(input: string) {
     this.testAnagram = input
  }

  public matches(...potentials: string[]): string[] {
    let allMatches = []
    for(const p of potentials){
      let wordCopy = this.testAnagram.valueOf().toLowerCase()
      let lowerP = p.toLowerCase()

      if(lowerP === wordCopy || lowerP.length !== wordCopy.length) // skip if same word or not same length
      {continue}
      for(let i=0; i< lowerP.length; i++){
        if( wordCopy.indexOf(lowerP[i])===-1 ){
          break
        }
        else{
          wordCopy = wordCopy.substring(0, wordCopy.indexOf(lowerP[i]) ) + 
                     wordCopy.substring(wordCopy.indexOf(lowerP[i])+1)
        }

        if(i ===lowerP.length-1){
                    console.log('found match')
          allMatches.push(p)
        }
      }
    }
    return allMatches
  }
}
