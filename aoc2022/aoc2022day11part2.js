const fs = require('fs');
let txtFile = "aocday11.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length


let monkey = 0
let monkeys = []

let instructionLine = 0
let currentMonkey = {}

for(var i = 0; i < len; i++){
    console.log(splitter[i])


    if (instructionLine === 1){
        console.log('these are the starting items: ', splitter[i])
        let startingItems = splitter[i].split(':')
        let itemValues = startingItems[1].split(',')
        console.log('itemValues: ', itemValues)
        let items = []
        for (var j = 0; j < itemValues.length; j++){
            items.push(Number(itemValues[j]))
        } 
        currentMonkey.items = items
        currentMonkey.inspections = 0
        console.log('current monkey: ', currentMonkey)
    }
    if (instructionLine === 2){
        console.log('Operation: ', splitter[i])
        let operations = splitter[i].split('=')
        let operationValues = operations[1].split(' ')
        let operator = operationValues[2]
        let operatorValue = operationValues[3]
        console.log('operationValues: ', operator,  operatorValue)
        currentMonkey.operation = [operator, operatorValue]
    }
    if (instructionLine === 3){
        console.log('test: ', splitter[i])
        let test = splitter[i].split(' ')
        let divisorTest = test[test.length - 1]
        console.log('disivible by: ', divisorTest)
        currentMonkey.divisorTest = divisorTest
    }
    if (instructionLine === 4){
        console.log('if true: ', splitter[i])
        let trueInstructions = splitter[i].split(' ')
        let trueMonkey = trueInstructions[trueInstructions.length - 1]
        console.log('trueMonkey: ', trueMonkey)
        currentMonkey.true = trueMonkey
    }
    if (instructionLine === 5){
        console.log('if false: ', splitter[i])
        let falseInstructions = splitter[i].split(' ')
        let falseMonkey = falseInstructions[falseInstructions.length - 1]
        console.log('falseMonkey: ', falseMonkey)
        currentMonkey.false = falseMonkey
    }

   
    instructionLine++


   if (splitter[i] === ''){
    console.log('new monkey')
    monkeys.push(currentMonkey)
    monkey++
    instructionLine = 0;
    currentMonkey = {}
   }



}

console.log(monkeys)
console.log(monkeys.length)

let all_divisors = monkeys.map((monkey) => monkey.divisorTest).reduce((a, b) => a * b, 1);

console.log(all_divisors)

let x = 10000
while(x){


for(var k = 0; k < monkeys.length; k++){
  //  console.log(monkeys[k])

 //   console.log(monkeys[k].items)
    let monkeysItems = monkeys[k].items

    for (var m = 0; m < monkeysItems.length; m ++){
        let inspectedValue = operationFunction(monkeysItems[m], monkeys[k].operation)
   //     console.log(inspectedValue)
   
            inspectedValue = inspectedValue % all_divisors
           // if(monkeysItems[m] )
          if (inspectedValue % Number(monkeys[k].divisorTest) === 0){
      //      console.log('value is divisible')
            let monkeyTarget = Number(monkeys[k].true)
            // throw to true
            monkeys[monkeyTarget].items.push(inspectedValue)
          }
          else {
       //     console.log('value is not divisible')
           // throw to false
           let monkeyTarget = Number(monkeys[k].false)
           monkeys[monkeyTarget].items.push(inspectedValue)

          }
          monkeys[k].inspections++
    }

    monkeys[k].items = []

}
x--
}

function operationFunction(value, operation){

    let parseValue = 0

    if (operation[1] === 'old'){
        parseValue = value
    }
    else {
        parseValue = Number(operation[1])
    }
  
    if (operation[0] === '+'){
        return value + parseValue}
    if (operation[0] === '*'){
        return value * parseValue}

}

 console.log(monkeys)

