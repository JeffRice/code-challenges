const fs = require('fs');
let txtFile = "aocday3.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);

let totalPriorityScore = 0;
let len = splitter.length

const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz'

for(var i = 0; i < len; i++){

    let currentLine = splitter[i]
    console.log(currentLine)



    if(i % 3 === 0) {
        console.log('new group')
        identifyBadges();
    }
    

    let firstHalf = currentLine.substring(0, currentLine.length/2);
    let secondHalf = currentLine.substring(currentLine.length/2, currentLine.length);
    console.log(firstHalf)
    console.log(secondHalf)
    let halfLength = (currentLine.length/2)
    console.log(halfLength)

    let itemValue = 0;
    while(halfLength){
        halfLength--
        let currentChar = firstHalf[halfLength]
        console.log(currentChar);

  
            if (secondHalf.split('').includes(currentChar)){
                console.log('Matching item! : ', currentChar)
                itemValue = lowerAlpha.split('').indexOf(currentChar) > -1 ? lowerAlpha.split('').indexOf(currentChar) + 1 : lowerAlpha.split('').indexOf(currentChar.toLowerCase()) + 1 + 26
                   console.log('itemValue', itemValue)
                console.log('total: ', totalPriorityScore)
            }


         }
         console.log('itemValue', itemValue)
            totalPriorityScore += itemValue
         

         console.log(totalPriorityScore)







}

  
function identifyBadges(){
    
}