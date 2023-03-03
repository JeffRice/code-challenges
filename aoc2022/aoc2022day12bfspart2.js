const fs = require('fs');
let txtFile = "aocday12.txt";
let str = fs.readFileSync(txtFile,'utf8');


let splitter = str.split('\n')
let columnLen = splitter.length
let rowLength = splitter[0].length

let points = []

let rows = [];
let columns = [];

reset()


 // let start = [0, 0]
 // let goal = [2, 5]
  let start = [20, 0]
  let goal = [20, 136]
let availableMoves = ['left', 'right', 'up', 'down']
let moves = []
let currentPosition = start
let currentHeight = 0
let  left, right, up, down
let decisions = {}
let positions = [ start  ]
let lowPathScore = 6400;

let availableBranches = []
let winners = 0
let totalCount = 0

let winningHistory = []

let deadEnds = []




function move(currentPosition, possibleMoves){

    let y = currentPosition[0].valueOf()
    let x = currentPosition[1].valueOf()

    if(possibleMoves[0] === 'left'){        x--     }
    if(possibleMoves[0] === 'right'){        x++     }
    if(possibleMoves[0] === 'up'){       y--     }
    if(possibleMoves[0] === 'down'){       y++     }

    let updatedPosition = [y, x]

    return  updatedPosition
}

function checkMoves(position){

    let y = position[0]
    let x = position[1]

    left = rows[y][x - 1]
    right = rows[y][x + 1]
    up = y > 0 ? rows[y - 1][x] : undefined
    down = y < rows.length - 1 ? rows[y + 1][x] : undefined

    //////console.log('left: ', left)
    //////console.log('right: ', right)
    //////console.log('up: ', up)
    //////console.log('down: ', down)
    return left, right, up, down
}

function alphabetPosition(text) {
    var chari,
        arr = [],
        alphabet = "abcdefghijklmnopqrstuvwxyz",
        i;

    for (var i = 0; i < text.length; i++){
        chari = text[i].toLowerCase();
        if (alphabet.indexOf(chari) !== -1){
            arr.push(alphabet.indexOf(chari));
        }
    }
    return arr[0];
}


function reset() {
    rows = []
    for(var i = 0; i < columnLen; i++){
    //    ////////console.log(splitter[i])
        let translatedAlpha = []
        for (var j = 0; j < rowLength; j++){
    
     //       ////////console.log(splitter[i][j])
            // special case for end and start
            if (splitter[i][j] === 'E'){
                translatedAlpha.push(25)
            }
            else if (splitter[i][j] === 'S'){
                translatedAlpha.push(0)
            }
            else{
                translatedAlpha.push(alphabetPosition(splitter[i][j]))
            }
    
     //       ////////console.log(alphabetPosition(splitter[i][j]))

            // save A spots for testing
            if (splitter[i][j] === 'a'){
                points.push([i,j])
            }
    
        }
    
        let currentLine = splitter[i].split('')
    
         rows.push(translatedAlpha)
    }
    return rows
}

function resetAlpha() {
    rows = []
    for(var i = 0; i < columnLen; i++){
    //    ////////console.log(splitter[i])
        let translatedAlpha = []
        for (var j = 0; j < rowLength; j++){
    
     //       ////////console.log(splitter[i][j])
            // special case for end and start

                translatedAlpha.push(splitter[i][j])
            
    
     //       ////////console.log(alphabetPosition(splitter[i][j]))
    
        }
    
        let currentLine = splitter[i].split('')
    
         rows.push(translatedAlpha)
    }
    return rows
}
function printGrid(positions, winningHistory, deadEnds){
    resetAlpha()

            // make function below


        // mark dead ends,
     
     //   let numberOfVisited = deadEnds.length
     //   while(numberOfVisited){
     //       numberOfVisited--
     //       rows[deadEnds[numberOfVisited][0]][deadEnds[numberOfVisited][1]] = '.'
     //   }

 

    //    //mark winningHistory
    //    if(winners){
    //        let numberOfVisited = winningHistory.length
    //       while(numberOfVisited){
    //           numberOfVisited--
    //           rows[winningHistory[numberOfVisited][0]][winningHistory[numberOfVisited][1]] = '!'
    //                             }
    //    }


        ////console.log(positions)
        // mark visited spots
      let numberOfVisited = positions.length
      while(numberOfVisited){
          numberOfVisited--
          rows[positions[numberOfVisited][0]][positions[numberOfVisited][1]] = '!'
      } 



// ////console.log(rows)
      console.log('grid print')
    for(var x = 0; x < rows.length; x++){
        let rowStr = rows[x].join('')
        
            console.log(rowStr)
    }
reset()
}

//////console.log(positionHistory)
//console.log(winningHistory[0])


// var uniq = [...new Set(winningHistory)]
// console.log(uniq)
//////console.log(lowPathScore)
// printGrid(positions)
// for(var tester = 0; tester < uniq.length; tester++){
//     //console.log(uniq[tester])
//     let point = uniq[tester]
//     console.log(rows[point[0]][point[1]])
// 
// }


// JavaScript program to find the shortest
// path between a given source cell
// to a destination cell.

 const ROW = 41
 const COL = 159

// const ROW = 5
// const COL = 8

// To store matrix cell coordinates
class Point{
	constructor(x, y, height){
		this.x = x
		this.y = y
        this.height = height
	}
}

// A data structure for queue used in BFS
class queueNode{
	constructor(pt, dist){
		this.pt = pt // The coordinates of the cell
		this.dist = dist // Cell's distance from the source
	}
}

// Check whether given cell(row,col)
// is a valid cell or not
function isValid(row, col){
//    console.log('testing ', row, col)
	return (row >= 0) && (row < ROW) &&
				(col >= 0) && (col < COL)
}

// These arrays are used to get row and column
// numbers of 4 neighbours of a given cell
let rowNum = [-1, 0, 0, 1]
let colNum = [0, -1, 1, 0]

// Function to find the shortest path between
// a given source cell to a destination cell.
function BFS(mat, src, dest){
	
	// check source and destination cell
	// of the matrix have value 1
	//if(mat[src.x][src.y]!=0 || mat[dest.x][dest.y]!=0)
	//	return -1
	//

	let visited = new Array(ROW).fill(false).map(()=>new Array(COL).fill(false));

   // console.log('visited', visited)
	
	// Mark the source cell as visited
	visited[src.x][src.y] = true
	
	// Create a queue for BFS
	let q = []
	
	// Distance of source cell is 0
	let s = new queueNode(src,0)
	q.push(s) // Enqueue source cell
	
	// Do a BFS starting from source cell
	while(q){

		let curr = q.shift() // Dequeue the front cell


		
     //   console.log('curr', typeof curr, curr)
        if(typeof curr === 'undefined'){
            return
        }
		// If we have reached the destination cell,
		// we are done
		let pt = curr.pt
     //   console.log(' after shift height', pt.height)
		if(pt.x == dest.x && pt.y == dest.y){
        //    console.log('visited print', visited)
			return curr.dist}
		
		// Otherwise enqueue its adjacent cells
		for(let i=0;i<4;i++){
			let row = pt.x + rowNum[i]
			let col = pt.y + colNum[i]

        //    console.log('enqueuing ', row, col)

   
			
			// if adjacent cell is valid, has path
			// and not visited yet, enqueue it.
			if (isValid(row,col) && mat[row][col] <= pt.height + 1 && !visited[row][col]){
                let testHeight = mat[row][col]
              //  console.log('testHeight', testHeight)
				visited[row][col] = true
				let Adjcell = new queueNode(new Point(row,col, testHeight),
									curr.dist+1)
				q.push(Adjcell)
			}
		}
	}
	// Return -1 if destination cannot be reached
	return -1
}

// Driver code
function main(startCoords){
	/*
let mat = [[ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
		   [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ],
		   [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
		   [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
		   [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
		   [ 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
		   [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
		   [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
		   [ 1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ]]
           */
let mat = rows
	
 let source = new Point(startCoords[0], startCoords[1], 0)
 let dest = new Point(20, 136, 25)

// console.log('mat test', mat[20][0], mat[20][136])

// let source = new Point(0, 0, 0)
// let dest = new Point(2, 5, 27)

let dist = BFS(mat,source,dest)

console.log(mat,source,dest)
	
if(dist!=-1){
	console.log("Shortest Path is",dist,"</br>")
    return dist
}
else
console.log("Shortest Path doesn't exist","</br>")
}
// main([20, 0])
let test1 = main([20, 0])
console.log(test1)


// try something like
// create list of squares marked a, try all of them and choose shortest distance's position

//main(source, dest)
console.log(points)
let lowPoint = 504
for(var p = 0; p < points.length; p++){
 //   console.log()
 let currentTest = main(points[p])
 console.log('currentTest', currentTest)
    if(currentTest < lowPoint){
        lowPoint = currentTest
    }

}
console.log(lowPoint)