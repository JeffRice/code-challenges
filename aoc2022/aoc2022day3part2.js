const fs = require('fs');
let txtFile = "aocday3.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);

let totalPriorityScore = 0;
let len = splitter.length
let badgeGroup = [];
let totalBadges = [];

const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz'

for(var i = 0; i < len; i++){

    let currentLine = splitter[i]
    console.log(currentLine)




    if(i % 3 === 0 && i > 1) {
        console.log('new group')
        let test = identifyBadges(badgeGroup)
        console.log('their badge: ', test[0])
        totalBadges.push(test[0])
        badgeGroup = []

    }

    badgeGroup.push(currentLine)
    

    let firstHalf = currentLine.substring(0, currentLine.length/2);
    let secondHalf = currentLine.substring(currentLine.length/2, currentLine.length);

    let halfLength = (currentLine.length/2)

    let itemValue = 0;
    while(halfLength){
        halfLength--
        let currentChar = firstHalf[halfLength]
    //    console.log(currentChar);

  
            if (secondHalf.split('').includes(currentChar)){
         //       console.log('Matching item! : ', currentChar)
                itemValue = lowerAlpha.split('').indexOf(currentChar) > -1 ? lowerAlpha.split('').indexOf(currentChar) + 1 : lowerAlpha.split('').indexOf(currentChar.toLowerCase()) + 1 + 26
     //              console.log('itemValue', itemValue)
     //           console.log('total: ', totalPriorityScore)
            }


         }
         console.log('itemValue', itemValue)
            totalPriorityScore += itemValue
         

         console.log(totalPriorityScore)
         console.log(totalBadges)

let mappedBadges = totalBadges.map(x => lowerAlpha.split('').indexOf(x) > -1 ? lowerAlpha.split('').indexOf(x) + 1 : lowerAlpha.split('').indexOf(x.toLowerCase()) + 1 + 26 )

console.log(mappedBadges)
console.log(mappedBadges.length)

let summedBadges = mappedBadges.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );


  console.log('summed badges: ', summedBadges)

}

  
function identifyBadges(badgeGroup){
    console.log('badgeGroup', badgeGroup[0])
   return badgeGroup[0].split('').filter(x => badgeGroup[1].includes(x) && badgeGroup[2].includes(x)  )

}