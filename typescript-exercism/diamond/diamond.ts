export function makeDiamond(character: string): string {

  let alpha = 'abcdefghijklmnopqrstuvwxyz'
  let charIndex = alpha.indexOf(character.toLowerCase())
  let res = ''
  let diamondLen = charIndex * 2 + 1

  for(let i=0;i<diamondLen;i++){
    let eachLine = ''
    if(i===0 || i ===diamondLen-1){
       for(let j=0;j<diamondLen;j++){
         if(j===Math.floor( (diamondLen-1)/2 ) ){ eachLine+='A'   }
          else{  eachLine+=' '   }
       }
     }
    else{
       for(let j=0;j<diamondLen;j++){
         let adjustedRightIndex = Math.floor( (diamondLen-1)/2 ) + i
         if(adjustedRightIndex > diamondLen-1){ 
           adjustedRightIndex = (diamondLen-1) - Math.abs(Math.floor( (diamondLen-1)/2 ) - i)
         }
         if(j === Math.abs(Math.floor( (diamondLen-1)/2 ) - i)  || j === adjustedRightIndex){
           if(i>Math.floor( (diamondLen-1)/2 )){
             let dif = i - Math.floor( (diamondLen-1)/2 ) 
             eachLine+=alpha.charAt(i-dif*2).toUpperCase()
           }
           else{ eachLine+=alpha.charAt(i).toUpperCase() }
         }
          else{   eachLine+=' '    }
       }
    }
    res += eachLine + '\n'
  }
  return res
}