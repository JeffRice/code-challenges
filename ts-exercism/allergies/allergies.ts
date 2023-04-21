export class Allergies {
  score: number;
  
  constructor(allergenIndex: number) {
    this.score = allergenIndex
  }

  public list(): string[] {
    let all = []
    let scoreCopy = this.score.valueOf()
    while(scoreCopy){
                  if(scoreCopy === 1){                 scoreCopy -= 1; all.push('eggs') }
             else if(scoreCopy >= 2 && scoreCopy < 4){ scoreCopy -= 2; all.push('peanuts') }
             else if(scoreCopy >= 4 && scoreCopy < 8){ scoreCopy -= 4; all.push('shellfish') }
          else if(scoreCopy >= 8 && scoreCopy < 16){   scoreCopy -= 8; all.push('strawberries') }
              else if(scoreCopy >= 16 && scoreCopy < 32){ scoreCopy -= 16; all.push('tomatoes') }
          else if(scoreCopy >= 32 && scoreCopy < 64){     scoreCopy -= 32; all.push('chocolate')}
          else if(scoreCopy >= 64 && scoreCopy < 128){    scoreCopy -= 64;  all.push('pollen')   }
      else if(scoreCopy >= 128 && scoreCopy < 256){      scoreCopy -= 128; all.push('cats')    }
      else{ scoreCopy -= 256  }
    }
    return all.reverse()
  }

  public allergicTo(allergen: string): boolean {
   return this.list().includes(allergen)
  }
}