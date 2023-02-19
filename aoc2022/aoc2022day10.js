const fs = require('fs');
let txtFile = "aocday10.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length

let xRegister = 1
let cycle = 1

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
    handleLine(currentLine, i)
}

function handleLine(line){
    if(line[1]){
        cycle += 2
        addx(line[1])
    }
    else {
        cycle++
        noop()
    }
}

function noop(){
console.log('nooped')
console.log('cycle number', cycle)
console.log('xRegister', xRegister)
}

function addx(value){ 
    xRegister += Number(value)
    console.log('cycle number', cycle)
    console.log('xRegister', xRegister)
}