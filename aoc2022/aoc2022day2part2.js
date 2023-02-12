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

    if (myTurn === 2){
        console.log('tie')
        totalScore += theirTurn + 3
    }
    else if (myTurn === 3){
        console.log('i win')
        // return their number + 1 to get winning play value unless 3, scissors
        if(theirTurn === 3){
            totalScore += 1 + 6
        }
        else{
            totalScore += theirTurn + 1 + 6
        }
    }
    else if (myTurn === 1){
        console.log('i lose')
                // return their number - 1 to get losing play value unless 1, scissors
        if (theirTurn === 1){
            totalScore += 3 + 0
        }
        else {
            totalScore += theirTurn - 1 + 0
        }

    }




}

  
console.log(totalScore)
