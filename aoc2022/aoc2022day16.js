const fs = require('fs');
let txtFile = "aocday16.txt";
let str = fs.readFileSync(txtFile,'utf8');


let splitter = str.split('\n')

let valvesObj = {}
 const start = 'AA'
// const start = 'QZ'

let minutes = 30

let nonZeroValves = []

for(let curentItem of splitter ){
    console.log(curentItem)
    let instructions = curentItem.split(' ')
    console.log(instructions[1])
    let valveName = instructions[1]
    console.log(instructions[4])
    let flowRate = instructions[4].split('=')
    let exitValves = instructions.length - 9
    console.log(exitValves)

    valvesObj[valveName] = {}
    valvesObj[valveName].flowRate = Number(flowRate[1].substring(0, flowRate[1].length - 1))
    valvesObj[valveName].exitValves = []
   
        while(exitValves){
        console.log('connects to ', instructions[8 + exitValves])
        let valveString = instructions[8 + exitValves]
        // cut off trailing comma
        if(valveString.charAt(valveString.length - 1) === ','){
            valveString = valveString.substring(0, valveString.length - 1)
        }

        console.log('valveString ', valveString)
        valvesObj[valveName].exitValves.push(valveString)
        exitValves--
        }
}

console.log(valvesObj)

console.log(valvesObj[start])


for(const valve in valvesObj){
    console.log('valve in valvesObj', valve)
    console.log(valvesObj[valve].flowRate)
    console.log(valvesObj[valve].exitValves)

    if(valvesObj[valve].flowRate){
        nonZeroValves.push(valve)
     }
}

let currentPosition = start

     
function measureDistance(currentPosition, valve, level, checkedValves){
 //   console.log('measuring', currentPosition, valve, level)
 //   console.log('valvesObj[valve].exitValves', valvesObj[valve].exitValves)
 //   console.log('checkedValves', checkedValves)

    // remove extra checked valves when moving back up levels
  //  console.log('level check', level)
  //  console.log('checkedValves check', checkedValves.length)
    let x = checkedValves.length - level + 1
    // remove extra checked valves when moving back up levels
    while(x){
        checkedValves.pop()
        x--
    }

    // if the valve has already been checked do not check again
    if(checkedValves.includes(valve)){
  //      console.log('SKIP')
    return 0
    }




    if(valvesObj[currentPosition].exitValves.includes(valve)) {
   //     console.log('found', level)
        return level
      }
      else{
        checkedValves.push(valve)
     
        level++
        let lowestPath = 100
            // check if it is in next list recursively
            for(const connection in valvesObj[valve].exitValves){
                    // if the valve has already been checked do not check again
        //       console.log('connection', valvesObj[valve].exitValves[connection])
       //         console.log('deep checkedValves', checkedValves)
                let test = measureDistance(currentPosition, valvesObj[valve].exitValves[connection], level, checkedValves)
        //        console.log('test', test)
                    if(test){
                        lowestPath = Math.min(test, lowestPath) 
               //     return test
                            }





                
            }
            return lowestPath
       // return 0
      }

}

console.log('nonZeroValves', nonZeroValves)

nonZeroValves.unshift(start)

let table = {}


for(currentValve of nonZeroValves){
    console.log('nonZeroValves', currentValve)

    for(eachValve of nonZeroValves){
            //measure distance to other nonZeroValves and store the values
        let checkedValves = []
        let dist = measureDistance(currentValve, eachValve, 1, checkedValves)
        console.log('distance from', currentValve, 'to', eachValve, dist)

    
        // save in a way you can look up later
        table[currentValve + eachValve] = dist
    }




}


function whileMinutes(minutes, possibleMoves) {

    let pressurePerMin = 0
    let totalReleasedPressure = 0
    while(minutes > 0){
      //  console.log('minute number', 30 - minutes + 1, possibleMoves)

    
        if(possibleMoves.length){
        // measure distance from a to b
        let checkedValves = []
    //    console.log('currentPosition', currentPosition, possibleMoves[0])
        //let valveDistance = measureDistance(currentPosition, possibleMoves[0], 1, checkedValves)
        let valveDistance = table[currentPosition + possibleMoves[0]]
        let timeToSubtract = valveDistance + 1
    
     //   console.log('timeToSubtract', timeToSubtract)
     //   console.log('pressurePerMin', pressurePerMin)


        currentPosition = possibleMoves[0]
        possibleMoves.shift()
        minutes -= timeToSubtract

        totalReleasedPressure += (timeToSubtract * pressurePerMin)


        pressurePerMin += valvesObj[currentPosition].flowRate
        
        }
        else {
     //       console.log('done')
            minutes--
            totalReleasedPressure += pressurePerMin
        }
    
     //   console.log('pressurePerMin after', pressurePerMin)
     //   console.log('totalReleasedPressure', totalReleasedPressure)
    
    }

  //  console.log('totalReleasedPressure', totalReleasedPressure)
  return totalReleasedPressure
}









var permute = function(nums) {
    
    const result = [];
    const queue = [];
    
    queue.push([[], nums]);
    
    while(queue.length){
        const [currentSequence, availableNumbers] = queue.shift();





        
        if(availableNumbers.length === 0)
        {
       //     console.log('availableNumbers length === 0 currentSequence', currentSequence)
                result.push(currentSequence);
                continue;
        }
            
        
        for(let i =0; i < availableNumbers.length; i++)
        {
            const number = availableNumbers[i];

            

            
       //     console.log('number, currentSequence', number, currentSequence)
        //    console.log('permute push [...currentSequence, number]', [...currentSequence, number])
        //    console.log('permute push [...availableNumbers.slice(0, i), ...availableNumbers.slice(i + 1)]', [...availableNumbers.slice(0, i), ...availableNumbers.slice(i + 1)])
 
            // add the distance/minutes of each valve and short circuit if the value is over 30

/*             if(currentSequence.slice(0, 3).reduce( (accumulator, currentValue) => accumulator + currentValue, 0) > 8){
                 console.log('alert2 alert2')
                continue;
            } */

            let sequenceTotal = 0

            for(let i = 0; i < currentSequence.length; i++){
    
          //      console.log('currentValve', currentSequence[i])
                let previousValve = currentSequence[i - 1] ? currentSequence[i - 1] : start
          //      console.log('previous Valve', previousValve)
    
             //   let dist = measureDistance(previousValve, currentSequence[i], 1, [])
                let dist = table[previousValve + currentSequence[i]]
    
           //     console.log('current dist', dist)
                sequenceTotal += 1 + dist
           //      console.log('inner sequenceTotal', sequenceTotal, currentSequence)
                if(sequenceTotal > 10){
                    break
                } 
            }
            
         //   console.log('sequenceTotal', sequenceTotal, currentSequence)
    
            if(sequenceTotal > 10){
             //   console.log('alert2 alert2', sequenceTotal)
              //  console.log('currentSequence', currentSequence)
              //  console.log(...currentSequence)
             // let poppedSequence = currentSequence.slice(0, currentSequence.length -1)
             //   console.log('popped currentSequence', poppedSequence)
                result.push(currentSequence);
                continue;
            }
     
 


            queue.push([
                [...currentSequence, number], 
                [...availableNumbers.slice(0, i), ...availableNumbers.slice(i + 1)]
            ]);    
        }   
    }
    
    return result;
};

nonZeroValves.shift()
 let permutations = permute(nonZeroValves)
// let permutations = permute([ 'BB', 'CC', 'DD', 'EE', 'HH', 'JJ' ])


 console.log('permutations', permutations)
// let set  = new Set(permutations.reverse().map(JSON.stringify));
// let arr2 = Array.from(set).map(JSON.parse);
// console.log('permutations set', arr2)
let Max = 0

for(const item of permutations){
   console.log(item)
   let result = whileMinutes(30, item)
   Max = Math.max(Max, result) 
   console.log(result, Max)
}
console.log(Max)
console.log(table)
