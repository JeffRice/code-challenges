const fs = require('fs');
let txtFile = "aocday8.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

console.log(splitter);
console.log(splitter.length);
console.log(str);
let inputLength = str.length
console.log(inputLength)
let len = splitter.length
let numberOfColumns = splitter[0].length
let rows = [];
let columns = [];
let visiblePositions = [];

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split('').map(x => Number(x))
   // console.log(currentLine)
    rows.push((currentLine))
//    columns.push(emptyColumn)
}
console.log(rows.length)
console.log('rows: ', rows)
buildColumns(rows)

function buildColumns(rows){
    for(var i=0; i< numberOfColumns; i++){
        let column = [];
        for(var z=0;z<rows.length;z++){           
            column.push(rows[z][i]) //build a column array for each index of the column
            }
            columns.push(column)
       }
}

function visibleTrees(array, i, reverse = false, direction='row'){
   let tallestTree = -1;
   let lineLen = array[i].length
   // reverse loop for trees from the right
   if(reverse){   for (var x = lineLen; x > 0; x--){
    currentTree = array[i][x]
    if(currentTree > tallestTree){
        if (direction === 'column'){
            visiblePositions.push([x, i])  
        }
        else{
            visiblePositions.push([i, x])  
        }
        tallestTree = currentTree
              }
        }     
    } 
   // regular loop for trees from the left
  else {
   for (var x = 0; x < lineLen; x++){
    currentTree = array[i][x]
    if(currentTree > tallestTree){
        if (direction === 'column'){
            visiblePositions.push([x, i])  
        }
        else{
            visiblePositions.push([i, x])  
        }  
        tallestTree = currentTree
              }
        }
    }
   return array
}
console.log('columns: ', columns)
for(var i = 0; i < rows.length; i++){
    visibleTrees(rows, i)
    visibleTrees(rows, i, true)
}
console.log('visiblePositions', visiblePositions)
console.log('rows', rows)
for(var i = 0; i < columns.length; i++){
visibleTrees(columns, i, false, 'column')
visibleTrees(columns, i, true, 'column')
}
 console.log('visiblePositions', visiblePositions, visiblePositions.length)
 let s = new Set()
 let f = visiblePositions.filter(item => {
    let key = item[0] + '_' +item[1]  // join elements 1 and 2 with _
    return !s.has(key) && s.add(key)  // add to set and return true if it's not already there
})
console.log(f, f.length)