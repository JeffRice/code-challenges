const fs = require('fs');
let txtFile = "aocday17.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('')

let rocks = []
rocks = refillRocks(rocks)
let floor = ['-','-','-','-','-','-','-','-','-']

let jetDirections = []
for(var i = 0; i < splitter.length; i++){
    jetDirections.push(splitter[i])
}

let rows = []
rows.push(floor)
rows.push(['-','.','.','.','.','.','.','.','-'])
rows.push(['-','.','.','.','.','.','.','.','-'])
rows.push(['-','.','.','.','.','.','.','.','-'])

// console.log(rows)
 printGrid(rows)

 console.log(rows[rows.length - 1][1])
 console.log(rows[0][1])

 rows.push(rocks[0][0])
// let firstRock = rocks.shift()
let rockNumber = 0
let directionNumber = 0
let stateObj = {}

 function dropRock(rows){
   // get jet direction
   let currentDirection = jetDirections[directionNumber]
   directionNumber++

   if(directionNumber > jetDirections.length - 1){
    directionNumber = 0
   }

    let allRowsRight = true
    let allRowsLeft = true
    let allDown = true
    let rockBottom = rows.length
   // check if every level can move in the jet direction
      for(var i = 0; i < rows.length; i++){
        let maxX = 0
        let minX = 10

        for(var j = 0; j < rows[i].length; j++){
            if(rows[i][j] === '@'){
            //  console.log('rows[i][j]', i, j, rows[i][j])
              maxX = Math.max(maxX, j)
              minX = Math.min(minX, j)
              rockBottom = Math.min(rockBottom, i)      
             }
       }

       if(maxX > 0){
        //console.log(' CHECKING FOR RIGHT maxX', maxX)
       // console.log('rows[i][j], i, maxX', i, maxX)
           let availableMoves =  checkMoves(  [i, maxX]  )
        //   console.log('down, right, left', down, right, left)

           if(right !== '.'){
            allRowsRight = false
            }
       }

       if(minX < 10){
      //  console.log('CHECKING FOR LEFT rows[i][j], i, minX', i, minX)
        let availableMoves =  checkMoves(  [i, minX]  )
        //   console.log('down, right, left', down, right, left)

           if(left !== '.'){
            allRowsLeft = false
            }
       }

    }// end rows loop   
    
    if(currentDirection === '>'){
        if(allRowsRight === true){
        //    console.log('can move Right')
            move('right')
        }
        else{
        //    console.log('cannot move Right')
        }
    }

    if(currentDirection === '<'){
        if(allRowsLeft === true){
        //    console.log('can move Left')
            move('left')
        }
        else{
        //    console.log('cannot move Left')
        }
    }

        // check down direction
        for(var i = 0; i < rows.length; i++){
            for(var j = 0; j < rows[i].length; j++){
                if(rows[i][j] === '@'){
                    let availableMoves = checkMoves(  [i, j]  )
                 //   console.log('just down', down)
    
                    if(down === '-' || down === '#'){
                        allDown = false
                        }
    
                }
            }
        }

    if(allDown === true){
      //  console.log('can move Down')
        move('down')
    }
    else{
      //  console.log('cannot move Down')
    }
     return allDown
   
 }

function checkMoves(position){
   // console.log('position', position)

    let x = position[1]
    let y = position[0]

     down = y < rows.length ? rows[y - 1][x] : undefined
     right = rows[y][x + 1]
     left = rows[y][x - 1]

    return down, right, left
}

function move(direction){

    if(direction === 'right'){
     //   console.log('moving right')
        for(var i = 0; i < rows.length; i++){
            for(var j = rows[0].length; j > 0; j--){
                if(rows[i][j] === '@'){
            //        console.log('rows[i][j] moving right', i, j)
                    rows[i][j] = '.'
                    rows[i][j+1] = '@'
                }
            }
        }
    }

    if(direction === 'left'){
       // console.log('moving left')
        for(var i = 0; i < rows.length; i++){
            for(var j = 0; j < rows[0].length; j++){
                if(rows[i][j] === '@'){
           //         console.log('rows[i][j] moving left', i, j)
                    rows[i][j] = '.'
                    rows[i][j-1] = '@'
                }
            }
        }
    }


    if(direction === 'down'){
      //  console.log('moving down')

        for(var i = 0; i < rows.length; i++){
            for(var j = 0; j < rows[0].length; j++){
                if(rows[i][j] === '@'){
           //         console.log('rows[i][j] moving Down', i, j)
                    rows[i][j] = '.'
                    rows[i-1][j] = '@'
           //         printGrid(rows)
                }
            }
        }
    }

}


let numOfRocks = 0
let continueDown = dropRock(rows)
numOfRocks++
let additionalHeight = 0
while(continueDown){
    continueDown = dropRock(rows)

    if(continueDown === false){

        // 1181 is the number of additional rocks needed to reach 1000000000000 after running through the cyles
        // 574712643×1740 = 999999998820, 1000000000000 - 999999998820 = 1180, + 1
        if(numOfRocks === 1181){
            console.log('check 1181')
            checkEmptyRows(rows)
            additionalHeight = checkHeight(rows)
            console.log('additionalHeight', additionalHeight)

        }
        if(numOfRocks > 5500){
        //    printGrid(rows)
            checkEmptyRows(rows)
            // 2666 is the repeating difference in height for each cycle, 574712643 is how many cycles can be run to reach 1000000000000
            let bigNumber = 574712643 * 2666
            console.log(bigNumber)
            console.log('final answer: ', bigNumber + additionalHeight)
            let testNumber = 28571428571 * 53
            console.log('testNumber', testNumber + 25)
            return
        }
        changeRocks(rows)
     //  change rock to ## then drop new rock

        let emptyRows = checkEmptyRows(rows)                                           
        while(emptyRows > 3){
        //    console.log('top row', rows[rows.length - 1])
            rows.pop()
            emptyRows--
        }

        while(emptyRows < 3){
        //    console.log('push row')
            rows.push(['-','.','.','.','.','.','.','.','-'])
            emptyRows++
        }

        rockNumber++
        if(rockNumber > 4){
            rockNumber = 0
            rocks = []
            rocks = refillRocks(rocks)
        }

        for(var i = rocks[rockNumber].length; i > 0; i--){
            rows.push(rocks[rockNumber][i-1])
        }

        numOfRocks++

       // saving state info for comparison to find a repeating pattern
       let stateCombo = '' + rockNumber + ',' + directionNumber
       // console.log(stateCombo)
       let height = checkHeight(rows)

    if(!stateObj[stateCombo]){
      stateObj[stateCombo] = {}
      stateObj[stateCombo].height = height
      stateObj[stateCombo].rocks = numOfRocks
    }
    else{
        console.log('repeat')
        checkEmptyRows(rows)
        console.log('rockNumber, directionNumber, numOfRocks', rockNumber, directionNumber, numOfRocks)
        console.log('stateCombo', stateCombo)
        console.log('state rocks', stateObj[stateCombo].rocks)
        console.log(' stateObj[stateCombo].height', stateObj[stateCombo].height)
        let testHeight = checkHeight(rows)
        console.log('difference: ', testHeight - stateObj[stateCombo].height)
    }
    //end state info 
        
    continueDown = dropRock(rows)
    } // end if continueDown is false
}

function refillRocks(rocks){
    rocks.push([['-','.','.','@','@','@','@','.','-']])

    rocks.push([['-','.','.','.','@','.','.','.','-'],
                ['-','.','.','@','@','@','.','.','-'],
                ['-','.','.','.','@','.','.','.','-']])
    
    rocks.push([['-','.','.','.','.','@','.','.','-'],
                ['-','.','.','.','.','@','.','.','-'],
                ['-','.','.','@','@','@','.','.','-']])
    
    rocks.push([['-','.','.','@','.','.','.','.','-'],
                ['-','.','.','@','.','.','.','.','-'],
                ['-','.','.','@','.','.','.','.','-'],
                ['-','.','.','@','.','.','.','.','-']])
    
    
    rocks.push([['-','.','.','@','@','.','.','.','-'],
                ['-','.','.','@','@','.','.','.','-']])

    return rocks
}

function changeRocks(rows){
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < rows[i].length; j++){
            if(rows[i][j] === '@'){
                rows[i][j] = '#'
            }
        }
    }
}

function checkEmptyRows(rows){
    let maxY = 0
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < rows[i].length; j++){
            if(rows[i][j] === '#'){
              maxY = Math.max(maxY, i)
             }
        }
    }
console.log('maxY', maxY)
    return rows.length - 1 - maxY
}

function checkHeight(rows){
    let maxY = 0
    for(var i = 0; i < rows.length; i++){
        for(var j = 0; j < rows[i].length; j++){
            if(rows[i][j] === '#'){
              maxY = Math.max(maxY, i)
             }
        }
    }
    return maxY
}

function printGrid(rows){
    console.log('current grid state')
    let numOfRows = rows.length
    while(numOfRows){
        numOfRows--
        console.log(rows[numOfRows].reduce( (acc, curr) => acc + curr,  ''))
    }
    for(var i = 0; i < rows.length; i++){
    }
}

