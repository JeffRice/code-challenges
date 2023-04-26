//
// This is only a SKELETON file for the 'Rail Fence Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const encode = (string, rails) => {
   let encodedStrings = code(string, rails)
  return encodedStrings.reduce((acc, c) => acc + c);
};

function code (string, rails, target) {
    let encodedStrings = [];
    for (var i = 0; i < rails; i++){
        encodedStrings.push('')
      }
    let currentRail = 0
    let directionFlag = 'increment';
    for(var i = 0; i < string.length; i++) {
       encodedStrings[currentRail] += string[i]   
       if(directionFlag === 'increment' && currentRail < rails - 1){
         currentRail++ } // increment until max  
         else if (directionFlag === 'increment' && currentRail === rails - 1){
          directionFlag = 'decrement'
          currentRail-- }
         else if (directionFlag === 'decrement' && currentRail === 0) {
          directionFlag = 'increment'
          currentRail++ }
      else {  currentRail-- }  // decrement until min
    } 
        return encodedStrings
}

export const decode = (string, rails) => {
// finding structure
let encodedStrings = code(string, rails);
  console.log('encoded format: ', encodedStrings)  
let decodedStrings = [];
let orderStrings =  []
for (var i = 0; i < rails; i++){
  decodedStrings.push('')
  orderStrings.push('')
}
    let currentRail = 0
    for(var i = 0; i < string.length; i++) {
      orderStrings[currentRail] += (string[i])
      if (orderStrings[currentRail].length === encodedStrings[currentRail].length){
        currentRail++ }
    }
  console.log(orderStrings)
     currentRail = 0
     let directionFlag = 'increment';
  for(var i = 0; i < string.length; i++) {
     decodedStrings[currentRail] += orderStrings[currentRail][0]
    if (orderStrings[currentRail].length > 1)
    // remove item from array so we can keep adding them from this position
   { orderStrings[currentRail] = orderStrings[currentRail].substring(1, orderStrings[currentRail].length)}
     if(directionFlag === 'increment' && currentRail < rails - 1){
       currentRail++  // increment until max  
     }
       else if (directionFlag === 'increment' && currentRail === rails - 1){
        directionFlag = 'decrement'
        currentRail--
       }
       else if (directionFlag === 'decrement' && currentRail === 0) {
        directionFlag = 'increment'
       currentRail++
         }
    else {
       currentRail--  // decrement until min
    } 
  }  
      console.log('decodedStrings', decodedStrings)
  let solution = ''
      currentRail = 0
      directionFlag = 'increment';
  while (solution.length < string.length){
    solution += decodedStrings[currentRail][0]
        if (decodedStrings[currentRail].length > 1)
    // remove item from array so we can keep adding them from this position
   { decodedStrings[currentRail] = decodedStrings[currentRail].substring(1, decodedStrings[currentRail].length)}
     if(directionFlag === 'increment' && currentRail < rails - 1){
       currentRail++ }       // increment until max  
       else if (directionFlag === 'increment' && currentRail === rails - 1){
        directionFlag = 'decrement'
        currentRail--   }
       else if (directionFlag === 'decrement' && currentRail === 0) {
        directionFlag = 'increment'
       currentRail++   }
    else { currentRail--  } // decrement until min 
  }
    return solution;
};