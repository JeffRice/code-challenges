export class SimpleCipher {
  key: string

  constructor(subKey: string='default') {
    if(subKey === 'default'){
      let randomString = 'abcdefghijklmnopqrstuvwxyz';
      let randomKey = ''
      while(randomKey.length<100){ randomKey += randomString[getRandomIntInclusive(0,25)]  }
      this.key = randomKey
    }
      else{
      this.key = subKey
      }
  }
  
  encode(message: string):string {
    let randomString = 'abcdefghijklmnopqrstuvwxyz';
    let splitMsg = message.split('')
    let encodedMsg = ''
    let keyIndex = 0
          for( const s of splitMsg  ){
            let adjustedIndex = randomString.indexOf(s) + randomString.indexOf(this.key[keyIndex])
            if(adjustedIndex>25){adjustedIndex-=26}
            keyIndex++; if(keyIndex>this.key.length-1){keyIndex=0}
            encodedMsg += randomString.charAt( adjustedIndex )
          }
    return encodedMsg
  }

  decode(encrypted: string):string {
       let randomString = 'abcdefghijklmnopqrstuvwxyz';
       let splitEnc = encrypted.split('')
       let decodedMsg = ''
       let keyIndex = 0
        for( const s of splitEnc  ){
            let adjustedIndex =  randomString.indexOf(s) - randomString.indexOf(this.key[keyIndex])        
           //   - randomString.indexOf(this.key[keyIndex])   
             if(adjustedIndex<0){adjustedIndex+=26}
            keyIndex++; if(keyIndex>this.key.length-1){keyIndex=0}
            decodedMsg += randomString.charAt( adjustedIndex )
          }
    return decodedMsg
  }
  
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}