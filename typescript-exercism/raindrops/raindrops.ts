export function convert(d:number): string {
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
}