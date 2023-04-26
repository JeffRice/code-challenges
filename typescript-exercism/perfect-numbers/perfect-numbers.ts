export function classify(testNum: number): string {
  if(testNum<1){throw new Error('Classification is only possible for natural numbers.')}
  let aliquot = 0
  for(let i=0;i<testNum;i++){if(testNum%i===0){aliquot+=i}}
  if(aliquot === testNum){return 'perfect'}
  return aliquot > testNum ? 'abundant' : 'deficient'
}