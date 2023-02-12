const fs = require('fs');
let txtFile = "aocday6.txt";
let str = fs.readFileSync(txtFile,'utf8');


console.log(str);
let inputLength = str.length
console.log(inputLength)

let bufferFound = false
let testIndex = 0;
while(!bufferFound){
    let currentChars = str.substring(testIndex, testIndex + 14)
    bufferFound = charsAreUnique(currentChars)
    testIndex = bufferFound ? testIndex : testIndex + 1
}
console.log(testIndex + 14);





function charsAreUnique(buff) {
    let buffer = buff.split('')
    let bufferLength = buffer.length
    let isUnique = true
    for (i =0; i < bufferLength; i++){
       let filteredBuffer = buffer.filter(x => x === buffer[i]) //filter the string by the current char
       if (filteredBuffer.length > 1) // if there is more than one item after filtering the chars are not unique
       isUnique = false
    }
    return isUnique
}

