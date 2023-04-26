//
// This is only a SKELETON file for the 'Largest Series Product' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const largestProduct = (digitSeries, span) => {
  let strSeries = String(digitSeries).split('')
  let numberTest = strSeries.filter(x => parseInt(x + 1))
    if (strSeries.length !== numberTest.length)
      throw new Error('Digits input must only contain digits')
    if (span > digitSeries.length)
      throw new Error('Span must be smaller than string length')
    if (span < 0)
      throw new Error('Span must be greater than zero')
    if (digitSeries === '' && span === 0)
      return 1

  let maxProduct = 0;
  for(var z = 0; z < digitSeries.length; z++){
        let currentTest = strSeries.filter((word, i) => i >= z && i <= z + span - 1);
        let currentTestNums = currentTest.map(x => parseInt(x));
              // check if there are enough digits left
            if(currentTestNums.length === span){
            maxProduct = Math.max(currentTestNums.reduce( (acc, cv) => acc * cv, 1), maxProduct)}
            }
    return maxProduct
};