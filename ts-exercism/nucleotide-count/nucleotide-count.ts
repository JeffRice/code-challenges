interface count {
      A: number;
      C: number;
      G: number;
      T: number;
}

export function nucleotideCounts(strand: string): count {
  let a = 0
  let c = 0
  let g = 0
  let t = 0
  
  for(let i=0;i<strand.length;i++){
    if(strand[i]==='A'){ a++ }
    else if(strand[i]==='C'){ c++ } 
    else if(strand[i]==='G'){ g++ } 
    else if(strand[i]==='T'){ t++ }
    else { throw new Error('Invalid nucleotide in strand') }
  }
  
  return {
      A: a,
      C: c,
      G: g,
      T: t
}
}