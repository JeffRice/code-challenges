const fs = require('fs');
let txtFile = "aocday2.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

str = str.replaceAll('A', 1).replaceAll('B', 2).replaceAll('C', 3).replaceAll('X', 1).replaceAll('Y', 2).replaceAll('Z', 3)


let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);

let totalScore = 0;
let len = splitter.length
let myTurn, theirTurn;
for(var i = 0; i < len; i++){
    let currentLine = splitter[i]
    let theirTurn = Number(currentLine[0])
    let myTurn = Number(currentLine[2])
    let total = theirTurn - myTurn
    console.log(theirTurn, myTurn)

    console.log(total)

    if (total < -1){
        console.log('i lose')
        totalScore += myTurn + 0
    }
    else if (total === -1){
        console.log('i win')
        totalScore += myTurn + 6
    }
    else if (total === 0){
        console.log('tie')
        totalScore += myTurn + 3
    }
    else if (total === 1){
        console.log('I lose')
        totalScore += myTurn + 0
    }
    else {
        console.log('i win')
        totalScore += myTurn + 6
    }



}

  
console.log(totalScore)