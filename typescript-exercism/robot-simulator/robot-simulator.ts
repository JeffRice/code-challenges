export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

export class Robot {
  robotCoords: Coordinates = [0,0]
  robotDir: Direction = 'north'
  
  get bearing(): Direction {
    return this.robotDir
  }

  get coordinates(): Coordinates {
    return this.robotCoords
  }

  place({}: { x: number; y: number; direction: Direction }) {
    this.robotCoords = [arguments[0].x, arguments[0].y]
    if(arguments[0].direction === 'north' || arguments[0].direction === 'east' || arguments[0].direction === 'south' || arguments[0].direction === 'west'){
      this.robotDir = arguments[0].direction
    }
    else{ throw new InvalidInputError('hi') }
  }

  evaluate(instructions: string) {
    for(let i=0;i<instructions.length;i++){
      if(instructions[i]==='A'){
        this.robotCoords = this.advance(this.robotDir, this.robotCoords)
      }
      if(instructions[i]==='L'){
        this.robotDir = this.turnLeft(this.robotDir)
      }
      if(instructions[i]==='R'){
        this.robotDir = this.turnRight(this.robotDir)
      }
    }
  }

  turnLeft(dir: Direction): Direction {
    let allDirs: Direction[] = ['north', 'east', 'south', 'west']
    let adjustedIndex = allDirs.indexOf(dir) - 1
    if(adjustedIndex<0){adjustedIndex=3}
    return allDirs[adjustedIndex]
  }
  turnRight(dir: Direction): Direction {
    let allDirs: Direction[] = ['north', 'east', 'south', 'west']
    let adjustedIndex = allDirs.indexOf(dir) + 1
    if(adjustedIndex>3){adjustedIndex=0}
    return allDirs[adjustedIndex]
  }  
  advance(dir:Direction, coords: Coordinates): Coordinates {
    if(dir==='north'){return [coords[0], coords[1]+1]}
    if(dir==='south'){return [coords[0], coords[1]-1]}
    if(dir==='east'){return [coords[0]+1, coords[1]]}
    return [coords[0]-1, coords[1]]
  }
}