const fs = require('fs');
let txtFile = "aocday10.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length

let xRegister = 1
let cycle = 1

let crtOutput = ['#']

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
drawCycle(cycle, xRegister)
}
function addx(value){ 
    drawCycle((cycle - 1), xRegister)
    xRegister += Number(value)
    drawCycle(cycle, xRegister)
}
function drawCycle(cycle, xRegister) {
    console.log('drawCycle cycle number, x register', cycle, xRegister)
    // scale between 0 - 39
    while (cycle > 39) {
        cycle -= 40
    }
    // check if there is overlap
    if(cycle - 1 === xRegister || cycle - 1 === xRegister + 1 || cycle - 1 === xRegister - 1){
        crtOutput.push('#')
    }
    else {
        crtOutput.push('.')
    }
}
console.log(crtOutput)
let crtString = crtOutput.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log(crtString.substring(1, 40))
  console.log(crtString.substring(41, 80))
  console.log(crtString.substring(81, 120))
  console.log(crtString.substring(121, 160))
  console.log(crtString.substring(161, 200))
  console.log(crtString.substring(201, 240))