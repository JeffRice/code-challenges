const fs = require('fs');
let txtFile = "aocday1.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);


let len = splitter.length



console.log(len);

let sum = 0
for(var i = 0; i < len; i++){

    console.log(splitter[i])

    let currentLine = splitter[i]
    let firstValue = 0
    let secondValue = 0

    for(var j = 0; j < currentLine.length; j++){
    //    console.log(currentLine[j])

        if( isNaN(parseFloat(currentLine[j]))   ){

        }
        else{
            firstValue = currentLine[j]
            console.log('first', firstValue)
            break
        }
    }


    for(var j = currentLine.length-1; j < currentLine.length; j--){
        console.log(currentLine[j])

        if( isNaN(parseFloat(currentLine[j]))   ){

        }
        else{
            secondValue = currentLine[j]
            console.log('second', secondValue)
            break
        }
    }

    sum += parseFloat(firstValue + secondValue)
   

}

console.log(sum)

/*   let sortedElves = threeHighest.sort(function(a, b) {
    return a - b;
  }).reverse()
  
console.log(highCount)
console.log(sortedElves[0] + sortedElves[1] + sortedElves[2])

   */


// newstr = newstr.join(' ')

// console.log(newstr);