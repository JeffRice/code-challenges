const { ifError } = require('assert');
const fs = require('fs');
let txtFile = "aocday21.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')


let monkeyList = {}
for(const item of splitter){
  //console.log('item', item)

  let itemSplitter = item.split(':')
  console.log('itemSplitter', itemSplitter)

  monkeyName = itemSplitter[0] 
  monkeyOperation = itemSplitter[1] 

  let operationSplitter = itemSplitter[1].split(' ')
  operationSplitter.shift()

  console.log('monkeyName', monkeyName)
  console.log('operationSplitter', operationSplitter)
  monkeyList[monkeyName] = []

    if(operationSplitter.length === 1){
        console.log('have a value')
        monkeyList[monkeyName].push(Number(operationSplitter[0])) 
    }
    else{
        console.log('have an equation')  
        monkeyList[monkeyName].push(operationSplitter[0])
        monkeyList[monkeyName].push(operationSplitter[1])
        monkeyList[monkeyName].push(operationSplitter[2])
    }

 } 

 console.log(monkeyList)

while(monkeyList['root'].length > 1){


 for(const item in monkeyList){
    console.log('item', item)
    console.log('monkeyList item', monkeyList[item])

    if(monkeyList[item].length > 1){
        console.log('need to check')
        let firstValue = monkeyList[item][0]
        console.log('firstValue', firstValue)
        let secondValue = monkeyList[item][2]
        console.log('secondValue', secondValue)

        console.log('first value Lookup')
        console.log('monkeyList[firstValue]', monkeyList[firstValue])


        if(typeof monkeyList[item][0] != 'number' && monkeyList[firstValue].length === 1){
            console.log('update first item')
            monkeyList[item][0] = monkeyList[firstValue][0]
        }


        console.log('second value Lookup')
        console.log('monkeyList[secondValue]', monkeyList[secondValue])

        if(typeof monkeyList[item][2] != 'number' && monkeyList[secondValue].length === 1){
            console.log('update second item')
            monkeyList[item][2] = monkeyList[secondValue][0]
        }

    // check if you can replace the equation with a value
         if(typeof monkeyList[item][0] === 'number' && typeof monkeyList[item][2] === 'number' ){
            console.log('replace the equation with a value')

           let returnValue = operationFunction(monkeyList[item][0], monkeyList[item][1], monkeyList[item][2])
           monkeyList[item] = [returnValue]
         }
    }

 }
 console.log('monkeyList', monkeyList)
}

function operationFunction(firstValue, operation, secondValue){
    if(operation === '+'){return firstValue + secondValue}
    if(operation === '-'){return firstValue - secondValue}
    if(operation === '*'){return firstValue * secondValue}
    if(operation === '/'){return firstValue / secondValue}
}