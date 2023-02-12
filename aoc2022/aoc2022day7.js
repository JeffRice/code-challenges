const fs = require('fs');
let txtFile = "aocday7.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);


console.log(str);
let inputLength = str.length
console.log(inputLength)

let len = splitter.length
let topDirectory = {'home': []};
let newTopDirectory = {};
let newTestDirectory = {};
let directoryStack = [];
let currentDirectory = 'home';
let allDirectories = []
// maybe keep track of handled, and CD'd differently?

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
    console.log(currentLine)
    handleLine(currentLine)
}

function handleLine(line) {
    let firstItem = line[0]
  //  console.log('handleLine: ', firstItem)
    if (firstItem === '$'){
        handleCommand(line)
    }
    else if (firstItem === 'dir'){
        handleDir(line[1])
    }
    else {
        handleFile(line)
    }
}

function handleCommand(line) {
    console.log('handleCommand', line)
    let command = line[1]
    let value = line[2]
    console.log('command', command)
    console.log('value', value)
    return (value ? changeDirectory(value) : list());
}

function changeDirectory(directory) {
    console.log('change directory to: ', directory)

    if(directory === '/'){
  // if toplevel
  //setDeep(myObj, ["level1", "level2", "target1"], 3);
  // 
        directoryStack.push('home')

}
else if(directory === '..'){
    // up one level
    console.log('directoryStack before : ', directoryStack)
    directoryStack.pop()
    console.log('directoryStack after: ', directoryStack)
  }
//else{
 /*   if(allDirectories.includes(directory)){
        console.log('REPEAT CD CD CD: ')
        console.log('REPEAT CD CD CD: ')
        console.log(allDirectories.filter( x => x.includes(directory)))
        let currentStack = allDirectories.filter( x => x.includes(directory)).pop()
        console.log(currentStack)
        currentDirectory = currentStack
        topDirectory[currentDirectory] = []
    } */
    // make directory 
    else {
        currentDirectory = directory
        topDirectory[directory] = []

        console.log('directoryStack before : ', directoryStack)
        directoryStack.push(directory)
        console.log('directoryStack after: ', directoryStack)
    }


 // }
}

function list() { console.log('list command executed ') }

function handleDir(directoryName) {
//   let directoryName = line[1]
   console.log('handle dir', directoryName, currentDirectory)




    allDirectories.push(directoryName)
   topDirectory[currentDirectory].push(directoryName)
   let value = []
   setDeep(newTopDirectory, directoryStack, directoryName, true)

}
function handleFile(line) {
    let fileSize = Number(line[0])
    let fileName = line[1]
    console.log('handling file:', fileSize, fileName)
    topDirectory[currentDirectory].push(fileSize)
    let value = fileName
    console.log(directoryStack)

 //   console.log('returnReducedPath returnReducedPath returnReducedPath', returnReducedPath(directoryStack))
    
    directoryStack.push(fileSize)
    setDeep(newTopDirectory, directoryStack, fileSize, true)
    directoryStack.pop()
}

 console.log(topDirectory)
 console.log('topDirectory!!!!')



 function getRecursiveValue(dir, totalValue){
    console.log('RECURSIVE topDirectory[dir]: ', dir, '   ', topDirectory[dir])
    
    //
    if (topDirectory[dir].filter(x => (typeof x === 'number'))){
        totalValue = topDirectory[dir].filter(x => (typeof x === 'number')).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

    let reduced = topDirectory[dir].reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    // check if there is a number value for the reduced values of dir
    if (typeof reduced === 'number'){
         console.log('totalValue match reduced: ', reduced)
            return reduced
    }
    // else look up its arrays nested directory values and return those
    else{
        let nestedDirs = topDirectory[dir]?.filter(x => (typeof x === 'string'))
        if(!nestedDirs){
            return
        }
        for (var i = 0; i < nestedDirs.length; i++){
            totalValue += getRecursiveValue(nestedDirs[i], totalValue)
   //         console.log('total value plus lookup: ', totalValue)
        }
    }
    console.log('totalValue: ', totalValue)
    return totalValue
 }
 
// getRecursiveValue('dqpw', 0)

// getRecursiveValue('qwqcbdms', 0)



console.log('LIMIT LIMIT')
console.log('LIMIT LIMIT')
console.log('LIMIT LIMIT')
console.log('LIMIT LIMIT')
console.log(allDirectories)

/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 * @param {boolean} setrecursively - If true, will set value of non-existing path as well.
 */
 function setDeep(obj, path, value, setrecursively = false) {
    path.reduce((a, b, level) => {
        if (setrecursively && typeof a[b] === "undefined" && level !== path.length){
            a[b] = {};
            return a[b];
        }

        if (level === path.length){
            a[b] = value;
            return value;
        } 
        return a[b];
    }, obj);
}

function returnReducedPath(path) {
    path.reduce((a, b, level) => {
        if (level === path.length && typeof a[b] !== "undefined"){
            a[b] = value;
            return value;
        } 
        return a[b];
    });
}

console.log(newTopDirectory.home)
console.log(newTopDirectory.home['fmftdzrp.fwt'])


// console.log(newTopDirectory)
// console.log('gjccccc   ', newTopDirectory.home.brdsppd)
// console.log('gjccccc   ', newTopDirectory.home.brdsppd.gjc)
// console.log('gjccccc   ', newTopDirectory.home.brdsppd.gjc.bvctghh)
// console.log('gjccccc   ', newTopDirectory.home.brdsppd.gjc.bvctghh.lsprzlbf.hts)
// console.log('szfw', newTopDirectory.home.szfw.lwfgnzz.qgdcjq)
