export const square = (n: number): bigint => {
  if(n>64){throw new Error('must not be greater than 64')}
  return BigInt(2**(n-1))
}

export const total = (): bigint => {
  let sum = BigInt(0)
  for(let i=1;i<=64;i++){ sum+=BigInt(square(i)) }
  return sum
}