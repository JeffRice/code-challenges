const fs = require('fs');
let txtFile = "aocday5.txt";
let instructionsFile = "aocday5instructions.txt";
let str = fs.readFileSync(txtFile,'utf8');
let instructions = fs.readFileSync(instructionsFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);


let len = splitter.length
let lines = [];
let numberOfStacks;

for(var i = 0; i < len; i++){
    numberOfStacks = 1 + (splitter[0].length - 3) / 4
    lines.push(splitter[i])
    console.log('numberOfStacks', numberOfStacks)
}


let stackValues = []
// remove bottom line of stack input
let bottomInputLine = lines.pop()
console.log('bottomInputLine', bottomInputLine)

while(numberOfStacks){
    numberOfStacks--
    console.log('while', lines[numberOfStacks])

    let dynamicArray = lines.map(x => x.charAt(1 + (4 * numberOfStacks))).filter(x => x !== ' ')
    let dynamicArrayTopToBottom = dynamicArray.reverse()
    stackValues.push(dynamicArray)

}
console.log('stackValues', stackValues.reverse())

let splitInstructions = instructions.split('\n')
let numberOfInstructions = splitInstructions.length

for (var i = 0; i < numberOfInstructions; i++){

    console.log('split on space', splitInstructions[i].split(' '))
    let splitOnSpace = splitInstructions[i].split(' ')
    let moveQuantity = Number(splitOnSpace[1])
    let moveSource = Number(splitOnSpace[3]) - 1
    let moveTarget = Number(splitOnSpace[5]) - 1

    for(var z = 0; z < moveQuantity; z++){
        moveCrate(moveSource, moveTarget)
    }

}
console.log('stackValues', stackValues.reverse())


let message = ''
let stackLength = stackValues.length
console.log(stackLength)
while(stackLength){
    stackLength--
    let topOfStack = stackValues[stackLength].pop()
    message += topOfStack
}
console.log(message)

function moveCrate(moveSource, moveTarget) {
    let movedCrate = stackValues[moveSource].pop()
    stackValues[moveTarget].push(movedCrate)
}