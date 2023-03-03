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

function checkEdges(point){

    console.log('point', point)

    let left,right,top,bottom,back,front

    left = point[0] - 1
    right = point[0] + 1
    top = point[1] - 1
    bottom = point[1] + 1
    back = point[2] - 1
    front = point[2] + 1
    
    return [left,right,top,bottom,back,front]
}