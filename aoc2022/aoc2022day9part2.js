const fs = require('fs');
let txtFile = "aocday9.txt";
let str = fs.readFileSync(txtFile,'utf8');
let splitter = str.split('\n')
let len = splitter.length

let directionValues = {R: [], U: []}
let maxLength = 0
let maxX = 0
let maxY = 0
let tailHistory = []

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
    handleLine(currentLine)
}

function handleLine(line) {  // build a grid based on max values in each direction
    let direction = line[0]
    let moves = line[1]

    if (direction === 'R'){
        directionValues.R.push(Number(moves))
    }
    if (direction === 'L'){
        directionValues.R.push(-Number(moves))
    }
    if (direction === 'U'){
        directionValues.U.push(Number(moves))
    }
    if (direction === 'D'){
        directionValues.U.push(-Number(moves))
    }

   maxX = Math.max(maxX, directionValues.R.reduce( (accumulator, currentValue) => accumulator + currentValue, 0))
   maxY = Math.max(maxY, directionValues.U.reduce( (accumulator, currentValue) => accumulator + currentValue, 0))
   maxLength = Math.max(maxX, maxY)
}

let grid = []

for(var i = 0; i < maxLength + 1; i ++){
    let row = []
    for(var z = 0; z < maxLength + 1; z ++){
        row.push('.')
    }
    grid.push(row)
}

let headPosition = [maxY, 0]
let tailPosition = [maxY, 0]

let tailLength = 8


let ropePositions = [headPosition, tailPosition]

for(var i = 0; i < tailLength; i ++){
    ropePositions.push([maxY, 0])
}

grid[4][0] = 'H'

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
     moveRope(currentLine, headPosition, tailPosition, ropePositions, tailHistory)
}

function moveRope(line, headPosition, tailPosition, ropePositions, tailHistory) {
    let direction = line[0]
    let moves = line[1]
    grid[headPosition[0]][headPosition[1]] = '.'

    if (direction === 'R'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[1]++
            moves--
            grid[tailPosition[0]][tailPosition[1]] = '1'
            grid[headPosition[0]][headPosition[1]] = 'H'
             // console.log(grid)

              // check for and handle diagonal case
              let currentDistance = checkDistance(headPosition, tailPosition)
              if ( Math.abs(currentDistance[1]) > 1 &&  Math.abs(currentDistance[0]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0] = headPosition[0]
            }
            if ( Math.abs(currentDistance[1]) > 1){
                 // console.log('out of bounds, move the tail. along x axis x: ',  Math.abs(currentDistance[1]) )
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1]++
                grid[tailPosition[0]][tailPosition[1]] = '1'
            }

            updateTail(ropePositions, tailHistory)

        }
    }

    if (direction === 'L'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[1]--
            moves--
            grid[tailPosition[0]][tailPosition[1]] = '1'
            grid[headPosition[0]][headPosition[1]] = 'H'
             // console.log(grid)


            let currentDistance = checkDistance(headPosition, tailPosition) // check for and handle diagonal case
            if ( Math.abs(currentDistance[1]) > 1 &&  Math.abs(currentDistance[0]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0] = headPosition[0]
                 // console.log('corrected for diagonal')

            }

            if ( Math.abs(currentDistance[1]) > 1){
                 // console.log('out of bounds, move the tail. along x axis x: ',  Math.abs(currentDistance[1]) )
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1]--
                grid[tailPosition[0]][tailPosition[1]] = '1'
            }
            updateTail(ropePositions, tailHistory)
        }

    }
    if (direction === 'U'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[0]--
            moves--
            grid[tailPosition[0]][tailPosition[1]] = '1'
            grid[headPosition[0]][headPosition[1]] = 'H'
             // console.log(grid)

            let currentDistance = checkDistance(headPosition, tailPosition)// check for and handle diagonal case
            if ( Math.abs(currentDistance[0]) > 1 &&  Math.abs(currentDistance[1]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1] = headPosition[1]
                 // console.log('corrected for diagonal')

            }
            if ( Math.abs(currentDistance[0]) > 1){
                 // console.log('out of bounds, move the tail. along y axis y: ',  Math.abs(currentDistance[0]) )
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0]--
                grid[tailPosition[0]][tailPosition[1]] = '1'
            }
            updateTail(ropePositions, tailHistory)
        }
    }
    if (direction === 'D'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[0]++
            moves--
            grid[tailPosition[0]][tailPosition[1]] = '1'
            grid[headPosition[0]][headPosition[1]] = 'H'

                        let currentDistance = checkDistance(headPosition, tailPosition)// check for and handle diagonal case
                        if ( Math.abs(currentDistance[0]) > 1 &&  Math.abs(currentDistance[1]) > 0){
                            grid[tailPosition[0]][tailPosition[1]] = '.'
                            tailPosition[1] = headPosition[1]
                        }
                        if ( Math.abs(currentDistance[0]) > 1){
                             // console.log('out of bounds, move the tail. along y axis y: ',  Math.abs(currentDistance[0]) )
                            grid[tailPosition[0]][tailPosition[1]] = '.'
                            tailPosition[0]++
                            grid[tailPosition[0]][tailPosition[1]] = '1'
                        }
                        updateTail(ropePositions, tailHistory)
        }
    }
    //
    grid[tailPosition[0]][tailPosition[1]] = '1'
    grid[headPosition[0]][headPosition[1]] = 'H'
    return headPosition;
}

function checkDistance(pointA, pointB) {
   let yDistance = pointA[0] - pointB[0]
   let xDistance = pointA[1] - pointB[1]
   return [yDistance, xDistance]
}

function updateTail(ropePositions, tailHistory){
// take the distance returned and determine what movements to make
for(var j = 2; j < ropePositions.length; j++){
    let currentTailDistance = checkDistance(ropePositions[j], ropePositions[j-1])

    //needs to be moved to the right
    if ( currentTailDistance[1] < -1){
        // console.log(String(j), 'needs to be moved to the right')
        // console.log(grid)
        //check for diagonal up
        if ( currentTailDistance[1] < -1 && currentTailDistance[0] > 0 ){ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][0]-- 
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }

        //check for diagonal down
        if ( currentTailDistance[1] < -1 && currentTailDistance[0] < 0 ){ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][0]++ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }
 
        grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
        ropePositions[j][1]++
        grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
        // console.log('updated secondary tail positions on the grid, moved right')
        // console.log('moved right done', grid)
      }

          //needs to be moved to the left
    else if ( currentTailDistance[1] > 1){
        // console.log(String(j), 'needs to be moved to the left')
        // console.log(grid)
        //check for diagonal up
        if ( currentTailDistance[1]  > 1 && currentTailDistance[0] > 0 ){ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][0]-- 
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }
        //check for diagonal down
        if ( currentTailDistance[1]  > 1 && currentTailDistance[0] < 0 ){ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][0]++ 
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }
 
        grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
        ropePositions[j][1]--
        grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
        // console.log('updated secondary tail positions on the grid, moved right')
        // console.log('moved right done', grid)
      }

          //needs to be moved  up
          else if ( currentTailDistance[0] > 1 ){
            // console.log('needs to be moved  up')
            // console.log('currentTailDistance')
            
            //check for diagonal right
            if ( currentTailDistance[0] > 1 && currentTailDistance[1] < 0) { 
                // console.log('tail diag right')
                grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
                ropePositions[j][1]++
                grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
    
                 }
            //check for diagonal left
            if ( currentTailDistance[0] > 1 && currentTailDistance[1] > 0) { 
                // console.log('tail diag left')
                grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
                ropePositions[j][1]--
                grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
                 }

            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][0]--
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
            // console.log('updated secondary tail positions on the grid, moved up')
            // console.log(grid)
          }

              //needs to be moved  down
      else if ( currentTailDistance[0] < -1 ){
        // console.log('needs to be moved  down')

        //check for diagonal right
        if ( currentTailDistance[0] < -1 && currentTailDistance[1] < 0) { 
            // console.log('tail diag right')
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][1]++
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }
        //check for diagonal left
        if ( currentTailDistance[0] < -1 && currentTailDistance[1] > 0) { 
            // console.log('tail diag left')
            grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
            ropePositions[j][1]--
            grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
             }
 
        grid[ropePositions[j][0]][ropePositions[j][1]] = '.'
        ropePositions[j][0]++
        grid[ropePositions[j][0]][ropePositions[j][1]] = String(j)
        // console.log('updated secondary tail positions on the grid, moved down')
        // console.log(grid)
      }

     grid[ropePositions[j][0]][ropePositions[j][1]] = String(j) // update grid visual
     if(j===ropePositions.length - 1){ tailHistory.push([ropePositions[j][0], ropePositions[j][1]]) } // track tail
    }


}
console.log(ropePositions)
console.log(tailHistory)
let s = new Set()
let f = tailHistory.filter(item => {
   let key = item[0] + '_' +item[1]  // join elements 1 and 2 with _
   return !s.has(key) && s.add(key)  // add to set and return true if it's not already there
})
 console.log(s)