const fs = require('fs');
let txtFile = "aocday14.txt";
let str = fs.readFileSync(txtFile,'utf8');


let splitter = str.split('\n')


let markedSpots = []

for(var i = 0; i < splitter.length; i++){
    let points = splitter[i].split(' -> ')

    console.log(points)


     drawLine(points)
 
}



function drawLine(points){

    console.log('points',points)

    for(var i = 0; i<points.length; i++){

            if(points[i + 1]){
                let startPoint = points[i]
                let finishPoint = points[i + 1]

                let startCoords = startPoint.split(',').map(x => Number(x))
                let finishCoords = finishPoint.split(',').map(x => Number(x))
                console.log('coords',startCoords, finishCoords)

                //connect the points
                let xDif = startCoords[0] - finishCoords[0]
                let yDif = startCoords[1] - finishCoords[1]

                // include start and end points
                markedSpots.push([startCoords[0], startCoords[1]])
                markedSpots.push([finishCoords[0], finishCoords[1]])

                if(xDif != 0){
                    // fill all points between with a #
                    if(xDif > 0){

                        while(xDif){
                           let newMark = [startCoords[0]--, startCoords[1]]
                           console.log(newMark)
                           markedSpots.push(newMark)
                            xDif--
                        }


                    }
                    if(xDif < 0){
                        while(xDif){
                            let newMark = [startCoords[0]++, startCoords[1]]
                            console.log(newMark)
                            markedSpots.push(newMark)
                            xDif++
                        }
                    }


                }
                if(yDif != 0){
                    // fill all points between with a #
                    if(yDif > 0){

                        while(yDif){
                           let newMark = [startCoords[0], startCoords[1]--]
                           console.log(newMark)
                           markedSpots.push(newMark)
                           yDif--
                        }


                    }
                    if(yDif < 0){
                        while(yDif){
                            let newMark = [startCoords[0], startCoords[1]++]
                            console.log(newMark)
                            markedSpots.push(newMark)
                            yDif++
                        }
                    }
                }


            }

            else{
                // last point in line

            }
    }


}

console.log(markedSpots)
let abyss = 0
for(var i = 0; i < markedSpots.length; i++){
    let x = markedSpots[i][0]
    let y = markedSpots[i][1]
    console.log(x, y)
    abyss = Math.max(abyss, y)
    
}
console.log('abyss', abyss)

let floor = [ '0,163', '799,163' ]

 drawLine(floor)

let numOfColummns = 800
let numOfRows = 200

let rows = [];
let sandCount = 0
let start = [500, 0]

function reset() {
    rows = []
    for(var i = 0; i < numOfRows; i++){
        let translatedAlpha = []
        for (var j = 0; j < numOfColummns; j++){
            // special case for end and start
                translatedAlpha.push('.')    
        }
        
         rows.push(translatedAlpha)
    }
    printGrid(rows)
    return rows
}

function printGrid(rows){
    console.log('current grid state')
    for(var i = 0; i < numOfRows; i++){
        console.log(rows[i].reduce( (acc, curr) => acc + curr,  i))
    }
}



reset()



// loop through marked spots
for(var j = 0; j < markedSpots.length;j++){
    let y = markedSpots[j][0]
    let x = markedSpots[j][1]
  //  console.log(x, y)
  //  console.log(rows[x][y])
    rows[x][y] = '#'
}
printGrid(rows)



function dropSand(rows, position, abyss){

    let moving = true
    while(moving != false && rows[0][500] != 'O'){
    //check moves
    checkMoves(position)
  //  console.log('down, downLeft, downRight', down, downLeft, downRight)

    //down one step if possible
    if(down === '.'){
        let updatedPosition = move(position, 'down')
        console.log(updatedPosition)
        position = updatedPosition
    }
    // one step down and to the left if possible
    else if(downLeft === '.'){
        position = move(position, 'downLeft')
    }
    // one step down and to the right if possible
    else if(downRight === '.'){
        position = move(position, 'downRight')
    }
    //rest and start next drop
    else {
        let x = position[0]
        let y = position[1]
        rows[y][x] = 'O'
        moving = false
    }
}

    if(rows[0][500] === 'O'){
        console.log('stop *')
        return 'stop'
    }

    sandCount++
   // printGrid(rows)
    console.log('sandCount', sandCount)
    return position
}

let returnPos = dropSand(rows, start, abyss)
console.log(returnPos)

while(returnPos != 'stop'){
    returnPos = dropSand(rows, start, abyss)
}
console.log(sandCount)

function move(position, move){

    let x = position[0].valueOf()
    let y = position[1].valueOf()

    if(move === 'down'){       y++     }
    if(move === 'downLeft'){       y++;x--     }
    if(move === 'downRight'){      y++;x++    }

    let updatedPosition = [x, y]

    return  updatedPosition
}

function checkMoves(position){

  //  console.log('position', position)

    let x = position[0]
    let y = position[1]

    down = y < rows.length - 1 ? rows[y + 1][x] : undefined
    downLeft = y < rows.length - 1 ? rows[y + 1][x - 1] : undefined
    downRight = y < rows.length - 1 ? rows[y + 1][x + 1] : undefined

    return down, downLeft, downRight
}


printGrid(rows)