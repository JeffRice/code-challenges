const { ifError } = require('assert');
const fs = require('fs');
const { cursorTo } = require('readline');
let txtFile = "aocday23.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let rows =[]



for(let i=0; i< splitter.length; i++){
  // console.log('item', splitter[i])
  let itemSplitter = splitter[i].split('')
    rows.push(itemSplitter)
    // console.log('itemSplitter', itemSplitter)
}

// console.log('rows', rows)

let direction = ['n', 's', 'w', 'e']

let numOfRounds = 10


let cols
makeCols(rows)
// console.log('rows printed')
printGrid(rows)
checkMoves([2, 3])


let elfObj = {}





let iter = 0
let elves = 0
for(const row of rows){

    for(let i =0; i < row.length; i++){

 
        // console.log(' spot', row[i])
        if(row[i] === '#'){

            let elfID = elves
            elves++
            // console.log('hash ', rows[iter][i] )
            elfObj[elfID] = {}
            elfObj[elfID].location = [iter, i]
        }

    }

    iter++


}
// console.log('elfObj', elfObj)

let roundCount = 0
let returnedMoves = round(direction)
roundCount++
while(returnedMoves){

    returnedMoves = round(direction)
    roundCount++
     console.log('roundCount', roundCount)

}

smallestRect(rows)
console.log('elfObj', elfObj)

function round(direction) {


    // check all elf spots and see if they will propose a move or not
    iter = 0
    let elves = 0
    let proposedMovesSet = new Set()
    for(const row of rows){
        for(let i =0; i < row.length; i++){
         //   // console.log(' spot', row[i])
            if(row[i] === '#'){
                // console.log('hash ', iter, i,  rows[iter][i] )

                let elfID = elves
                elves++
                elfObj[elfID] = {}
                elfObj[elfID].location = [iter, i]
                checkMoves([iter, i])
                // console.log('elfObj', elfObj)

                // check if everything is empty, then do nothing
                if (north === '.' && northwest === '.'  && northeast === '.' && south === '.' && southwest === '.'  && southeast === '.' && east === '.' && west === '.'){
                    // console.log('all clear')
                    elfObj[elfID].proposedMove = [iter, i]
                    continue
                }


                if(direction[0] === 'n'){

                    if (north === '.' && northwest === '.'  && northeast === '.'){
                        elfObj[elfID].proposedMove = [iter -1, i]
                        continue
                    }
                    if (south === '.' && southwest === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter +1, i]
                        continue
                    }
                    if (west === '.' && northwest === '.'  && southwest === '.'){
                        elfObj[elfID].proposedMove = [iter, i-1]
                        continue
                    }
                    if (east === '.' && northeast === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter, i+1]
                        continue
                    }

                }

                if(direction[0] === 's'){

                    if (south === '.' && southwest === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter +1, i]
                        continue
                    }
                    if (west === '.' && northwest === '.'  && southwest === '.'){
                        elfObj[elfID].proposedMove = [iter, i-1]
                        continue
                    }
                    if (east === '.' && northeast === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter, i+1]
                        continue
                    }
                    if (north === '.' && northwest === '.'  && northeast === '.'){
                        elfObj[elfID].proposedMove = [iter -1, i]
                        continue
                    }
                    
                }

                if(direction[0] === 'w'){

                    if (west === '.' && northwest === '.'  && southwest === '.'){
                        elfObj[elfID].proposedMove = [iter, i-1]
                        continue
                    }
                    if (east === '.' && northeast === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter, i+1]
                        continue
                    }
                    if (north === '.' && northwest === '.'  && northeast === '.'){
                        elfObj[elfID].proposedMove = [iter -1, i]
                        continue
                    }
                    if (south === '.' && southwest === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter +1, i]
                        continue
                    }
    
                    
                }


                if(direction[0] === 'e'){

                    if (east === '.' && northeast === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter, i+1]
                        continue
                    }
                    if (north === '.' && northwest === '.'  && northeast === '.'){
                        elfObj[elfID].proposedMove = [iter -1, i]
                        continue
                    }
                    if (south === '.' && southwest === '.'  && southeast === '.'){
                        elfObj[elfID].proposedMove = [iter +1, i]
                        continue
                    }
                    if (west === '.' && northwest === '.'  && southwest === '.'){
                        elfObj[elfID].proposedMove = [iter, i-1]
                        continue
                    }
    
    
                    
                }

                
            }
        }
    
        iter++    
    }

    // test all of the elves moving to the proposed destination if any collide they will be returned to their original spots
    // loop through the elf object once to see what duplicates exist
    let duplicates = new Set()
    for (const elf in elfObj) {

        if(elfObj[elf]['proposedMove']===undefined){
            // console.log('undefined move, ')
        }
        else{
            let key = elfObj[elf]['proposedMove'][0] + '_' + elfObj[elf]['proposedMove'][1]

            if ( proposedMovesSet.has(key)){
           //     // console.log('dupe', key);
                duplicates.add(key)
            }
            proposedMovesSet.add(key)
        }

      }


    // redraw the rows with updated positions
   // printGrid(rows)
    // console.log('reset rows')
    iter = 0
    for(const row of rows){
        for(let i =0; i < row.length; i++){
            rows[iter][i] = '.'
        }
        iter++
    }


    let numberOfMoves = 0
      // loop through elves again and move only if their spot is not duplicated
      for (const elf in elfObj) {

        if(elfObj[elf]['proposedMove']===undefined){
            // console.log('undefined move, ')
            rows[ elfObj[elf]['location'][0]][elfObj[elf]['location'][1]] = '#'
        }
        else{

            let key = elfObj[elf]['proposedMove'][0] + '_' + elfObj[elf]['proposedMove'][1]
            if ( duplicates.has(key)){
                // console.log('dupe', key);
                rows[ elfObj[elf]['location'][0]][elfObj[elf]['location'][1]] = '#'
            }   
            else{
                // check if location is already at the proposed spot
                if(elfObj[elf]['location'][0] === elfObj[elf]['proposedMove'][0] &&  elfObj[elf]['location'][1] === elfObj[elf]['proposedMove'][1]){

                    rows[ elfObj[elf]['location'][0]][elfObj[elf]['location'][1]] = '#'
                }
                else{
                    numberOfMoves++
                    elfObj[elf]['location'][0] = elfObj[elf]['proposedMove'][0]
                    elfObj[elf]['location'][1] = elfObj[elf]['proposedMove'][1]
        
                    rows[ elfObj[elf]['location'][0]][elfObj[elf]['location'][1]] = '#'
                }

  
            }


        }



      }


       console.log('number of moves', numberOfMoves)
    // cycle through the directions and run again or until no moves proposed
                firstDirection = direction.shift()
                direction.push(firstDirection)
                // console.log('new directions', direction)
               // elfObj = {}
               // printGrid(rows)

      return numberOfMoves

}



function printGrid(grid){
    for(const row of grid){
         console.log(row.reduce( (acc, cur) =>  acc + cur, ''))
    }
}


function checkMoves(position){

    let y = position[0]
    let x = position[1]

    north = rows?.[y-1]?.[x]

    south = rows?.[y+1]?.[x]

    west = rows?.[y]?.[x - 1]
    northwest = rows?.[y - 1]?.[x - 1]
    southwest = rows?.[y + 1]?.[x - 1]

    east = rows?.[y]?.[x + 1]
    northeast = rows?.[y - 1]?.[x + 1]
    southeast = rows?.[y + 1]?.[x + 1]

    // console.log('north, northwest, northeast: ',north, northwest, northeast)
    // console.log('south, southwest, southeast: ', south, southwest, southeast)
    // console.log('west, northwest, southwest: ', west, northwest, southwest)
    // console.log('east, northeast, southeast: ', east, northeast, southeast)

    return  north, northwest,  northeast, south, southwest, southeast, west, east
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

function smallestRect(rows){

    let minX = rows[0].length
    let minY = rows.length
    let maxX = 0 
    let maxY = 0
    // check all elf spots and see if they will propose a move or not
    iter = 0
    for(const row of rows){
        for(let i =0; i < row.length; i++){
            if(row[i] === '#'){
                // console.log('hash xy', iter, i)
                minX = Math.min(minX, i)
                minY = Math.min(minY, iter)
                maxX = Math.max(maxX, i)
                maxY = Math.max(maxY, iter)

            }
        }

        iter++
    }
    // console.log('minX minY maxX maxY', minX, minY, maxX, maxY)

 
    for(let j = minY; j <= maxY; j++){
        for(let i =minX; i <= maxX; i++){
             console.log('inner rect', rows[j][i])
        }
    }

    printGrid(rows)


}