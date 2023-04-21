export function toRna(strand: string): string {
  for(let i=0;i<strand.length;i++){
    if(strand[i] !== 'A' && strand[i] !== 'C' && strand[i] !== 'G' && strand[i] !== 'T') {
      throw new Error('Invalid input DNA.')
    }
  }
  return strand.replaceAll('A', 'U').replaceAll('T', 'A').replaceAll('C', 'x').replaceAll('G', 'C').replaceAll('x', 'G')
}