const fs = require('fs');
let txtFile = "aocday4.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);

let overlaps = 0;
let len = splitter.length

for(var i = 0; i < len; i++){

    let currentLine = splitter[i]
    console.log(currentLine)

   let bothRanges = currentLine.split(',')
   console.log(bothRanges)
   let currentRange = []
   //split the range on dash to get the low and high of the range
   bothRanges.forEach(element => currentRange.push(element.split('-')));

    // cast string to number
    let elf1 = currentRange[0].map(x => Number(x))
    let elf2 = currentRange[1].map(x => Number(x))

    if(!(elf1[0] < elf2[0] || elf1[1] > elf2[1]) || !(elf2[0] < elf1[0] || elf2[1] > elf1[1]) ){
        console.log('overlap: ', elf1, elf2)
        overlaps++
        console.log(overlaps)
    }

}
console.log(overlaps)
