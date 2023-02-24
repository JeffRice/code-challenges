const fs = require('fs');
let txtFile = "aocday16.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')

let valvesObj = {}
const start = 'AA'
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


  //  console.log('level check', level)
  //  console.log('checkedValves check', checkedValves.length)
    // remove extra checked valves when moving back up levels
    let x = checkedValves.length - level + 1

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
    currentPosition = start
   // console.log(minutes, possibleMoves, currentPosition)
    let pressurePerMin = 0
    let totalReleasedPressure = 0
    let Moves = possibleMoves.filter(x => x)

    while(minutes > 0){
      //  console.log('minute number', 30 - minutes + 1, possibleMoves)

        if(Moves.length){
        // measure distance from a to b
    //    console.log('currentPosition', currentPosition, possibleMoves[0])
        let valveDistance = table[currentPosition + Moves[0]]
        let timeToSubtract = valveDistance + 1
     //   console.log('timeToSubtract', timeToSubtract)
     //   console.log('pressurePerMin', pressurePerMin)
        currentPosition = Moves[0]
        Moves.shift()
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
                result.push(currentSequence);
                continue;
        }
            
        
        for(let i =0; i < availableNumbers.length; i++)
        {
            const number = availableNumbers[i];
            let sequenceTotal = 0

            for(let i = 0; i < currentSequence.length; i++){
          //      console.log('currentValve', currentSequence[i])
                let previousValve = currentSequence[i - 1] ? currentSequence[i - 1] : start
          //      console.log('previous Valve', previousValve)

                let dist = table[previousValve + currentSequence[i]]

           //     console.log('current dist', dist)
                sequenceTotal += 1 + dist
           //      console.log('inner sequenceTotal', sequenceTotal, currentSequence)
                if(sequenceTotal > 25){
                    break
                } 
            }
         //   console.log('sequenceTotal', sequenceTotal, currentSequence)

            if(sequenceTotal > 25){
             //   console.log('alert2 alert2', sequenceTotal)
              //  console.log('currentSequence', currentSequence)
              //  console.log(...currentSequence)
              let poppedSequence = currentSequence.slice(0, currentSequence.length -1)
             //   console.log('popped currentSequence', poppedSequence)
                result.push(poppedSequence);
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

 console.log('permutations', permutations)
 let set  = new Set(permutations.reverse().map(JSON.stringify));
 let arr2 = Array.from(set).map(JSON.parse);
 let arrCopy = Array.from(set).map(JSON.parse);
 console.log('permutations set', arr2)
let Max = 0

let compoundMax = 0
for(const item of arr2){
    console.log('item', item)
   let testPaths = arrCopy.filter(x => x)
    for(const valve of item){
        testPaths = testPaths.filter(x => !x.includes(valve))
     //   console.log('item valve', valve)
     //   console.log('testPaths', testPaths)
    }
   // console.log('testPaths', testPaths)

    let testPathMax = 0
    let maxPath
    for(const path of testPaths){
        let pathResult = whileMinutes(26, path)
        if(pathResult > testPathMax){
            maxPath = path
        }
        testPathMax = Math.max(testPathMax, pathResult) 
        testPaths = arrCopy.filter(x => x)
    }
    console.log('testPathMax', testPathMax)
    console.log('maxPath', maxPath)

   let result = whileMinutes(26, item)

   Max = Math.max(Max, result) 
   console.log('result, Max', result, Max)

   compoundMax = Math.max(compoundMax, result + testPathMax)
   console.log('compoundMax', compoundMax)
}

console.log(Max)
console.log(table)