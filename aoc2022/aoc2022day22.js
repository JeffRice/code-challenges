const { ifError } = require('assert');
const fs = require('fs');
const { cursorTo } = require('readline');
let txtFile = "aocday22.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let rows =[]
let columns =[]
let start = [0, 8]
let direction = 'right'
let instructionString

let directions = { 0 : 'right', 1: 'down', 2: 'left', 3: 'up' }

for(let i=0; i< splitter.length; i++){
  console.log('item', splitter[i])
  let itemSplitter = splitter[i].split('')
  if(splitter[i]===''){
    console.log('done with rows')
    instructionString = splitter[i+1].split('')
    break
  }
  else{
    rows.push(itemSplitter)
    console.log('itemSplitter', itemSplitter)
  }
}

console.log('rows', rows)
console.log('instructionString', instructionString)

let instructions = []
let newInstructions = []
for(let i=0; i< instructionString.length; i++){

    if(instructionString[i] === 'L'){
        newInstructions.push('L')
        instructions.push(newInstructions)
        newInstructions = []
    }
    else if(instructionString[i] === 'R'){
        newInstructions.push('R')
        instructions.push(newInstructions)
        newInstructions = []
    }
    else{
        newInstructions.push(instructionString[i])
    }
    
}

console.log('instructions', instructions)

let cols
makeCols(rows)
console.log('rows printed')
printGrid(rows)
console.log('columns printed')
printCols(cols)

checkMoves([0, 10])

let rowObj = {}
let rowNum = 0
for(const row of rows){

    let firstSpot
    let lastSpot

    let earlyDot = row.indexOf('.')
    let earlyHash = row.indexOf('#')

    let lastDot = row.reverse().indexOf('.')
    let lastHash = row.indexOf('#')

    console.log('earliest .', earlyDot)
    console.log('earliest #', earlyHash)

    if(earlyDot > -1){
        firstSpot = earlyDot
    }
    if(earlyHash > -1 && earlyHash < earlyDot){
        firstSpot = earlyHash
    }



    console.log('lastDot .',  (row.length -1) - lastDot)
    console.log('lastHash #', (row.length -1) - lastHash)

    if(lastDot > -1){
        lastSpot = (row.length -1) - lastDot
    }
    if(lastHash > -1 && lastHash < lastDot){
        lastSpot = (row.length -1) - lastHash
    }


    console.log('firstSpot, row', rowNum, firstSpot)
    console.log('lastSpot, row', rowNum, lastSpot)

    rowObj[rowNum] = {}
    rowObj[rowNum]['firstSpot'] = firstSpot
    rowObj[rowNum]['lastSpot'] = lastSpot

    row.reverse()// return row to original state
    rowNum++
}

console.log('row Obj', rowObj)

let colObj = {}
let colNum = 0
for(const col of cols){
    let firstSpot
    let lastSpot

    let earlyDot = col.indexOf('.')
    let earlyHash = col.indexOf('#')

    let lastDot = col.reverse().indexOf('.')
    let lastHash = col.indexOf('#')

    console.log('earliest .', earlyDot)
    console.log('earliest #', earlyHash)

    if(earlyDot > -1){
        firstSpot = earlyDot
    }
    if(earlyHash > -1 && earlyHash < earlyDot){
        firstSpot = earlyHash
    }



    console.log('lastDot .',  (col.length -1) - lastDot)
    console.log('lastHash #', (col.length -1) - lastHash)

    if(lastDot > -1){
        lastSpot = (col.length -1) - lastDot
    }
    if(lastHash > -1 && lastHash < lastDot){
        lastSpot = (col.length -1) - lastHash
    }


    console.log('firstSpot, row', colNum, firstSpot)
    console.log('lastSpot, row', colNum, lastSpot)

    colObj[colNum] = {}
    colObj[colNum]['firstSpot'] = firstSpot
    colObj[colNum]['lastSpot'] = lastSpot

    col.reverse()// return row to original state
    colNum++

}

console.log('col Obj', colObj)

let numOfMoves = []
let directionAfter
let reducedMoves

 let position = [0,8]
// let position = [0,51]


//loop thrugh instructions and move 
for (innerInstr of instructions){

    for(let i =0; i < innerInstr.length; i++){
        console.log('instruction:', i, innerInstr[i])
        if(i === innerInstr.length-1 ){
            directionAfter = innerInstr[i]
        }
        else{
            numOfMoves.push(innerInstr[i])
        }
    
        reducedMoves = Number(numOfMoves.reduce( (acc, cur) => acc + cur, ''  ))

    }
    console.log( 'reducedMoves', reducedMoves )
    console.log( 'direction', direction )
    console.log( 'directionAfter', directionAfter )
    numOfMoves = []


    let returnedPosition = move(reducedMoves, direction, position)

    printGrid(rows)

     // update direction
    let updatedDirection = updateDirection(direction, directionAfter)
    console.log( 'updatedDirection', updatedDirection )

  //   direction = directionAfter
     direction = updateDirection(direction, directionAfter)
     position = returnedPosition
}



function move(reducedMoves, direction, position){

    let y = position[0].valueOf()
    let x = position[1].valueOf()

    let updatedPosition = [y, x]

    console.log('current position', updatedPosition)


   while(reducedMoves){

    checkMoves(updatedPosition)

    console.log('left, right, up, down', left, right, up, down)

    let cubeSide = 0

    if(updatedPosition[0] >= 0 && updatedPosition[0] <= 49 && updatedPosition[1] >= 49 && updatedPosition[1] <= 99){
        cubeSide = 1
        console.log('cubeSide', cubeSide)
    }


    if(direction === 'left'){      
        if(left === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '<'
            reducedMoves = 1
             }
             else if((left === undefined || left === ' ')){
                rows[updatedPosition[0]][updatedPosition[1]] = '<'
                console.log('need to wrap', updatedPosition[0], rowObj[updatedPosition[0]], rowObj[updatedPosition[0]]['lastSpot']                 )
                // wrap to leftmost spot at row of updatedPosition[0]

                               // if wrap spot is a hash mark end the move
               if(rows[updatedPosition[0]][rowObj[updatedPosition[0]]['lastSpot']] === '#'){
                console.log('dead end wrap')
                reducedMoves = 1
            }

            else{
                updatedPosition[1] = rowObj[updatedPosition[0]]['lastSpot']
            }



             }

             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '<'
                updatedPosition[1]-- 
            }
    }
    if(direction === 'right'){ 
        if(right === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '>'
            reducedMoves = 1
             }
             else if((right === undefined || right === ' ')){
                rows[updatedPosition[0]][updatedPosition[1]] = '>'
                console.log('need to wrap', updatedPosition[0], rowObj[updatedPosition[0]], rowObj[updatedPosition[0]]['firstSpot']                 )
                // wrap to leftmost spot at row of updatedPosition[0]

                               // if wrap spot is a hash mark end the move
               if(rows[updatedPosition[0]][rowObj[updatedPosition[0]]['firstSpot']] === '#'){
                console.log('dead end wrap')
                reducedMoves = 1
            }

            else{
                updatedPosition[1] = rowObj[updatedPosition[0]]['firstSpot']
            }



             }
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '>'
                updatedPosition[1]++ 
            }
    }
    if(direction === 'up'){    
        
        if(up === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '^'
            reducedMoves = 1
             }
             else if((up === undefined || up === ' ')){
                // wrap to top spot at row of updatedPosition[1]
               rows[updatedPosition[0]][updatedPosition[1]] = '^'
               console.log('need to wrap up', updatedPosition[1], colObj[updatedPosition[1]], colObj[updatedPosition[1]]['lastSpot']                 )
              
               // if wrap spot is a hash mark end the move
               if(rows[colObj[updatedPosition[1]]['lastSpot']][updatedPosition[1]] === '#'){
                   console.log('dead end wrap')
                   reducedMoves = 1
               }
               else{
                   updatedPosition[0] = colObj[updatedPosition[1]]['lastSpot']
               }
            }
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '^'
                updatedPosition[0]-- 
            }
    
    }
    if(direction === 'down'){     

        if(down === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = 'v'
            reducedMoves = 1
             }
             else if((down === undefined || down === ' ')){
                 // wrap to top spot at row of updatedPosition[1]
                rows[updatedPosition[0]][updatedPosition[1]] = 'v'
                console.log('need to wrap down', updatedPosition[1], colObj[updatedPosition[1]], colObj[updatedPosition[1]]['firstSpot']                 )
               
                // if wrap spot is a hash mark end the move
                if(rows[colObj[updatedPosition[1]]['firstSpot']][updatedPosition[1]] === '#'){
                    console.log('dead end wrap')
                    reducedMoves = 1
                }
                else{
                    updatedPosition[0] = colObj[updatedPosition[1]]['firstSpot']
                }
             }
             // moving over . or arrow
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = 'v'
                updatedPosition[0]++ 
            }
        
        }



    console.log('updatedPosition', updatedPosition)
        reducedMoves--


   }

   
   return updatedPosition
}

// need to make object for column first and last, and need to check if first and last are hashes


function printGrid(grid){
    for(const row of grid){
        console.log(row.reduce( (acc, cur) =>  acc + cur, ''))
    }
}

function printCols(grid){

    for(const row of grid){
        
        for(let i =0; i < row.length; i++){
            let display = i
            if(i >= 12){
                display = display % 12
            }
            console.log(display, row[i])
            
        }
        
       // console.log(row.reduce( (acc, cur) =>  acc + cur, ''))
    }
}

console.log('rows[0][7]', rows[0][7])
console.log('rows[0][8]', rows[0][8])
console.log('rows[0][9]', rows[0][9])
console.log('rows[0][10]', rows[0][10])
console.log('rows[0][11]', rows[0][11])
console.log('rows[0][12]', rows[0][12])


function checkMoves(position){

    let y = position[0]
    let x = position[1]

    left = rows[y][x - 1]
    right = rows[y][x + 1]
    up = rows?.[y-1]?.[x]
    down = rows?.[y+1]?.[x]

    console.log('left: ', left)
    console.log('right: ', right)
    console.log('up: ',up)
    console.log('down: ', down)

    return left, right, up, down
}

function updateDirection(direction, directionAfter){
    console.log('direction directionAfter: ', direction, directionAfter, typeof direction,typeof directionAfter)
    let returnDirection

    if(direction === 'right' && directionAfter === 'R'){ returnDirection = 'down'  }
    if(direction === 'right' && directionAfter === 'L'){ returnDirection = 'up'  }
    if(direction === 'left' && directionAfter === 'R'){ returnDirection = 'up'  }
    if(direction === 'left' && directionAfter === 'L'){ returnDirection = 'down'  }
    if(direction === 'down' && directionAfter === 'R'){ returnDirection = 'left'  }
    if(direction === 'down' && directionAfter === 'L'){ returnDirection = 'right'   }
    if(direction === 'up' && directionAfter === 'R'){ returnDirection = 'right'  }
    if(direction === 'up' && directionAfter === 'L'){ returnDirection = 'left'  }

    return returnDirection
}

function makeCols(rows){

    cols = []

    let col = []

        
            for(let j=0; j< 151; j++){

                for(let i=0; i< rows.length; i++){

                col.push(rows[i][j])


                }

            cols.push(col)
            col = []
            }


    

console.log('cols', cols)

}