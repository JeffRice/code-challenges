//
// This is only a SKELETON file for the 'Raindrops' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const convert = (d) => {
  let result = ''
    if (d % 3 === 0) {
      result+= 'Pling'
    }
    if (d % 5 === 0) {
      result+= 'Plang'
    }
    if (d % 7 === 0) {
      result+= 'Plong'
    }
    if (result === ''){
      return result + d
    }
return result
};
