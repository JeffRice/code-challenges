export class Triangle {
  a: number;
  b: number;
  c: number;

  constructor(...sides: number[]) {
    this.a = sides[0]
    this.b = sides[1] 
    this.c = sides[2]    
  }

  get isEquilateral() {
    if(!triangleCheck([this.a, this.b, this.c])){return false}
    if(this.a === this.b && this.b === this.c && this.a === this.c){ return true }
    return false;
  }

  get isIsosceles() {
    if(!triangleCheck([this.a, this.b, this.c])){return false}
    let equalSides = 0
    let equalCheckArr = []
    equalCheckArr.push(this.a)
    if(equalCheckArr.includes(this.b) || equalCheckArr.includes(this.c)){equalSides++}
    equalCheckArr = []
    equalCheckArr.push(this.b)
    if(equalCheckArr.includes(this.c) || equalCheckArr.includes(this.a)){equalSides++}
    equalCheckArr = []
    equalCheckArr.push(this.c)
    if(equalCheckArr.includes(this.a) || equalCheckArr.includes(this.b)){equalSides++}
    if(equalSides >= 2){return true}
    return false;
  }

  get isScalene() {
  if(!triangleCheck([this.a, this.b, this.c])){return false}
  if(this.a != this.b && this.a != this.c && this.b != this.c){return true}
  return false;
  }
}

function triangleCheck(sides: number[]){
  return sides[0] + sides[1] >= sides[2] && sides[1] + sides[2] >= sides[0] && sides[0] + sides[0] >= sides[1] &&    sides[0] > 0 && sides[1] > 0 && sides[2] > 0
  }