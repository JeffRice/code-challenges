function getHighCalories (input) {
console.log(input)
}

const fs = require('fs');
let txtFile = "aocday1.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);

let highCount = 0;
let elfItems = [];
let threeHighest = []
let len = splitter.length
for(var i = 0; i < len; i++){
    if(splitter[i] === ''){
        console.log(elfItems, 'new elf')
        highCount = Math.max(elfItems.reduce((acc, cur) => acc + cur,0), highCount)
        threeHighest.push(elfItems.reduce((acc, cur) => acc + cur,0))
        elfItems = [];
    }
    else{
        elfItems.push(Number(splitter[i]))
    }

    console.log(splitter[i])

}


  let sortedElves = threeHighest.sort(function(a, b) {
    return a - b;
  }).reverse()
  
console.log(highCount)
console.log(sortedElves[0] + sortedElves[1] + sortedElves[2])

  


// newstr = newstr.join(' ')

// console.log(newstr);