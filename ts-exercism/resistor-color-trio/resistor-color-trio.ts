export function decodedResistorValue(colors: string[]): string {
  let decoded = '' + COLORS.indexOf(colors[0]) + COLORS.indexOf(colors[1])
  if(decoded.charAt(0)==='0'){decoded = decoded.substring(1,decoded.length)} // dont begin with a 0 for black
  let zeros = COLORS.indexOf(colors[2])
  while(zeros){decoded += '0'; zeros--}
  if(Number(decoded) > 1000 && Number(decoded) < 1000000){
    decoded = decoded.substring(0, decoded.length-3)
    return decoded+= ' kiloohms'
  }
  if(Number(decoded) > 1000000 && Number(decoded) < 1000000000){
    decoded = decoded.substring(0, decoded.length-6)
    return decoded+= ' megaohms'
  }
  if(Number(decoded) > 1000000000){
    decoded = decoded.substring(0, decoded.length-9)
    return decoded+= ' gigaohms'
  }
  return decoded + ' ohms'
}
export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']