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
    // console.log(currentLine)

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

// console.log(directionValues)
 console.log('maxX and maxY', maxX, maxY)

let grid = []

for(var i = 0; i < maxLength + 1; i ++){
    let row = []
    for(var z = 0; z < maxLength + 1; z ++){
        row.push('.')
    }
    grid.push(row)
}

// console.log(grid)

let headPosition = [maxY, 0]
let tailPosition = [maxY, 0]

grid[4][0] = 'H'
// console.log(grid)

for(var i = 0; i < len; i++){
    let currentLine = splitter[i].split(' ')
    // console.log(currentLine)

     moveRope(currentLine, headPosition, tailPosition)

}

function moveRope(line, headPosition, tailPosition) {
    let direction = line[0]
    let moves = line[1]
    grid[headPosition[0]][headPosition[1]] = '.'

    if (direction === 'R'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[1]++
            moves--
            grid[tailPosition[0]][tailPosition[1]] = 'T'
            grid[headPosition[0]][headPosition[1]] = 'H'
             console.log(grid)

              // check for and handle diagonal case
              let currentDistance = checkDistance(headPosition, tailPosition)
              if ( Math.abs(currentDistance[1]) > 1 &&  Math.abs(currentDistance[0]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0] = headPosition[0]
                 console.log('corrected for diagonal')

            }

            // console.log('check dist', checkDistance(headPosition, tailPosition))
            if ( Math.abs(currentDistance[1]) > 1){
                 console.log('out of bounds, move the tail. along x axis x: ',  Math.abs(currentDistance[1]) )
                 console.log(tailPosition[0])
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1]++
                grid[tailPosition[0]][tailPosition[1]] = 'T'
                 console.log(grid)
                 console.log('updated tail on the grid')
                tailHistory.push([tailPosition[0], tailPosition[1]])
            }
        }
    }

    if (direction === 'L'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[1]--
            moves--
            grid[tailPosition[0]][tailPosition[1]] = 'T'
            grid[headPosition[0]][headPosition[1]] = 'H'
             console.log(grid)


            let currentDistance = checkDistance(headPosition, tailPosition)
            if ( Math.abs(currentDistance[1]) > 1 &&  Math.abs(currentDistance[0]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0] = headPosition[0]
                 console.log('corrected for diagonal')

            }

            if ( Math.abs(currentDistance[1]) > 1){
                 console.log('out of bounds, move the tail. along x axis x: ',  Math.abs(currentDistance[1]) )
                 console.log(tailPosition[0])
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1]--
                grid[tailPosition[0]][tailPosition[1]] = 'T'
                 console.log(grid)
                 console.log('updated tail on the grid')
                tailHistory.push([tailPosition[0], tailPosition[1]])
            }
        }
    }
    if (direction === 'U'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[0]--
            moves--
            grid[tailPosition[0]][tailPosition[1]] = 'T'
            grid[headPosition[0]][headPosition[1]] = 'H'
             console.log(grid)

            // diag tail
            let currentDistance = checkDistance(headPosition, tailPosition)
            if ( Math.abs(currentDistance[0]) > 1 &&  Math.abs(currentDistance[1]) > 0){
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[1] = headPosition[1]
                 console.log('corrected for diagonal')

            }
            if ( Math.abs(currentDistance[0]) > 1){
                 console.log('out of bounds, move the tail. along y axis y: ',  Math.abs(currentDistance[0]) )
                 console.log(tailPosition[0])
                grid[tailPosition[0]][tailPosition[1]] = '.'
                tailPosition[0]--
                grid[tailPosition[0]][tailPosition[1]] = 'T'
                 console.log(grid)
                 console.log('updated tail on the grid')
                tailHistory.push([tailPosition[0], tailPosition[1]])
            }

        }
    }
    if (direction === 'D'){
        while(moves){
            grid[headPosition[0]][headPosition[1]] = '.'
            headPosition[0]++
            moves--
            grid[tailPosition[0]][tailPosition[1]] = 'T'
            grid[headPosition[0]][headPosition[1]] = 'H'
             console.log(grid)

                        // diag tail
                        let currentDistance = checkDistance(headPosition, tailPosition)
                        if ( Math.abs(currentDistance[0]) > 1 &&  Math.abs(currentDistance[1]) > 0){
                            grid[tailPosition[0]][tailPosition[1]] = '.'
                            tailPosition[1] = headPosition[1]
                             console.log('corrected for diagonal')
            
                        }
                        if ( Math.abs(currentDistance[0]) > 1){
                             console.log('out of bounds, move the tail. along y axis y: ',  Math.abs(currentDistance[0]) )
                             console.log(tailPosition[0])
                            grid[tailPosition[0]][tailPosition[1]] = '.'
                            tailPosition[0]++
                            grid[tailPosition[0]][tailPosition[1]] = 'T'
                             console.log(grid)
                             console.log('updated tail on the grid')
                            tailHistory.push([tailPosition[0], tailPosition[1]])
                        }


        }
    }
    //
    grid[tailPosition[0]][tailPosition[1]] = 'T'
    grid[headPosition[0]][headPosition[1]] = 'H'
     console.log(grid)
    return headPosition;
}

function checkDistance(pointA, pointB) {
   let yDistance = pointA[0] - pointB[0]
   let xDistance = pointA[1] - pointB[1]
   return [yDistance, xDistance]
}


 console.log(tailHistory)
let s = new Set()
let f = tailHistory.filter(item => {
   let key = item[0] + '_' +item[1]  // join elements 1 and 2 with _
   return !s.has(key) && s.add(key)  // add to set and return true if it's not already there
})

console.log(s)