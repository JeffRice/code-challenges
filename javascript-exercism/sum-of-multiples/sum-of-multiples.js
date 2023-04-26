//
// This is only a SKELETON file for the 'Sum Of Multiples' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const sum = (d, x) => {
let multiples = [];
  if (d.length === 5){
          while (x) {
        x--
          if (x % d[0] === 0 || x % d[1] === 0 || x % d[2] === 0 || x % d[3] === 0 || x % d[4] === 0){
            multiples.push(x)
          }
      }
  }
  if (d.length === 3){
          while (x) {
        x--
          if (x % d[0] === 0 || x % d[1] === 0 || x % d[2] === 0){
            multiples.push(x)
          }
      }
    
  }
  if (d.length < 3){
      while (x) {
        x--
          if (x % d[0] === 0 || x % d[1] === 0){
            multiples.push(x)
          }
      }
  }
    if(multiples.length){
  return multiples.reduce(
  (acc, cur) => acc + cur);
    }
  
  return 0
  
};
