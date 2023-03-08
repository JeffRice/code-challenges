const { ifError } = require('assert');
const fs = require('fs');
let txtFile = "aocday20.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let list = []
let listCopy = []
let iter = 0
for(const item of splitter){
  // console.log('item', item)
  list.push(iter + ',' + (Number(item) * 811589153))
  listCopy.push(iter + ',' + (Number(item) * 811589153))
  iter++
 } 

 let listLen = list.length
 let listMinusOne = list.length-1

 // console.log(3122995060744+5479849961056-1106196015539)
 // mix loop
 for(var i = 0; i < 10; i++){
 for(const item of listCopy){

    console.log('item', item)

     let listSplitter = item.split(',')
   //  console.log('listSplitter', listSplitter)
     let currentItemValue = Number(listSplitter[1])
   //  console.log('currentItemValue', currentItemValue)
     let currentItemIndex = listSplitter[0]

    if(currentItemValue === 0){
        // nothing to change for value of 0
        continue
      }

      currentItemIndex = list.indexOf(item)
    //  console.log('currentItemIndex', currentItemIndex)


  let positiveNumber = true
  if(currentItemValue < 0){
    positiveNumber = false
  }

  let newValue = 0
  let newNeg = 0
  let adjustedNegative = 0
  let adjustedPositive = 0
  let adjustedIndex = currentItemIndex + currentItemValue 
 //  console.log('adjustedIndex', adjustedIndex)


   if(adjustedIndex === 0){
    console.log('need to wrap')
    adjustedIndex = listMinusOne
   }


  if(adjustedIndex > listMinusOne){

    adjustedPositive = currentItemValue - (listMinusOne - currentItemIndex)
     console.log('out of bounds positive index', adjustedPositive) 
  }
  if(adjustedPositive > listMinusOne){
    adjustedPositive = adjustedIndex % (listMinusOne)
    if(adjustedPositive===0){
        // console.log('wrap around')
        adjustedPositive=listMinusOne
    }
    
  }


  if(adjustedIndex> 0 && adjustedPositive === 0){
    adjustedPositive = adjustedIndex
   }


  if(adjustedIndex < 0){
    // console.log('negative index') 
    newNeg = -1
    if(Math.abs(currentItemIndex +currentItemValue) > listMinusOne ){
        newValue = currentItemValue + (listMinusOne)
    }
    if(Math.abs(currentItemIndex +newValue) > listMinusOne){
        newValue = newValue % (listMinusOne)
    }

    // console.log('newValue', newValue)
    let newIndex = currentItemIndex + newValue
     console.log('newIndex', newIndex)


    if(newValue != 0){
    adjustedNegative = listMinusOne + newIndex

    if(Math.abs(adjustedNegative) > listMinusOne){
        adjustedNegative = newIndex
      }

    }
    else{
    adjustedNegative = listMinusOne + currentItemIndex + currentItemValue

    if(Math.abs(adjustedNegative) > listMinusOne){
        adjustedNegative = newIndex
      }
    }

    // console.log('adjustedNegative', adjustedNegative)
  }

  if(adjustedNegative != 0 || newNeg === -1){
    // console.log('use adjusted value')

    arraymove(list, currentItemIndex, adjustedNegative)

  }// end adjusted negative if
  else{

    if(adjustedPositive === 0){
        adjustedPositive = currentItemIndex + currentItemValue
    }

    arraymove(list, currentItemIndex, adjustedPositive)
  }

 }

 console.log('list', list, listLen)
 
 let iterator = 0
 for(const listItem of list){
      console.log(iterator, listItem)
     iterator++
 }
} 

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}