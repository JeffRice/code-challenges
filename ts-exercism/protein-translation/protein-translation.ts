export function translate(d: string): string[] {
  let allSequences = []
  let tmpSeq = ''
  for (let i=0;i<d.length;i++){
    tmpSeq += d[i]
    if ((i+1)%3===0 || i===d.length-1){ // need to include every 3 + trailing items
      allSequences.push(tmpSeq)
      tmpSeq = ''
    }
  }
  let translatedSeqs = []
  for(const seq of allSequences){
     if (seq in mapObj){ translatedSeqs.push(mapObj[seq])  }
     else if (seq === 'UAA' || seq === 'UAG' || seq === 'UGA' ){ return translatedSeqs   }
     else {   throw new Error('Invalid codon')  }
  }
  return translatedSeqs
}
const mapObj: { [key: string]: string } = {
'AUG': 'Methionine', 'UUU': 'Phenylalanine', 'UUC': 'Phenylalanine', 'UUA': 'Leucine', 'UUG': 'Leucine', 'UCU': 'Serine', 'UCC': 'Serine', 'UCA': 'Serine', 'UCG': 'Serine', 'UAU': 'Tyrosine', 'UAC': 'Tyrosine', 'UGU': 'Cysteine', 'UGC': 'Cysteine', 'UGG': 'Tryptophan'
}