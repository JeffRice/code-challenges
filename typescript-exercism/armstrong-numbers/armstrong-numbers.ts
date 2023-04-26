export function isArmstrongNumber(d: number|bigint): boolean {
  if(typeof d==='bigint'){ // can't use Math.pow with bigints
   return BigInt( d.toString(10).split('').map( (v) => BigInt(v) ** BigInt(d.toString().length)).reduce((acc, c) => acc + c,  BigInt(0)) ).toString(10) === d.toString()
  }
return d.toString().split('').map((v) => Math.pow(Number(v), d.toString().length)).reduce((acc, c) => acc + c,  0) === d
}