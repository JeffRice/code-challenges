export class Squares {
  squaresArr: number[] = []
  constructor(count: number) {
    for(let i = 0; i <= count; i++){
          this.squaresArr.push(i)
    }
  }

  get sumOfSquares(): number {
    return this.squaresArr.map(x => x ** 2).reduce( (acc, cur) => acc + cur, 0  )
  }

  get squareOfSum(): number {
    return this.squaresArr.reduce( (acc, cur) => acc + cur, 0  ) ** 2
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares
  }
}