export class Robot {
 robotName: string = ''
  
  constructor() {
    let unq = false
    while(unq === false){
    let alphaString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let robotName = ''
    while(robotName.length<2){ robotName += alphaString[getRandomIntInclusive(0,25)]  }
    while(robotName.length<5){ robotName += getRandomIntInclusive(0,9)  }
    this.robotName = robotName
      if (usedNames.has(robotName) === false){
        unq = true
        usedNames.add(robotName)
      }
    }  
  }

  public get name(): string {
    return this.robotName
  }

  public resetName(): void {
    let unq = false
    while(unq === false){
    let alphaString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let robotName = ''
    while(robotName.length<2){ robotName += alphaString[getRandomIntInclusive(0,25)]  }
    while(robotName.length<5){ robotName += getRandomIntInclusive(0,9)  }
    this.robotName = robotName
      if (usedNames.has(robotName) === false){
        unq = true
        usedNames.add(robotName)
      }
    }
  }

  public static releaseNames(): void {
  }
}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const usedNames = new Set()