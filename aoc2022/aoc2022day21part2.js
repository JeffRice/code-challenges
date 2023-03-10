const { ifError } = require('assert');
const fs = require('fs');
let txtFile = "aocday21.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')




let monkeyList = {}
for(const item of splitter){
  //console.log('item', item)

  let itemSplitter = item.split(':')
 console.log('itemSplitter', itemSplitter)

  monkeyName = itemSplitter[0] 
  monkeyOperation = itemSplitter[1] 

  let operationSplitter = itemSplitter[1].split(' ')
  operationSplitter.shift()

 console.log('monkeyName', monkeyName)
 console.log('operationSplitter', operationSplitter)

     if(monkeyName === 'humn'){
        monkeyList[monkeyName] = ['x']
    }
    
    else{
        monkeyList[monkeyName] = []

        if(operationSplitter.length === 1){
           console.log('have a value')
            monkeyList[monkeyName].push(Number(operationSplitter[0])) 
        }
        else{
           console.log('have an equation')  
            monkeyList[monkeyName].push(operationSplitter[0])
            monkeyList[monkeyName].push(operationSplitter[1])
            monkeyList[monkeyName].push(operationSplitter[2])
        }
    }



 } 

console.log(monkeyList)

let totalItemStrings = 0
let previousItemStrings

    while(totalItemStrings != previousItemStrings){

      if(totalItemStrings != 0){
      previousItemStrings = totalItemStrings}

      let totalItemLengths = 0
      totalItemStrings = 0

     for(const item in monkeyList){
       console.log('item', item)
       console.log('monkeyList item', monkeyList[item])



        if(monkeyList[item].length > 1){
           console.log('need to check')
            let firstValue = monkeyList[item][0]
           console.log('firstValue', firstValue)
            let secondValue = monkeyList[item][2]
           console.log('secondValue', secondValue)

           console.log('first value Lookup')
           console.log('monkeyList[firstValue]', monkeyList[firstValue])

           if(monkeyList[item][0] === 'x'){
            console.log('skip x')
           }
           else if(typeof monkeyList[item][0] != 'number' && monkeyList[firstValue].length === 1){
               console.log('update first item')
                monkeyList[item][0] = monkeyList[firstValue][0]
            }


           console.log('second value Lookup')
           console.log('monkeyList[secondValue]', monkeyList[secondValue])


           if(monkeyList[item][2] === 'x'){
            console.log('skip x')
           }
            else if(typeof monkeyList[item][2] != 'number' && monkeyList[secondValue].length === 1){
               console.log('update second item')
                monkeyList[item][2] = monkeyList[secondValue][0]
            }

     //   check if you can replace the equation with a value
             if(typeof monkeyList[item][0] === 'number' && typeof monkeyList[item][2] === 'number' ){
               console.log('replace the equation with a value')

               let returnValue = operationFunction(monkeyList[item][0], monkeyList[item][1], monkeyList[item][2])
               monkeyList[item] = [returnValue]
             }
        }

        totalItemLengths +=  monkeyList[item].length
        if(monkeyList[item].length > 1){
         if(typeof monkeyList[item][0] === 'string'){totalItemStrings++}
         if(typeof monkeyList[item][2] === 'string'){totalItemStrings++}
        }

     }
     console.log('totalItemLengths', totalItemLengths) 
     console.log('totalItemStrings', totalItemStrings) 
     console.log('previous', previousItemStrings) 
    console.log('monkeyList', monkeyList)   

    }




    let leftEquation =  monkeyList['root'][0]


console.log('monkeyList[root][0]', monkeyList['root'][0])

let expandedItem = checkForReplacement(leftEquation)



console.log('expandedItem', expandedItem)


let expandableFlag = true
while(expandableFlag){

    for(const expanded of expandedItem){
      console.log('expanded', expanded)



      if(typeof expanded === 'string' && expanded != '+' && expanded != '-' && expanded != '*' && expanded != '/' && expanded != '(' && expanded != ')'){
         console.log('nested expand', expanded)
         console.log('nested indexOf expand', expandedItem.indexOf(expanded))

         if(expandedItem.indexOf(expanded) > 0){
            let currentIndex = expandedItem.indexOf(expanded)
            console.log('right expand')
            let nestedExpandedItem = checkForReplacement(expanded)

           let arrayStart = expandedItem.slice(0,currentIndex)
           let arrayEnd = expandedItem.slice(currentIndex+1,expandedItem.length)
           while(nestedExpandedItem.length){
            let lastItem = nestedExpandedItem.shift()
            arrayStart.push(lastItem)
            console.log('arrayStart', arrayStart)

         }

         expandedItem = [...arrayStart, ...arrayEnd];
         console.log('expandedItem', expandedItem)


         }

       // console.log('calc test', calculateList(expandedItem))

         


      }

    }

    let reducedAnswer = expandedItem.reduce( (acc, curr) => acc + curr, ''     )
console.log(reducedAnswer)

      //check item values
      expandableFlag = false
    for(const valueTest of expandedItem){

    


      

         if(typeof valueTest === 'string' && valueTest != '+' && valueTest != '-' && valueTest != '*' && valueTest != '/' && valueTest != 'x'){
            expandableFlag = true
         }


           
    }

}


console.log('print equation')
for(const items of expandedItem){
   console.log(items)
}


function checkForReplacement(monkeyListItem){

   if(monkeyList[monkeyListItem]){
      console.log('monkeyList[monkeyListItem]', monkeyList[monkeyListItem])
      console.log('replace' )
   }

   monkeyList[monkeyListItem].push(')')
   monkeyList[monkeyListItem].unshift('(')

   return monkeyList[monkeyListItem]
      

}


function operationFunction(firstValue, operation, secondValue){
    if(operation === '+'){return firstValue + secondValue}
    if(operation === '-'){return firstValue - secondValue}
    if(operation === '*'){return firstValue * secondValue}
    if(operation === '/'){return firstValue / secondValue}
}