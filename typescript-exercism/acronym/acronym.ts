export function parse(phrase: string): string {
  let acronym = ''
  let phrases = phrase.replace('-',' ').split(' ')
  for(const p of phrases){
       acronym += p.charAt(0).toUpperCase()
        for(let i=0; i< p.length; i++){
        // in addition to first char, add camelcase chars. uppercase if preceded by lower
              if(i!= 0 && p[i].match(/[a-z]/i) && p[i] === p[i].toUpperCase() && p[i-1]!= p[i-1].toUpperCase() ){
                  acronym += p[i]
              }
        }
  }
  return acronym
}
