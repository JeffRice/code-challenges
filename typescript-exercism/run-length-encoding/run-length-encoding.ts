export function encode(data: string): string {  
  let newStr = ''
  let repeatCount = 1
  for(let i=1; i<=data.length-1; i++){
    if(data[i]===data[i-1]){
      repeatCount++
      if(i===data.length-1){newStr += repeatCount; newStr += data[i] }
    }
    else{
      if(repeatCount>1){ newStr += repeatCount }
      newStr += data[i-1]
      repeatCount = 1
      if(i===data.length-1){newStr += data[i]}
    }    
  }
  return newStr
}

export function decode(encodedData: string): string {
  let newStr = ''
  let number = ''
  for(let i=0; i<=encodedData.length-1; i++){
    if(!isNaN(Number(encodedData[i])) && encodedData[i]!== ' '){
      number += encodedData[i]
    }
    else{
      if(number===''){number = '1'}
      newStr += encodedData[i].repeat( Number(number) )
      number = ''
    }
  }
  return newStr
}