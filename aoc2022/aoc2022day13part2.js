const fs = require('fs');
let txtFile = "aocday13.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length

let pairs = []
let firstPacket
let secondPacket
let reset = true
let allArrays = []

for(var i = 0; i < len; i++){
    console.log(splitter[i])

    if (splitter[i] === ''){
        console.log('new pair')
        // compare and reset
        compare(firstPacket, secondPacket)
       }


    if(reset){
        firstPacket = splitter[i]
        reset = false
    }
    else{
        secondPacket = splitter[i]
    }

    if (splitter[i] === ''){
        reset = true
       }

}

function compare(firstPacket, secondPacket){

    let firstPacketArray = makePacketArray(firstPacket)
    let secondPacketArray = makePacketArray(secondPacket)




        console.log('compare', firstPacket, secondPacket)

        const testSplit = firstPacket.split('[');
        console.log('testSplit', testSplit)
        console.log('firstPacketArray', firstPacketArray)
        console.log('secondPacketArray', secondPacketArray)

        //removing empty items
        firstPacketArray = firstPacketArray.filter(n => n) 
        secondPacketArray = secondPacketArray.filter(n => n) 

            console.log('firstPacketArray , len', firstPacketArray, firstPacketArray.length)
            console.log('secondPacketArray, len', secondPacketArray, secondPacketArray.length)


            pairs.push(comparisonLoop(firstPacketArray, secondPacketArray))

            allArrays.push(firstPacketArray)
            allArrays.push(secondPacketArray)


}


function makePacketArray(packet) {
    let packetArray = []
    let packetArrayDepth = 0
    let currentTarget = packetArray
    let addedValues = 0
    let targetStack = []

    console.log('packet dig',  packet)
    console.log('starting targetStack',  targetStack)
    console.log('starting packetArray',  packetArray)

    for(var i = 1; i < packet.length - 1; i++){
        console.log(packet[i])
        console.log('packetArray',  packetArray)
        if (packet[i] === '['){
            //open array
            // check for nested arrays
            if(packetArrayDepth){
           //     packetArray[i] = []
                currentTarget.push([])
                packetArrayDepth++
                targetStack.push(currentTarget)
                console.log('addedValues', addedValues)
                console.log('currentTarget', currentTarget)
                console.log('currentTarget[addedvalu]', currentTarget[currentTarget.length - 1])
                currentTarget = currentTarget[currentTarget.length - 1]
                console.log('currentTarget[addedvalu]', currentTarget)
                addedValues = 0
            }
             else {
                 packetArray[i] = []
                 currentTarget = packetArray[i.valueOf()]
                 packetArrayDepth++
                 addedValues = 0
                 targetStack.push(currentTarget)
             }
        }

        else if (packet[i] === ']'){
            //close array
            console.log('packetArray',packetArray )
            console.log('packetArrayDepth',packetArrayDepth )
            console.log('currentTarget closing',currentTarget )
            console.log('targetStack', targetStack)

            if(packetArrayDepth > 1){
            let lastInStack = targetStack[targetStack.length - 1]
            currentTarget = lastInStack
            console.log('currentTarget after target stack', currentTarget)
            targetStack.pop() // target one level up
            }
            else{
                currentTarget = packetArray
            }         
            packetArrayDepth--

        }
        else if (packet[i] === ','){
            //handle comma
        }
        else {
            //handle number
            let handledNum
            //check how many digits // look ahead to find either a closing bracket or a comma
            if(packet[i+1] && packet[i+1] === ',' || packet[i+1] && packet[i+1] === ']'){
            //console.log('1 digit')
            handledNum = packet[i]
            }
            else{
                handledNum = String(packet[i]) + String(packet[i + 1])
                i++
                console.log('2 digit')
            }

            addedValues++
            console.log(typeof currentTarget)
            console.log(packetArray)
                 if(currentTarget){
                 //   console.log(packetArray)
                  currentTarget.push(Number(handledNum))
               }
               else {
                currentTarget = packetArray[1]
                currentTarget.push(Number(handledNum))
               }

        }

    }// end loop
    return packetArray
}

function comparisonLoop(firstPacketArray, secondPacketArray) {

    // if left side is out of values before right side
    if(!firstPacketArray[0] && secondPacketArray[0]){
        console.log('true')
        return true
    }

    // if firstPacket Array does not have length
    if(!firstPacketArray.length){
        // left side is out of values before right side
        if(secondPacketArray.length){
            console.log('true')
            return true
        }


    }

    // main comparison loop
    for(var x = 0; x < firstPacketArray.length; x++){
        console.log(' comparing: ', firstPacketArray[x], secondPacketArray[x] )


        if(!secondPacketArray[x]){
            console.log(' false')
            return false
        }

        

        // compare if both are numbers
        if (typeof firstPacketArray[x] === 'number' && typeof secondPacketArray[x] === 'number'){
            console.log('can compare')
            if(firstPacketArray[x] > secondPacketArray[x]){
                console.log(' false')
                return false
            }
            if(firstPacketArray[x] < secondPacketArray[x]){
                console.log(' true')
                return true
            }

        }

        // left array right number
        if(typeof firstPacketArray[x] != 'number' && typeof secondPacketArray[x] === 'number'){
            // Mixed types; convert right to [x] 
            secondPacketArray[x] = [ secondPacketArray[x] ]
        }

        //left number right array
        if(typeof firstPacketArray[x] === 'number' && typeof secondPacketArray[x] != 'number'){
            // Mixed types; convert left to [x] 
            firstPacketArray[x] = [ firstPacketArray[x] ]
        }

        //both are not numbers
        if(typeof firstPacketArray[x] != 'number' && typeof secondPacketArray[x] != 'number'){

            // they are both lists access nested value
            console.log('both are not numbers', firstPacketArray[x][0], secondPacketArray[x][0])


            // ran out of right side first, false
            if(typeof firstPacketArray[x][0] != 'undefined' && typeof secondPacketArray[x][0] === 'undefined'){
                console.log(' falsetto')
                return false
            }

            // ran out of left side first, true
            if(typeof firstPacketArray[x][0] === 'undefined' && typeof secondPacketArray[x][0] != 'undefined'){
                console.log(' truetto')
                return true
            }

            // call recursively for nested arrays
           for(var j =0; j < firstPacketArray[x].length; j++ ){
            console.log('first Packet Array Items, second Packet Array Items  ',  firstPacketArray[x], secondPacketArray[x])
           
            if(typeof firstPacketArray[x][j] != 'number' && typeof secondPacketArray[x][j] != 'number'){

                    //ran out of right side items first, false
                    if(firstPacketArray[x][j].length && !secondPacketArray[x][j]?.length){
                        console.log('false')
                        return false
                    }

                    //ran out of left side items first, true
                    if(!firstPacketArray[x][j].length && secondPacketArray[x][j]?.length){
                        console.log('truing')
                        return true
                    }



                    //if they are not both empty then recurse, otherwise continue
                    if(firstPacketArray[x][j].length && secondPacketArray[x][j].length){
                        console.log(' recursing 1')
                  let res = comparisonLoop(firstPacketArray[x][j], secondPacketArray[x][j])
                  console.log('res 1', res)
                  if(res === true || res === false){
                    return res
                  }
                    }

            }

            // if both numbers compare 
            if(typeof firstPacketArray[x][j] === 'number' && typeof secondPacketArray[x][j] === 'number'){

                console.log('at least compare here first')
                   //compare inner values
                   if(firstPacketArray[x][j] > secondPacketArray[x][j]){
                    console.log(' false')
                    return false
                     }
                    if(firstPacketArray[x][j] < secondPacketArray[x][j]){
                    console.log(' true')
                    return true
                    }

            }

            // if number on left and undefined on right
            if(typeof firstPacketArray[x][j] === 'number' && typeof secondPacketArray[x][j] === 'undefined'  ){
                console.log(' false 2, ran out of right side items first')
                return false
            }

           // if number on right and undefined on left
           if(typeof firstPacketArray[x][j] === 'undefined' && typeof secondPacketArray[x][j] === 'number'  ){
            console.log('true 2, ran out of left side items first')
            return true
        }

            // if number on left and array on right
            if(typeof firstPacketArray[x][j] === 'number' && typeof secondPacketArray[x][j] === 'object'  ){
                console.log(' recursing 2')
                 let res = comparisonLoop( [firstPacketArray[x][j]] , secondPacketArray[x][j])
                 console.log('res 2', res)
                 if(res === true || res === false){
                   return res
                 }
            }

            // if number on right and array on left
            if(typeof firstPacketArray[x][j] === 'object' && typeof secondPacketArray[x][j] === 'number'){

                console.log(' recursing 3')
                let res = comparisonLoop(  firstPacketArray[x][j]  , [secondPacketArray[x][j]]  )
                console.log('res 3', res)
                if(res === true || res === false){
                  return res
                }
            }

          // check if left side has ran out
          if(j === firstPacketArray[x].length - 1 && secondPacketArray[x].length > firstPacketArray[x].length){
              console.log('new true ran out of left side first')
              return true
          }
            
         } 

      }


      // gone through all left side values and still have values on right side
      if(x === firstPacketArray.length - 1 && secondPacketArray.length > firstPacketArray.length){
        console.log('True, went thru all items')
        return true
      }


 }//end comparison loop
}

console.log(pairs)

let sum = 0
for(let k = 0; k < pairs.length; k++){
    if(pairs[k] === true){
        sum += k + 1
    }
    console.log(pairs[k], k, sum)
}
console.log(sum)

 // let sortedElves = allArrays.sort(comparisonLoop )

/*
let sortedElves = allArrays.sort(function(a, b) {

    let sortComparison = comparisonLoop(a, b)

    if(sortComparison === true){
        console.log('sortComparison', sortComparison)
    return a - b}
    if(sortComparison === false){
            console.log('sortComparison', sortComparison)
        return b - a}
  })*/

  allArrays.sort((a, b) => {
    const comparison = comparisonLoop(a, b);
    if (comparison === true) {
        console.log('sortComparison', comparison)
        return -1;
    } else if (comparison === false) {
        console.log('sortComparison', comparison)
        return 1;
    } else {
        return 0;
    }
});


// let sorted = allArrays.sort(comparisonLoop)
//console.log('sorted', sortedElves)
 console.log('allArrays', allArrays)


 for(let k = 0; k < allArrays.length; k++){
  //   console.log('index num, item', (k + 1), String(allArrays[k]))
     if(String(allArrays[k]) === '2'){
        console.log(k + 1)
    }
    if(String(allArrays[k]) === '6'){
        console.log(k + 1)
    }
 }