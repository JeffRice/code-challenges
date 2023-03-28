const { ifError } = require('assert');
const exp = require('constants');
const fs = require('fs');
const { cursorTo } = require('readline');
let txtFile = "aocday24.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let rows =[]
let start = [0,1]


for(let i=0; i< splitter.length; i++){
  let itemSplitter = splitter[i].split('')
  rows.push(itemSplitter)
}

console.log('rows', rows)

  let rowObj = {}
  let rowNum = 0
  for(const row of rows){
  
      let firstSpot = [ rowNum , 1]
      let lastSpot =[rowNum, row.length-2 ]
    
      console.log('firstSpot, row', rowNum, firstSpot)
      console.log('lastSpot, row', rowNum, lastSpot)
  
      rowObj[rowNum] = {}
      rowObj[rowNum]['firstSpot'] = firstSpot
      rowObj[rowNum]['lastSpot'] = lastSpot  
      rowNum++
}
console.log('row Obj', rowObj)


let cols
makeCols(rows)

let colObj = {}
let colNum = 0
for(const col of cols){
    let firstSpot = [ 1 , colNum]
    let lastSpot =[col.length-2, colNum ]

    console.log('firstSpot, row', colNum, firstSpot)
    console.log('lastSpot, row', colNum, lastSpot)

    colObj[colNum] = {}
    colObj[colNum]['firstSpot'] = firstSpot
    colObj[colNum]['lastSpot'] = lastSpot
    colNum++
}

console.log('col Obj', colObj)
checkMoves([2, 3], 'stateNum')
let blizzardObj = {}
rows[start[0]][start[1]] = 'E'
let rowVals = rows.values()

printGrid(rows)
blizzardObj[0] = []
for (const value of rowVals) {
    let tempArr = []
    for(let i = 0; i < value.length; i++){
        tempArr.push(value[i]) 
  
    }
    blizzardObj[0].push(tempArr)
    tempArr = []
    console.log(value);

}
  

let multiSpots = {}
// update blizzard positions each round
let maxRound = 0
while(maxRound < 602){

    let proposedMoves = []
rowVals = rows.values()

blizzardObj[maxRound] = []
for (const value of rowVals) {

    let tempArr = []
    for(let i = 0; i < value.length; i++){
        tempArr.push(value[i]) 
    }
    blizzardObj[maxRound].push(tempArr)
    tempArr = []
    console.log(value);

}
  
console.log('printing rows. maxRound ', maxRound)
printGrid(rows)


let iter = 0

for(const row of rows){

    for(let i =0; i < row.length; i++){

        // check for multiple arrows
        if(row[i] === '2'){
         //   console.log('multi shot arrow ', rows[iter][i], iter, i )
  
            let arrows = multiSpots[iter + '_' + i]
        //    console.log('arrows', arrows)
        //    console.log('arrow0', arrows[0])
        //    console.log('arrow1', arrows[1])
            arrowMoveFunction(arrows[0][2],  iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[1][2],   iter, i, rows, proposedMoves)

        }
        // check for multiple arrows
        else if(row[i] === '3'){
          //  console.log('multi shot arrow 333', rows[iter][i], iter, i )
            
            let arrows = multiSpots[iter + '_' + i]
        //    console.log('arrows', arrows)
        //    console.log('arrow0', arrows[0])
        //    console.log('arrow1', arrows[1])
        //    console.log('arrow2', arrows[2])
            arrowMoveFunction(arrows[0][2],  iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[1][2],   iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[2][2],   iter, i, rows, proposedMoves)

        }
        else if(row[i] === '4'){
         //   console.log('multi shot arrow 444', rows[iter][i], iter, i )
            
            let arrows = multiSpots[iter + '_' + i]
        //    console.log('arrows', arrows)
        //    console.log('arrow0', arrows[0])
        //    console.log('arrow1', arrows[1])
        //    console.log('arrow2', arrows[2])
        //    console.log('arrow3', arrows[3])
            arrowMoveFunction(arrows[0][2],  iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[1][2],   iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[2][2],   iter, i, rows, proposedMoves)
            arrowMoveFunction(arrows[3][2],   iter, i, rows, proposedMoves)

        }
        else {
     //arrow move function
     arrowMoveFunction(row[i], iter, i, rows, proposedMoves)
        }


    }

    iter++
}
// console.log('proposedMoves', proposedMoves)

let moveSet = new Set()

  multiSpots = {}

for (eachMove of proposedMoves){

    let key = eachMove[0] + '_' + eachMove[1]

    if ( moveSet.has(key)){
    //    console.log('dupe, eachMove', eachMove, )
    //    console.log('filter', proposedMoves.filter(x => x[0] === eachMove[0] && x[1] === eachMove[1] ))
        multiSpots[key] = proposedMoves.filter(x => x[0] === eachMove[0] && x[1] === eachMove[1] )
        rows[eachMove[0]][eachMove[1]] = '2'

        if(proposedMoves.filter(x => x[0] === eachMove[0] && x[1] === eachMove[1] ).length === 3){
  //          console.log('hit a triple')
            rows[eachMove[0]][eachMove[1]] = '3'
        }

        if(proposedMoves.filter(x => x[0] === eachMove[0] && x[1] === eachMove[1] ).length === 4){
      //      console.log('Home Run!')
            rows[eachMove[0]][eachMove[1]] = '4'
        }
    }
    else{
        moveSet.add(key)
        rows[eachMove[0]][eachMove[1]] = eachMove[2]
    }

}
// console.log('multiSpots', multiSpots)


maxRound++
}// end while loop

// console.log('blizzardObj', blizzardObj)

// move E looking ahead 1 turn for open spaces
let expDecisions = {}
let currentPosition = start

// let goal = [5,6]
 let goal = [26,120]
let winningRound
let closestToPin = 145
let positionSets = new Set()
let queue = [[0, 1], 0]

let i = 0
while(queue.length > 0){

    let roundPossibilites = []
    let roundItem = queue.shift()
    currentPosition[0] = roundItem[0]
    currentPosition[1] = roundItem[1]
    i = queue.shift()
    console.log('OG current round grid', i, queue.length)

   
        let ydif = goal[0] - currentPosition[0] 
        let xdif =  goal[1] - currentPosition[1]
        let totalDif = ydif + xdif      
        console.log('ydif xdif totalDif', ydif, xdif, totalDif, currentPosition)
        closestToPin = Math.min(closestToPin, totalDif)
        console.log('closestToPin', closestToPin)
      
        if(totalDif - 30 > closestToPin){
            console.log('fkin skip')
            continue
        }

        if(currentPosition[0] === goal[0] && currentPosition[1] === goal[1]){
            console.log('WINNAR')
            winningRound = i
            break
        }

   checkStateMoves(currentPosition, i+1)

    if(east==='.'){   roundPossibilites.push('>')   }
    if(south==='.'){   roundPossibilites.push('v')   }
    if(north==='.'){   roundPossibilites.push('^')   }
    if(west==='.'){   roundPossibilites.push('<')   }
    if(w==='.' || currentPosition[0] === 0 && currentPosition[1] === 1){ roundPossibilites.push('w')  }

    expDecisions[i] = {}
    expDecisions[i].possibilities = roundPossibilites
    expDecisions[i].position = currentPosition 
    expDecisions[i].cp = [roundItem[0], roundItem[1]] 

    for(const eachPos of roundPossibilites){
      //  console.log('eachPos', eachPos)
        let eMove = eachPos
        let updatedExpPos = moveArrow(currentPosition, eMove) 
        let key = (i) + '' + updatedExpPos[0] + '_' + updatedExpPos[1]
        if(positionSets.has(key)){
            console.log('duplicate key')
        }
        else{
            queue.push(updatedExpPos, i+1)
        }

        positionSets.add(key)
    }
   // console.log('expDecisions[i+1] ', i, expDecisions)
}

console.log('expDecisions',  expDecisions)


function printGrid(grid){
    for(const row of grid){
         console.log(row.reduce( (acc, cur) =>  acc + cur, ''))
    }
}

function checkStateMoves(position, stateNum){

    let y = position[0]
    let x = position[1]

    north = blizzardObj[stateNum]?.[y-1]?.[x]
    south = blizzardObj[stateNum]?.[y+1]?.[x]
    west = blizzardObj[stateNum]?.[y]?.[x - 1]
    east = blizzardObj[stateNum]?.[y]?.[x + 1]
    w = blizzardObj[stateNum][y][x]

  //  console.log('w: ',w)
  //  console.log('north: ',north)
  //   console.log('south: ', south)
  //   console.log('west: ', west)
  //   console.log('east: ', east)

    return w, north, south, west, east
}

function checkMoves(position){

    let y = position[0]
    let x = position[1]

    north = rows?.[y-1]?.[x]
    south = rows?.[y+1]?.[x]
    west = rows?.[y]?.[x - 1]
    east = rows?.[y]?.[x + 1]


//     console.log('north, northwest, northeast: ',north, northwest, northeast)
//     console.log('south, southwest, southeast: ', south, southwest, southeast)
//     console.log('west, northwest, southwest: ', west, northwest, southwest)
//     console.log('east, northeast, southeast: ', east, northeast, southeast)

    return  north, south, west, east
}

function makeCols(rows){
    cols = []
    let col = []

            for(let j=0; j< rows[0].length; j++){
                for(let i=0; i< rows.length; i++){
                    col.push(rows[i][j])
                }
            cols.push(col)
            col = []
            }
// console.log('cols', cols)
}

function moveArrow(position, direction) {

    let arrowY = position[0]
    let arrowX = position[1]
    let updatedPosition

    if(direction === '>'){   updatedPosition = [ arrowY , arrowX+1]   }
    if(direction === '<'){   updatedPosition = [ arrowY , arrowX-1]   }
    if(direction === '^'){   updatedPosition = [ arrowY-1 , arrowX]   }
    if(direction === 'v'){   updatedPosition = [ arrowY+1 , arrowX]   }
    if(direction === 'w'){   updatedPosition = [ arrowY , arrowX]     }

    return updatedPosition
}

//arrow move function
function arrowMoveFunction(direction, iter, i, rows, proposedMoves){

      if(direction === '<' || direction === '>' || direction === '^' || direction === 'v'){
            checkMoves([iter, i], 1)
            //make a proposed move, then after make all movements and handle collisions
            if(direction === '<' && west != '#' || direction === '>' && east != '#' || direction === '^' && north != '#' || direction === 'v' && south != '#' ){
              // console.log('arrow ', rows[iter][i], iter, i )
               let returnedPosition = moveArrow([iter, i], direction)
             //  console.log('new arrow position ', returnedPosition[0],  returnedPosition[1],  )
               proposedMoves.push([ returnedPosition[0],  returnedPosition[1],  direction]) 
               rows[iter][i] = '.'
         }
         // wrap around if we hit a wall
         if(direction === '<' && west === '#'){   proposedMoves.push([ iter,  120,  direction]) 
            rows[iter][i] = '.'
         }
         if(direction === '>' && east === '#'){   proposedMoves.push([ iter,  1,  direction]) 
           rows[iter][i] = '.'
         }             
         if(direction === '^' && north === '#'){  proposedMoves.push([ 25,  i,  direction]) 
            rows[iter][i] = '.'
         }
         if(direction === 'v' && south === '#'){  proposedMoves.push([ 1,  i,  direction]) 
           rows[iter][i] = '.'
        }
           

       }


}
