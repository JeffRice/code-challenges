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

let emptyColumn = [];

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split('').map(x => Number(x))
   // console.log(currentLine)
    rows.push((currentLine))
//    columns.push(emptyColumn)
}
let numberOfRows = rows.length
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

function visibleTrees(array, i, y, reverse = false, direction='row'){
    if (direction === 'column'){
        console.log('columnnnnnnn ')
    }
    console.log('value at position to test', array[i][y])


   let treesLeft = 0;
   let tallestTree = -1;
   let lineLen = array[i].length

  // if (direction === 'column'){
  //  how do we adapt for columns checking up and down
 // let temp = i
 // i = y
 // y = temp;
// }


    currentTree = array[i][y]
   for(var g = y - 1; g >= 0 ; g--){
    // elements from the given position and to the left
    console.log('elements from the given position to the left', array[i][g])
    
    if(array[i][g] < currentTree){
        treesLeft++
     //   tallestTree = array[i][g]
    }
    else {
        treesLeft++
        break
    }
   }
   tallestTree = -1;
   let treesRight = 0;
   currentTree = array[i][y]
   for(var g = y + 1; g < lineLen; g++){
    // elements from the given position and to the right
    console.log('elements from the given position to the right', array[i][g])
    if(array[i][g] < currentTree){
        treesRight++
     //   tallestTree = array[i][g]
     //   tallestTree = currentTree
    }
    else{
        treesRight++
        break
    }
   }

        
   return [treesLeft, treesRight]
}

console.log('columns: ', columns)

let rowsCopy = rows;
let columnsCopy = columns;

let treesFromRows = 0;
for(var i = 0; i < rows.length; i++){

 //   visibleTrees(rows, i)
 //   visibleTrees(rows, i, true)
 //   console.log('row reverse: ', visibleTrees(rows, i, true))
 //   console.log('row reverse: ', visibleTrees(rows.reverse(), i))
}
 console.log('visiblePositions', visiblePositions)
console.log('treesFromRows', treesFromRows)
console.log('rows', rows)

let treesFromColumns = 0;
for(var i = 0; i < columns.length; i++){
// visibleTrees(columns, i, false, 'column')
// visibleTrees(columns, i, true, 'column')
 //   console.log('column reverse: ', visibleTrees(columns.reverse(), i))
}

// console.log(treesFromColumns)

 //console.log(rowsCopy)
 console.log('visiblePositions', visiblePositions, visiblePositions.length)

 let s = new Set()
 let f = visiblePositions.filter(item => {
    let key = item[0] + '_' +item[1]  // join elements 1 and 2 with _
    return !s.has(key) && s.add(key)  // add to set and return true if it's not already there
})

console.log(f, f.length)







   function getTreeScore (x, y){
    return visibleTrees(rows, x, y)
}

function getTreeScoreVertical (x, y){
    return visibleTrees(columns, y, x)
}

console.log('tree score 3, 2 ', getTreeScore(3, 2))
console.log('tree score 0, 0 ', getTreeScore(0, 0))
console.log('tree score 1, 2 ', getTreeScore(1, 2))
console.log('tree score 2, 1 ', getTreeScore(2, 1))
console.log('tree score 2, 1 ', getTreeScoreVertical(2, 1))
// getTreeScore(3, 2, false, 'column')


let idealSpot = 0;
for(var i=0; i< numberOfColumns; i++){
    //    let column = [];

        for(var z=0;z<rows.length;z++){   
                    let leftRight = getTreeScore(i, z)
                     let upDown = getTreeScoreVertical(i, z)
                    idealSpot = Math.max(idealSpot, leftRight[0] * leftRight[1] * upDown[0] * upDown[1]  )
            }
    
    
        }
        console.log(idealSpot)