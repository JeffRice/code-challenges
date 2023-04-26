interface Words {
  [index: string]: number;
}

export function count(phrase: string) : Map<string, number> {
  phrase = phrase.toLowerCase().replaceAll(':', '').replaceAll('.', '').replaceAll('!', '').replaceAll('&', '').replaceAll('@', '').replaceAll('$', '').replaceAll('^', '').replaceAll('%', '').replaceAll('\\', '').replaceAll('\"', '')
  
  const myObj: Words = { }
  let splitPhrase = phrase.replaceAll('\n', ' ').replaceAll('\t', ' ').replaceAll(',', ' ').split(' ')
  for(const s of splitPhrase){
    let sCopy = s.toString()
    if(sCopy.startsWith('\'')){sCopy = sCopy.replace('\'', '')}
    if(sCopy.endsWith('\'')){sCopy = sCopy.substring(0,sCopy.length-1)}
    if(sCopy === ' ' || sCopy === ''){      continue    }
    if(myObj?.[sCopy] != undefined){
        if(typeof myObj?.[sCopy] === 'function'){myObj[sCopy] = 1} // for reserved words
        else{myObj[sCopy] += 1} 
    }
    else{ myObj[sCopy] = 1}
  }
    return myObj
}