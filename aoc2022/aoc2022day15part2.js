const fs = require('fs');
let txtFile = "aocday15.txt";
let str = fs.readFileSync(txtFile,'utf8');


let splitter = str.split('\n')


const markedSet = new Set()
const perimeterSet = new Set()


// let  markedSpots = []
let perimeterSpots = []

let xValues = []
let yValues = []

let sensors = []
let beacons = []


function manhattanDistance(pointA, pointB){
    // console.log('manhattan',  pointA[0],  pointA[1], )
 
   let xDif = Math.abs(pointA[0] - pointB[0]) 
   let yDif = Math.abs(pointA[1] - pointB[1]) 
 
 
 
 
   let mDist = yDif + xDif 

    return mDist
}

for(var i = 0; i < splitter.length; i++){
    let points = splitter[i].split(' ')

    console.log(points[2].split('='))
    console.log(points[2].split('=')[1])
    console.log(points[3].split('='))
    console.log(points[3].split('=')[1])
    console.log(points[8].split('='))
    console.log(points[8].split('=')[1])
    console.log(points[9].split('='))
    console.log(points[9].split('=')[1])

    let sensorX = points[2].split('=')[1]
    sensorX = Number(sensorX.substring(0,sensorX.length - 1))
    let sensorY = points[3].split('=')[1]
    sensorY = Number(sensorY.substring(0,sensorY.length - 1))
    let beaconX = points[8].split('=')[1]
    beaconX = Number(beaconX.substring(0,beaconX.length - 1))
    let beaconY = points[9].split('=')[1]
    beaconY = Number(beaconY)

    console.log('sensorX', sensorX)
    console.log('sensorY', sensorY)
    console.log('beaconX', beaconX)
    console.log('beaconY', beaconY)

     xValues.push(sensorX, beaconX)
     yValues.push(sensorY, beaconY)

     sensors.push([sensorX, sensorY])
     beacons.push([beaconX, beaconY])


}

console.log('xValues', xValues)
console.log('yValues', yValues)

let maxX = 0
let minX = 0
let maxY = 0
let minY = 0

for(var i = 0; i < xValues.length; i++){
    maxX = Math.max(maxX, xValues[i])
    minX = Math.min(minX, xValues[i])
    maxY = Math.max(maxY, yValues[i])
    minY = Math.min(minY, yValues[i])
}


console.log('minX, maxX. minY, maxY', minX, maxX, minY, maxY)


let xAdjustor = 0
if(minX < 0){
    xAdjustor = Math.abs(minX)
    console.log('xAdjustor', xAdjustor)
}


for(var i = 0; i < sensors.length; i++){
    //include adjustment to account for negative values
    let x = sensors[i][0]
    let y = sensors[i][1]

  //  console.log('sensor', x, y)

   // rows[y][x+ xAdjustor] = 'S'

    let beaX = beacons[i][0]
    let beaY = beacons[i][1]

  //  console.log('beacon',  beaX, beaY)
    
   // rows[beaY][beaX+ xAdjustor] = 'B'

   //  if(x === 8 && y === 7)
    manhattanDiamond([x,y], [beaX, beaY])

}




function manhattanDiamond(pointA, pointB){
   // console.log('manhattan',  pointA[0],  pointA[1], )

  let xDif = Math.abs(pointA[0] - pointB[0]) 
  let yDif = Math.abs(pointA[1] - pointB[1]) 




  let mDist = yDif + xDif 
  console.log('mDist',  mDist)
  let diamondRow = 0



  while(mDist > -1){

    // add area in diamond pattern
  let newPointRight = pointA[0] + mDist
  let newPointLeft = pointA[0] - mDist
  let newPointUp = pointA[1] - diamondRow
  let newPointDown = pointA[1] + diamondRow

  // only need to keep track of points on the row we want to check
  if (newPointUp > 0 && newPointUp < 4000001){


    // add spot above and below original line for each length of manhattan distance

    // markedSpots.push([   pointA[0], newPointUp   ])
    // markedSpots.push([   pointA[0], newPointDown   ])

  

       // add spots left and right on the lines above


          // add perimiter
          
        if(newPointRight + 1 < 4000001 && newPointUp > 0){

          perimeterSpots.push([  newPointRight + 1, newPointUp   ])


        }


    
 

 
                // add perimiter
                if(newPointLeft - 1 >= 0 && newPointUp > 0){

                 perimeterSpots.push([  newPointLeft - 1, newPointUp   ])
                  }


    }



    


  // only need to keep track of points on the row we want to check
  if (newPointDown < 4000001 && newPointDown > 0){
    // add spot above and below original line for each length of manhattan distance

    // markedSpots.push([   pointA[0], newPointUp   ])
    // markedSpots.push([   pointA[0], newPointDown   ])
       // add spots left and right on the lines above
    
          newPointRight = pointA[0] + mDist
          newPointLeft = pointA[0] - mDist
          newPointUp = pointA[1] - diamondRow
          newPointDown = pointA[1] + diamondRow
    
         // add spots left and right on the lines below

       //  console.log('newPointRight', newPointRight)



          if(newPointRight + 1 < 4000001 && newPointDown < 4000001){

            perimeterSpots.push([  newPointRight + 1, newPointDown   ])
          }
  
    

        // console.log('newPointLeft', newPointLeft)



          if(newPointLeft - 1 >= 0 && newPointDown < 4000001){

            perimeterSpots.push([  newPointLeft - 1, newPointDown   ])

          }


    }



  mDist--
  diamondRow++
      if(mDist === 0){
    
       // console.log('diamondRow', diamondRow)
          // for last point in diamond
    
    
    
    
        if(pointA[1] - diamondRow - 1 >= 0){
        
            // markedSpots.push([  pointA[0],  pointA[1] - diamondRow   ])
        

            perimeterSpots.push([  pointA[0],  pointA[1] - diamondRow - 1   ])
        }
        
        if(pointA[1] + diamondRow + 1 < 4000001){
        
            // markedSpots.push([  pointA[0],  pointA[1] + diamondRow   ])
        

            perimeterSpots.push([  pointA[0],  pointA[1] + diamondRow + 1   ])
            
        
    
        }
    
      }
 // console.log('perimeterSpots',  perimeterSpots)
 // console.log('mDist',  mDist)
  }// end diamond loop


}





// console.log('custom marked set markedSet', markedSet)

//console.log('perimeterSet', perimeterSet)


let mySet3 = new Set()

let perimLen = perimeterSpots.length

console.log('perim length', perimeterSpots.length)

for (var j = 0; j <perimLen; j++) {

        let values = perimeterSpots[j]


        let x = Number(values[0])
        let y = Number(values[1])

//        console.log(x, y);

        let covered = false

        for(var i = 0; i < sensors.length; i++){
            let mTest = manhattanDistance([x, y], sensors[i])  

            let sensorRange = manhattanDistance(sensors[i], beacons[i])  

       //     console.log('sensorRange',sensorRange);
       //     console.log('mTest', i, sensors[i], mTest);
            if(mTest <=  sensorRange){
                covered = true
            }
        }
      //  console.log('covered',covered);
        if(covered === false){
            mySet3.add(perimeterSpots[j])
        }
    


   
 //   console.log(v);
   // if(!markedSet.has(v)){
  //      console.log('hollaaa', v)
    //    mySet3.add(v)
   // }
  }



console.log('perimter test', mySet3)

// console.log('// markedSpots', // markedSpots)



// for the perimeter set, test the manhattan distance of each point to each sensor. Is is outside the coverage of the sernsor for which
// it is on the permiter of. 

// If the manhattan distance of the spot to a sensor is lower than that Sensors mDist to nearest beacon, then it is within that sensors coverage

let check = BigInt(2936793 * 4000000 + 3442119)
console.log('check', check)