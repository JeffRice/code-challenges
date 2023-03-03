const fs = require('fs');
let txtFile = "aocday18.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let matrix1 = []
let points = {}

let maxX = 0
let maxY = 0
let maxZ = 0

let iter = 0
for(const item of splitter){
 let itemArr = item.split(',')
 itemArr = itemArr.map(x => Number(x))
 console.log(itemArr)
 console.log(iter)
 points[iter] = itemArr

 let itemX = itemArr[0]
 let itemY = itemArr[1]
 let itemZ = itemArr[2]

 maxX = Math.max(maxX, itemX)
 maxY = Math.max(maxY, itemY)
 maxZ = Math.max(maxZ, itemZ)
 iter++
} 

console.log('maxX, maxY, maxZ', maxX, maxY, maxZ)

let matrices = []
for(var i = 0; i < maxZ + 1; i++){
    let matrix = []
    for(var j = 0; j < maxY + 1; j++){
        let row = []
        for(var k = 0; k < maxX + 1; k++){
            row.push(0)
        }
        matrix.push(row)
    }
    matrices.push(matrix)
}

console.log(matrix1)
console.log(matrices)
console.log(points)

// mark occupied spaces
for(const point in points){
    console.log(points[point])
    // need to subtract 1 from each value for arr representation
    let pointX = points[point][0] 
    let pointY = points[point][1] 
    let pointZ = points[point][2] 

    console.log('transformed point for the rep: ', pointX, pointY, pointZ)
    matrices[pointZ][pointY][pointX] = 1
}
console.log(matrices[0][0][0])
console.log(matrices)


let total = 0

// check neighboring spaces
for(const point in points){
    let pointX = points[point][0] 
    let pointY = points[point][1] 
    let pointZ = points[point][2] 

   let edges = checkEdges([pointX, pointY, pointZ])
   console.log('edges', edges)

   let leftEdge, rightEdge, topEdge, bottomEdge ,backEdge, frontEdge  
   leftEdge = [edges[0], pointY, pointZ]
   rightEdge = [edges[1], pointY, pointZ]
   topEdge = [pointX, edges[2], pointZ]
   bottomEdge = [pointX, edges[3], pointZ]
   backEdge = [pointX, pointY, edges[4]]
   frontEdge = [pointX, pointY, edges[5]]

   console.log('leftEdge, rightEdge, topEdge, bottomEdge, backEdge, frontEdge', leftEdge, rightEdge, topEdge, bottomEdge, backEdge, frontEdge)


   // apply the edge coords to the matrices
   let matrixLeftEdge = matrices?.[leftEdge[2]]?.[leftEdge[1]]?.[leftEdge[0]]
   let matrixRightEdge = matrices?.[rightEdge[2]]?.[rightEdge[1]]?.[rightEdge[0]]
   let matrixTopEdge = matrices?.[topEdge[2]]?.[topEdge[1]]?.[topEdge[0]]
   let matrixBottomEdge = matrices?.[bottomEdge[2]]?.[bottomEdge[1]]?.[bottomEdge[0]]
   let matrixBackEdge = matrices?.[backEdge[2]]?.[backEdge[1]]?.[backEdge[0]]
   let matrixFrontEdge = matrices?.[frontEdge[2]]?.[frontEdge[1]]?.[frontEdge[0]]

   console.log('matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge', matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge)
 
   let allEdges = [matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge]

   for(const e of allEdges){
    if(e != 1){
        console.log('add ++')
        total++
    }
   }


}

console.log('total', total)
// track what airSpots have been visited
let globalVisited = []
for(var c = 0; c < maxZ + 1; c++){
    let matrix = []
    for(var d = 0; d < maxY + 1; d++){
        let row = []
        for(var e = 0; e < maxX + 1; e++){
            row.push(false)
        }
        matrix.push(row)
    }
    globalVisited.push(matrix)
}

// loop through all air spots
for(var i = 0; i < maxZ + 1; i++){
    
    for(var j = 0; j < maxY + 1; j++){
        
        for(var k = 0; k < maxX + 1; k++){
            console.log('matrices[i][j][k]', matrices[i][j][k], [k, j, i], globalVisited[i][j][k])

            if(matrices[i][j][k] === 0 && k > 0 && j > 0 && globalVisited[i][j][k] === false){
                console.log('airspotCheck')
                globalVisited[i][j][k] = true
                let edges = checkEdges([k, j, i])

                let leftEdge, rightEdge, topEdge, bottomEdge ,backEdge, frontEdge  
                leftEdge = [edges[0], j, i]
                rightEdge = [edges[1], j, i]
                topEdge = [k, edges[2], i]
                bottomEdge = [k, edges[3], i]
                backEdge = [k, j, edges[4]]
                frontEdge = [k, j, edges[5]]
             
                console.log('leftEdge, rightEdge, topEdge, bottomEdge, backEdge, frontEdge', leftEdge, rightEdge, topEdge, bottomEdge, backEdge, frontEdge)
                let spotEdges = [leftEdge, rightEdge, topEdge, bottomEdge, backEdge, frontEdge]
                           
                // apply the edge coords to the matrices
                let matrixLeftEdge = matrices?.[leftEdge[2]]?.[leftEdge[1]]?.[leftEdge[0]]
                let matrixRightEdge = matrices?.[rightEdge[2]]?.[rightEdge[1]]?.[rightEdge[0]]
                let matrixTopEdge = matrices?.[topEdge[2]]?.[topEdge[1]]?.[topEdge[0]]
                let matrixBottomEdge = matrices?.[bottomEdge[2]]?.[bottomEdge[1]]?.[bottomEdge[0]]
                let matrixBackEdge = matrices?.[backEdge[2]]?.[backEdge[1]]?.[backEdge[0]]
                let matrixFrontEdge = matrices?.[frontEdge[2]]?.[frontEdge[1]]?.[frontEdge[0]]
    
                console.log('matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge', matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge)
     
                let allEdges = [matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge]
                let airTotal = 0
                let connectedAirSpots = []
                let queue = []
                let reducedEdges = 0
                let totalAirSpots = 1
                let breakOut = false
                for(var z = 0; z < allEdges.length; z++){
                    if(allEdges[z] === 0){
                        airTotal++  
                        console.log('open edge index', z)
                        connectedAirSpots.push(spotEdges[z])
                        queue.push([spotEdges[z][0],spotEdges[z][1],spotEdges[z][2]])  
                        totalAirSpots++
                    }
                    if(allEdges[z] === 1){
                        reducedEdges++
                    }
                    if(allEdges[z] === undefined){
                        console.log('this is reachable by water, do not edges subtract from total')
                        breakOut = true
                        break
                    }

                   }

                   console.log('airTotal:', airTotal)

                   if(breakOut === true){
                    console.log('this was reachable by water, do not subtract from total', reducedEdges)
                    break
                   }

                   // TODO check if airTotal === 0
                   if(airTotal === 0){
                    console.log('1cube')
                   }


                   console.log('queue:', queue)
                   // track what airSpots have been visited
                    let visited = []
                    for(var c = 0; c < maxZ + 1; c++){
                        let matrix = []
                        for(var d = 0; d < maxY + 1; d++){
                            let row = []
                            for(var e = 0; e < maxX + 1; e++){
                                row.push(false)
                            }
                            matrix.push(row)
                        }
                        visited.push(matrix)
                    }

                    //mark current spot
                    visited[i][j][k] = true
                    

                    let trappedAir = true
                    let spotsChecked = []
                    spotsChecked.push([  k, j, i  ])
                     // Do a BFS starting from source cell
                    while(queue.length){
                    
                        console.log('nested queue:', queue)
                        let curr = queue.shift() // Dequeue the front cell

                        console.log('curr', curr)
                        // just to hold the spots we actually visit since we may not visit everything in the queue
                        spotsChecked.push(curr)

                        // mark connected spot visited
                        visited[curr[2]][curr[1]][curr[0]] = true

                        
                        // Otherwise enqueue its adjacent spots

                        // get the connected edges
                        let connectedEdges = checkEdges([curr[0], curr[1], curr[2]])
                        let connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge  
                        connectedleftEdge = [connectedEdges[0], curr[1], curr[2]]
                        connectedrightEdge = [connectedEdges[1], curr[1], curr[2]]
                        connectedtopEdge = [curr[0], connectedEdges[2], curr[2]]
                        connectedbottomEdge = [curr[0], connectedEdges[3], curr[2]]
                        connectedbackEdge = [curr[0], curr[1], connectedEdges[4]]
                        connectedfrontEdge = [curr[0], curr[1], connectedEdges[5]]
                        console.log('connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge', connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge)
                        
                        let connectedSpotEdges = [connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge]

                        // check the adjacent spots on the matrix
                        matrixLeftEdge = matrices?.[connectedleftEdge[2]]?.[connectedleftEdge[1]]?.[connectedleftEdge[0]]
                        matrixRightEdge = matrices?.[connectedrightEdge[2]]?.[connectedrightEdge[1]]?.[connectedrightEdge[0]]
                        matrixTopEdge = matrices?.[connectedtopEdge[2]]?.[connectedtopEdge[1]]?.[connectedtopEdge[0]]
                        matrixBottomEdge = matrices?.[connectedbottomEdge[2]]?.[connectedbottomEdge[1]]?.[connectedbottomEdge[0]]
                        matrixBackEdge = matrices?.[connectedbackEdge[2]]?.[connectedbackEdge[1]]?.[connectedbackEdge[0]]
                        matrixFrontEdge = matrices?.[connectedfrontEdge[2]]?.[connectedfrontEdge[1]]?.[connectedfrontEdge[0]]
                        console.log('connected: matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge', matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge)
         
                        allEdges = [matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge]
                        console.log('allEdges:', allEdges)

                        let breakOut = false
                        for(var zz = 0; zz < allEdges.length; zz++){
                            if(allEdges[zz] === 1){
                                reducedEdges++
                            }
                            else if(allEdges[zz] === 0 && visited[connectedSpotEdges[zz][2]][connectedSpotEdges[zz][1]][connectedSpotEdges[zz][0]] === false){
                                console.log('open edge index', zz)
                                visited[connectedSpotEdges[zz][2]][connectedSpotEdges[zz][1]][connectedSpotEdges[zz][0]] = true
                                queue.unshift([connectedSpotEdges[zz][0],connectedSpotEdges[zz][1],connectedSpotEdges[zz][2]])
                                totalAirSpots++
                            }
                            else if(allEdges[zz] === undefined){
                                console.log('undefined edge connected, this is reachable by water, do not edges subtract from total ', allEdges[zz])
                                breakOut = true
                                trappedAir = false
                                break
                            }
                            else{
                                console.log('zzz', allEdges[zz])
                            }

                           }
                           // exit loop if this reaches the edges
                           if(breakOut){
                            break
                           }

                           
                           
                    }
                    console.log('totalAirSpots', totalAirSpots)
                    console.log('this section was trapped? :', trappedAir)

                   // spotsChecked.push( [k, j, i] )

                    console.log('spotsChecked', spotsChecked)
                    console.log('reducedEdges:', reducedEdges)

                    // add the spots to the global visited spots if they are trapped so they are not revisited.
                    if(trappedAir === true){

                        let checkingReducedEdges = 0
                        for(const s of spotsChecked){
                        //    console.log('matrices spot visited', [s[2],s[1],s[0]])
                        globalVisited[s[2]][s[1]][s[0]] = true


                        let connectedEdges = checkEdges(  ([s[0], s[1], s[2]]) )
                        
                        let connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge  
                        connectedleftEdge = [connectedEdges[0], s[1], s[2]]
                        connectedrightEdge = [connectedEdges[1], s[1], s[2]]
                        connectedtopEdge = [s[0], connectedEdges[2], s[2]]
                        connectedbottomEdge = [s[0], connectedEdges[3], s[2]]
                        connectedbackEdge = [s[0], s[1], connectedEdges[4]]
                        connectedfrontEdge = [s[0], s[1], connectedEdges[5]]
                        console.log('connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge', connectedleftEdge, connectedrightEdge, connectedtopEdge, connectedbottomEdge ,connectedbackEdge, connectedfrontEdge)
                        
                        matrixLeftEdge = matrices?.[connectedleftEdge[2]]?.[connectedleftEdge[1]]?.[connectedleftEdge[0]]
                        matrixRightEdge = matrices?.[connectedrightEdge[2]]?.[connectedrightEdge[1]]?.[connectedrightEdge[0]]
                        matrixTopEdge = matrices?.[connectedtopEdge[2]]?.[connectedtopEdge[1]]?.[connectedtopEdge[0]]
                        matrixBottomEdge = matrices?.[connectedbottomEdge[2]]?.[connectedbottomEdge[1]]?.[connectedbottomEdge[0]]
                        matrixBackEdge = matrices?.[connectedbackEdge[2]]?.[connectedbackEdge[1]]?.[connectedbackEdge[0]]
                        matrixFrontEdge = matrices?.[connectedfrontEdge[2]]?.[connectedfrontEdge[1]]?.[connectedfrontEdge[0]]
                        console.log('connected: matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge', matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge)
         
                        allEdges = [matrixLeftEdge, matrixRightEdge, matrixTopEdge, matrixBottomEdge, matrixBackEdge, matrixFrontEdge]

                        for(const ee of allEdges){
                            if(ee === 1){
                                checkingReducedEdges++
                            }
                        }


                        }
                        console.log('checkingReducedEdges', checkingReducedEdges)
                        // need to subtract the sides that are trapped in the air pocket, 6 per spot minus shared edges

                    }

                    else{
                        for(const s of spotsChecked){
                            //    console.log('matrices spot visited', [s[2],s[1],s[0]])
                            globalVisited[s[2]][s[1]][s[0]] = true
                            }
                    }


            }


        }
       
    }
   
}
console.log('end')

function checkEdges(point){
   // console.log('point', point)
    let left,right,top,bottom,back,front
    left = point[0] - 1
    right = point[0] + 1
    top = point[1] - 1
    bottom = point[1] + 1
    back = point[2] - 1
    front = point[2] + 1
    return [left,right,top,bottom,back,front]
}