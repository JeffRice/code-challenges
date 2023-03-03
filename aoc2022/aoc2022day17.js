const fs = require('fs');
let txtFile = "aocday17.txt";
let str = fs.readFileSync(txtFile,'utf8');


let splitter = str.split('')

// let rock1 = '@@@@'

let rocks = []

rocks = refillRocks(rocks)

/* rocks.push([['-','.','.','@','@','@','@','.','-']])

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
 */

console.log(rocks)

console.log(rocks[0])

  let rock = ['-','.','.','@','@','@','@','.','-']

let rock2 = [['-','.','.','.','@','.','.','.','-'],
             ['-','.','.','@','@','@','.','.','-'],
             ['-','.','.','.','@','.','.','.','-']]

let rock3 = [['-','.','.','.','.','@','.','.','-'],
             ['-','.','.','.','.','@','.','.','-'],
             ['-','.','.','@','@','@','.','.','-']]

let rock4 = [['-','.','.','@','.','.','.','.','-'],
             ['-','.','.','@','.','.','.','.','-'],
             ['-','.','.','@','.','.','.','.','-'],
             ['-','.','.','@','.','.','.','.','-']]

let rock5 = [['-','.','.','@','@','.','.','.','-'],
             ['-','.','.','@','@','.','.','.','-']]

  let row = ['-','.','.','.','.','.','.','.','-']
let floor = ['-','-','-','-','-','-','-','-','-']

let jetDirections = []

for(var i = 0; i < splitter.length; i++){
    console.log(splitter[i])
    jetDirections.push(splitter[i])
}

console.log('jetDirections', jetDirections)

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
let rockNumber = 1




 function dropRock(rows){
    // printGrid(rows)

   // get jet direction
    let currentDirection = jetDirections.shift()

    jetDirections.push(currentDirection)

  //  console.log(jetDirections)



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
  //  console.log('rows[i][j], i, maxY', i, maxY)

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

   // printGrid(rows)

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

   // printGrid(rows)

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



let continueDown = dropRock(rows)
let numOfRocks = 1

while(continueDown){
    continueDown = dropRock(rows)

    if(continueDown === false){
        if(numOfRocks > 2022){
            printGrid(rows)
            checkEmptyRows(rows)
            
            return
        }
        changeRocks(rows)
     //   console.log('change rock to ## and drop new rock')
     //   printGrid(rows)


        let emptyRows = checkEmptyRows(rows)
      //  console.log('emptyRows', emptyRows)

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


        for(var i = rocks[rockNumber].length; i > 0; i--){
            rows.push(rocks[rockNumber][i-1])
        }
        rockNumber++
     //   console.log('rockNumber', rockNumber)
        if(rockNumber > 4){
            rockNumber = 0
            rocks = []
            rocks = refillRocks(rocks)
        }

     //   firstRock = rocks.shift()
        
        if(!rocks.length){
       //     console.log('refill rocks')
       //     rocks = refillRocks(rocks)
        }

        console.log('rocks', rocks)
        numOfRocks++

    //    printGrid(rows)
        continueDown = dropRock(rows)
    }
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
         //     console.log('rows[i][j]', i, j, rows[i][j])
              maxY = Math.max(maxY, i)
             }
        }
    }

console.log('maxY', maxY)
//console.log('rows length', rows.length - 1)

    return rows.length - 1 - maxY

}

function printGrid(rows){
    console.log('current grid state')
    let numOfRows = rows.length
    while(numOfRows){
        numOfRows--
        console.log(rows[numOfRows].reduce( (acc, curr) => acc + curr,  ''))
     //   console.log(rows[numOfRows])
    }
    for(var i = 0; i < rows.length; i++){
      //  console.log(rows[i])
      //  console.log(rows[i].reduce( (acc, curr) => acc + curr,  i))
    }
}



