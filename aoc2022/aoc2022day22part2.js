const { ifError } = require('assert');
const fs = require('fs');
const { cursorTo } = require('readline');
let txtFile = "aocday22.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let rows =[]
let direction = 'right'
let instructionString


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

    rowObj[rowNum] = {}


        // LEFT rows
        let wrapSpot
        // cubeSide 1
        if(rowNum >= 0 && rowNum <= 49 ){
            rowObj[rowNum]['left'] = {}


            wrapSpot = [149 - rowNum, 0]
            rowObj[rowNum]['left']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['left']['direction'] = 'right'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'right')
        }
        // cubeSide 3
        if(rowNum >= 50 && rowNum <= 99 ){
            rowObj[rowNum]['left'] = {}

            let adjustedPos = rowNum - 50

            wrapSpot = [100, 0 + adjustedPos]
            rowObj[rowNum]['left']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['left']['direction'] = 'down'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'down')
        }
        // cubeSide 4
        if(rowNum >= 100 && rowNum <= 149 ){
            rowObj[rowNum]['left'] = {}
            let adjustedPos = rowNum - 100

            wrapSpot = [49 - adjustedPos, 50]
            rowObj[rowNum]['left']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['left']['direction'] = 'right'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'right')
        }
        // cubeSide 6
        if(rowNum >= 150 && rowNum <= 199 ){
            rowObj[rowNum]['left'] = {}
            let adjustedPos = rowNum - 150

            wrapSpot = [0 , 50 +  adjustedPos]
            rowObj[rowNum]['left']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['left']['direction'] = 'down'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'down')
        }

        // RIGHT rows
        // cubeSide 2
        if(rowNum >= 0 && rowNum <= 49 ){
            rowObj[rowNum]['right'] = {}

            wrapSpot = [149 - rowNum, 99]
            rowObj[rowNum]['right']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['right']['direction'] = 'left'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'left')
        }
        // cubeSide 3
        if(rowNum >= 50 && rowNum <= 99 ){
            rowObj[rowNum]['right'] = {}

            let adjustedPos = rowNum - 50

            wrapSpot = [49, 100 + adjustedPos]
            rowObj[rowNum]['right']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['right']['direction'] = 'up'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'up')
        }
        // cubeSide 5
        if(rowNum >= 100 && rowNum <= 149 ){
            rowObj[rowNum]['right'] = {}
            let adjustedPos = rowNum - 100

            wrapSpot = [49 - adjustedPos, 149]
            rowObj[rowNum]['right']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['right']['direction'] = 'left'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'left')
        }
        // cubeSide 6
        if(rowNum >= 150 && rowNum <= 199 ){
            rowObj[rowNum]['right'] = {}
            let adjustedPos = rowNum - 150

            wrapSpot = [149  , 50 +  adjustedPos]
            rowObj[rowNum]['right']['wrapSpot'] = wrapSpot
            rowObj[rowNum]['right']['direction'] = 'up'
            console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'up')
        }

    rowNum++
}

console.log('row Obj', rowObj)

let colObj = {}
let colNum = 0

for(const col of cols){



        colObj[colNum] = {}



        // UP cols
                let wrapSpot
                // cubeSide 1
                if(colNum >= 50 && colNum <= 99 ){
                    colObj[colNum]['up'] = {}

                    let adjustedPos = colNum - 50
                    wrapSpot = [150 + adjustedPos,0]
                    colObj[colNum]['up']['wrapSpot'] = wrapSpot
                    colObj[colNum]['up']['direction'] = 'right'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'right')
                }
                // cubeSide 2
                if(colNum >= 100 && colNum <= 149 ){
                    colObj[colNum]['up'] = {}

                    let adjustedPos = colNum - 100

                    wrapSpot = [199, 0 + adjustedPos]
                    colObj[colNum]['up']['wrapSpot'] = wrapSpot
                    colObj[colNum]['up']['direction'] = 'up'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'up')
                }
                // cubeSide 4
                if(colNum >= 0 && colNum <= 49 ){
                    colObj[colNum]['up'] = {}

                    wrapSpot = [50 + colNum, 50]
                    colObj[colNum]['up']['wrapSpot'] = wrapSpot
                    colObj[colNum]['up']['direction'] = 'right'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'right')
                }
        // DOWN cols
                // cubeSide 6
                if(colNum >= 0 && colNum <= 49 ){
                    colObj[colNum]['down'] = {}


                    wrapSpot = [0, 100 + colNum]
                    colObj[colNum]['down']['wrapSpot'] = wrapSpot
                    colObj[colNum]['down']['direction'] = 'down'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'down')
                }
                // cubeSide 5
                if(colNum >= 50 && colNum <= 99 ){
                    colObj[colNum]['down'] = {}
                    let adjustedPos = colNum - 50

                    wrapSpot = [150 + adjustedPos, 49]
                    colObj[colNum]['down']['wrapSpot'] = wrapSpot
                    colObj[colNum]['down']['direction'] = 'left'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'left')
                }
                // cubeSide 2
                if(colNum >= 100 && colNum <= 149 ){
                    colObj[colNum]['down'] = {}

                    let adjustedPos = colNum - 100

                    wrapSpot = [50 + adjustedPos, 99]
                    colObj[colNum]['down']['wrapSpot'] = wrapSpot
                    colObj[colNum]['down']['direction'] = 'left'
                    console.log('wrapSpot', wrapSpot[0], wrapSpot[1], 'left')
                }

        


        colNum++


}


let numOfMoves = []
let directionAfter
let reducedMoves
 let position = [0,50]


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


    let returnedState = move(reducedMoves, direction, position)

    let returnedPosition = returnedState[0]
    direction = returnedState[1]

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





    // check cubeSide
    let cubeSide = checkCubeSide(updatedPosition)

    console.log('cubeSide', cubeSide)


    if(direction === 'left'){      
        if(left === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '<'
            reducedMoves = 1
             }
             else if((left === undefined || left === ' ')){
                rows[updatedPosition[0]][updatedPosition[1]] = '<'

                // if wrap spot is a hash mark end the move
                if(rows[rowObj[updatedPosition[0]]['left']['wrapSpot'][0]][rowObj[updatedPosition[0]]['left']['wrapSpot'][1]] === '#'){
                reducedMoves = 1
            }
            else{
             //   updatedPosition[1] = rowObj[updatedPosition[0]]['lastSpot']
             direction = rowObj[updatedPosition[0]]['left']['direction']
             updatedPosition = [ rowObj[updatedPosition[0]]['left']['wrapSpot'][0], rowObj[updatedPosition[0]]['left']['wrapSpot'][1]  ]
            }

             }

             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '<'
                updatedPosition[1]-- 
            }
    }
    else if(direction === 'right'){ 
        if(right === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '>'
            reducedMoves = 1
             }
             else if((right === undefined || right === ' ')){
                rows[updatedPosition[0]][updatedPosition[1]] = '>'

            // if wrap spot is a hash mark end the move
            if(rows[rowObj[updatedPosition[0]]['right']['wrapSpot'][0]][rowObj[updatedPosition[0]]['right']['wrapSpot'][1]] === '#'){
                reducedMoves = 1
            }

            else{
                direction = rowObj[updatedPosition[0]]['right']['direction']
                updatedPosition = [ rowObj[updatedPosition[0]]['right']['wrapSpot'][0], rowObj[updatedPosition[0]]['right']['wrapSpot'][1]  ]
            }
             }
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '>'
                updatedPosition[1]++ 
            }
    }
   else if(direction === 'up'){   
    console.log('puzz 3d its goin up') 
        
        if(up === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = '^'
            reducedMoves = 1
             }
             else if((up === undefined || up === ' ')){
                // wrap to top spot at row of updatedPosition[1]
               rows[updatedPosition[0]][updatedPosition[1]] = '^'
               
               // if wrap spot is a hash mark end the move
               if(rows[colObj[updatedPosition[1]]['up']['wrapSpot'][0]][colObj[updatedPosition[1]]['up']['wrapSpot'][1]] === '#'){
                   reducedMoves = 1
               }
               else{
             direction = colObj[updatedPosition[1]]['up']['direction']
             updatedPosition[0] = colObj[updatedPosition[1]]['up']['wrapSpot'][0]
             updatedPosition[1] = colObj[updatedPosition[1]]['up']['wrapSpot'][1]
            
               }
            }
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = '^'
                updatedPosition[0]-- 
            }
    
    }
    else if(direction === 'down'){     

        if(down === '#'){
            rows[updatedPosition[0]][updatedPosition[1]] = 'v'
            reducedMoves = 1
             }
             else if((down === undefined || down === ' ')){
                rows[updatedPosition[0]][updatedPosition[1]] = 'v'
                // if wrap spot is a hash mark end the move
                if(rows[colObj[updatedPosition[1]]['down']['wrapSpot'][0]][colObj[updatedPosition[1]]['down']['wrapSpot'][1]] === '#'){
                    reducedMoves = 1
                }
                else{
            direction = colObj[updatedPosition[1]]['down']['direction']
            updatedPosition[0] = colObj[updatedPosition[1]]['down']['wrapSpot'][0]
            updatedPosition[1] = colObj[updatedPosition[1]]['down']['wrapSpot'][1]

                }
             }
             // moving over . or arrow
             else {
                rows[updatedPosition[0]][updatedPosition[1]] = 'v'
                updatedPosition[0]++ 
            }
        
        }


        console.log('updatedPosition. direction', updatedPosition, direction)
        reducedMoves--


   }

   if (reducedMoves <= 1){
     return [updatedPosition, direction]
   }
}


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
    }
}

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

function checkCubeSide(position){

    let cubeSide = 0

    if(position[0] >= 0 && position[0] <= 49 && position[1] >= 50 && position[1] <= 99){
        cubeSide = 1
    }
    if(position[0] >= 0 && position[0] <= 49 && position[1] >= 100 && position[1] <= 149){
        cubeSide = 2
    }
    if(position[0] >= 50 && position[0] <= 99 && position[1] >= 50 && position[1] <= 99){
        cubeSide = 3
    }
    if(position[0] >= 100 && position[0] <= 149 && position[1] >= 0 && position[1] <= 49){
        cubeSide = 4
    }
    if(position[0] >= 100 && position[0] <= 149 && position[1] >= 50 && position[1] <= 99){
        cubeSide = 5
    }
    if(position[0] >= 150 && position[0] <= 199 && position[1] >= 0 && position[1] <= 49){
        cubeSide = 6
    }

    return cubeSide

}