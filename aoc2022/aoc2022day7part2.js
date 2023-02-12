const fs = require('fs');
let txtFile = "aocday7.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length
let topDirectory = {'home': []};
let currentDirectory = 'home';
let directoryStack = [];

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
    handleLine(currentLine)
}

function handleLine(line) {
    let firstItem = line[0]
    if (firstItem === '$'){
        handleCommand(line)
    }
    else if (firstItem === 'dir'){
        handleDir(line)
    }
    else {
        handleFile(line)
    }
}

function handleCommand(line) {
    let value = line[2]
    return (value ? changeDirectory(value) : list());
}

function changeDirectory(directory) {

    if(directory === '/'){
  // if toplevel
  directoryStack.push('home')
}
else if(directory === '..'){
    // up one level
    directoryStack.pop()
  }
else{
    // make directory 
    directoryStack.push(directory)
    let reducedDirectoryStack = directoryStack.reduce((accumulator, currentValue) => accumulator + currentValue)

   // currentDirectory = directory
    currentDirectory = reducedDirectoryStack
    let topDirectoryObject = []
    topDirectory[reducedDirectoryStack] = topDirectoryObject
  }
}

function list() {}
function handleDir(line) {
   let directoryName = line[1]
   let reducedDirectoryStack = directoryStack.reduce((accumulator, currentValue) => accumulator + currentValue)
   topDirectory[currentDirectory].push(reducedDirectoryStack + directoryName)
}
function handleFile(line) {
    let fileSize = Number(line[0])
    topDirectory[currentDirectory].push(fileSize)
}

 function getRecursiveValue(dir, totalValue){
    if (topDirectory[dir].filter(x => (typeof x === 'number'))){
        totalValue = topDirectory[dir].filter(x => (typeof x === 'number')).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
    let reduced = topDirectory[dir].reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    // check if there is a number value for the reduced values of dir
    if (typeof reduced === 'number'){
            return reduced
    }
    // else look up its arrays nested directory values
    else{
        let nestedDirs = topDirectory[dir]?.filter(x => (typeof x === 'string'))
        if(!nestedDirs){
            return
        }
        for (var i = 0; i < nestedDirs.length; i++){
            totalValue += getRecursiveValue(nestedDirs[i], totalValue)
        }
    }
    return totalValue
 }


 let totalUnderLimit = 0;
 let sizeArray = []
 let mappedArray = []
 for (const dir in topDirectory) {
    let dirFileSize = getRecursiveValue(dir, 0)
    sizeArray.push(dirFileSize)
    let mappedObject = {name: dir, size: dirFileSize}
    mappedArray.push(mappedObject)
    if (dirFileSize < 100001){
    totalUnderLimit += dirFileSize}
  }

  console.log('What is the sum of the total sizes of those directories?', totalUnderLimit);
  console.log(sizeArray);
  console.log(sizeArray.length);
  console.log(sizeArray.filter(x => x < 100001).reduce((accumulator, currentValue) => accumulator + currentValue), 0);
  console.log(mappedArray.filter(x => x.size > 1272621).sort(function(a, b) {
    return a.size - b.size;
  }).reverse());