export function calculatePrimeFactors(d: number):  number[]{
  let allFactors: number[] = []
    let currentNum = d
    for(let i=2;i<=currentNum;i++){
      if(currentNum % i === 0){
        allFactors.push(i)
        currentNum = currentNum / i 
        i=1
      }
    }
  return allFactors
}