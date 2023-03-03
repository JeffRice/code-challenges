const fs = require('fs');
let txtFile = "aocday19.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')
let blueprints = {}
let iter = 1
let highOre = 0
let highOreObj = {}
for(const item of splitter){
    
    let itemArr = item.split(' ')
    // console.log(item)
    // console.log(itemArr)


    if(itemArr.length === 1){
        // console.log('new blueprint')
        iter++
        highOre=0
    }
    if(itemArr[0] === 'Blueprint'){
        blueprints[iter] = {}
        blueprints[iter]['costs'] = {}
    }
    if(itemArr[3] === 'ore'){
        blueprints[iter]['costs'].ore = Number(itemArr[6])
        highOre = Math.max(highOre, Number(itemArr[6]))
    }

    if(itemArr[3] === 'clay'){
        blueprints[iter]['costs'].clay = Number(itemArr[6])
        highOre = Math.max(highOre, Number(itemArr[6]))
    }
    if(itemArr[3] === 'obsidian'){
        blueprints[iter]['costs'].obsidian = {}
        blueprints[iter]['costs'].obsidian.ore = Number(itemArr[6])
        blueprints[iter]['costs'].obsidian.clay = Number(itemArr[9])
        highOre = Math.max(highOre, Number(itemArr[6]))
    }
    if(itemArr[3] === 'geode'){
        blueprints[iter]['costs'].geode = {}
        blueprints[iter]['costs'].geode.ore = Number(itemArr[6])
        blueprints[iter]['costs'].geode.obsidian = Number(itemArr[9])
        highOre = Math.max(highOre, Number(itemArr[6]))

        console.log('highOre', iter, highOre)
        highOreObj[iter] = highOre
    }

   // console.log('highOreObj', highOreObj)

 } 

 let totalCalc = 0
 for(let i = 1; i < 31; i++){



    blueprints[i]['bots'] = {}


    blueprints[i]['bots'][0] = {}
    blueprints[i]['bots'][0].ore = 1
    blueprints[i]['bots'][0].clay = 0
    blueprints[i]['bots'][0].obsidian = 0
    blueprints[i]['bots'][0].geode = 0
 
     blueprints[i]['minerals'] = {}
 
 
    blueprints[i]['minerals'][0] = {}
    blueprints[i]['minerals'][0].ore = 0
    blueprints[i]['minerals'][0].clay = 0
    blueprints[i]['minerals'][0].obsidian = 0
    blueprints[i]['minerals'][0].geode = 0
 
   // console.log('blueprints', blueprints)
 
 
 let possibleCombinations = {}
 let attemptedCombinations = {}
 let recurse=false
 let minuteTracker = {}
 let selectionTracker = {}
 let possible = {}
 let botChoice = 1
 let botSelection
 let highGeodeAmount = 0
 
 function buildTick(blueprints, minutes, possibleCombinations){
   //   console.log('current minute', minutes)
   //   console.log('current botChoice', botChoice)
 
      // keep track of the minutes at each branch
      minuteTracker[botChoice] = minutes
 
 
 
 
     if(!recurse){
         possibleCombinations[botChoice]= []
         attemptedCombinations[botChoice]= []
         }
         else{
             // reset beyond the current botchoice
              for(let j = botChoice+1; j < 24; j++){
                 delete blueprints[i]['minerals'][j]
                 delete blueprints[i]['bots'][j]
             } 
         }
 
     // make a goal for the next robot to build
     // branch on next robot to build
     blueprints[i]['minerals'][botChoice] =  JSON.parse(JSON.stringify(blueprints[i]['minerals'][botChoice-1]))
     blueprints[i]['bots'][botChoice] =  JSON.parse(JSON.stringify(blueprints[i]['bots'][botChoice-1]))
 
 for(const m in blueprints[i]['minerals'][botChoice]){
     // how much of each mineral per min currently
   //   console.log('current minerals per botChoice:', botChoice, m, blueprints[i]['minerals'][botChoice][m])
 }
 
 for(const b in blueprints[i]['bots'][botChoice]){
     // how much of each bot per min currently
   //   console.log('bots per botChoice:', botChoice, b, blueprints[i]['bots'][botChoice][b])
 }
 
 
     // how many minutes have passed?
 
   let prevTime =  minuteTracker[botChoice -1]
   let timeDiff = minutes - prevTime
 
  // console.log('timeDiff', timeDiff)
 
 
 
      let fullMinutes = timeDiff - 1
   //   console.log('fullMinutes', fullMinutes)
      if(botChoice === 2 ){
 
              //collect minerals
      let mineralsToAdd      
      let clayToAdd      
      let obsidianToAdd 
      let geodeToAdd 
 
         if( selectionTracker[botChoice-1] === 'oreBot'){
          //   mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
             mineralsToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['ore'] + (1 * blueprints[i]['bots'][botChoice-2]['ore'])
             blueprints[i]['minerals'][botChoice]['ore'] += mineralsToAdd
        }
    
        if( selectionTracker[botChoice-1] === 'clayBot'){
         //  mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
           clayToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['clay'] + (1 * blueprints[i]['bots'][botChoice-2]['clay'])
 
           mineralsToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['ore'] + (1 * blueprints[i]['bots'][botChoice-2]['ore'])
           blueprints[i]['minerals'][botChoice]['clay'] += clayToAdd
           blueprints[i]['minerals'][botChoice]['ore'] += mineralsToAdd
       }
       
       if( selectionTracker[botChoice-1] === 'obsidianBot'){
         //  mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
           clayToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['clay'] + (1 * blueprints[i]['bots'][botChoice-2]['clay'])
 
           mineralsToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['ore'] + (1 * blueprints[i]['bots'][botChoice-2]['ore'])
           blueprints[i]['minerals'][botChoice]['clay'] += clayToAdd
           blueprints[i]['minerals'][botChoice]['ore'] += mineralsToAdd
       }
 

         if( selectionTracker[botChoice -1] === 'oreBot'){
             blueprints[i]['bots'][botChoice]['ore']++
         }
         if( selectionTracker[botChoice -1] === 'clayBot'){
             blueprints[i]['bots'][botChoice]['clay']++
         }
         if( selectionTracker[botChoice -1] === 'obsidianBot'){
             blueprints[i]['bots'][botChoice]['obsidian']++
         }
         if( selectionTracker[botChoice -1] === 'geodeBot'){
             blueprints[i]['bots'][botChoice]['geode']++
         }
     
     } 
 
 
      if(botChoice > 2 ){
 
         let mineralsToAdd      
         let clayToAdd      
         let obsidianToAdd 
         let geodeToAdd 
 
         if( selectionTracker[botChoice-2] === 'clayBot'){
              mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
              clayToAdd =     ((timeDiff - 1)  * blueprints[i]['bots'][botChoice]['clay']) + (1 * blueprints[i]['bots'][botChoice-2]['clay'])
              obsidianToAdd = (timeDiff ) * blueprints[i]['bots'][botChoice]['obsidian']
              geodeToAdd = (timeDiff) * blueprints[i]['bots'][botChoice]['geode']
         }
         else if( selectionTracker[botChoice-2] === 'oreBot'){
             mineralsToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['ore'] + (1 * blueprints[i]['bots'][botChoice-2]['ore'])
             clayToAdd =     (timeDiff )  * blueprints[i]['bots'][botChoice]['clay']
             obsidianToAdd = (timeDiff) * blueprints[i]['bots'][botChoice]['obsidian']
             geodeToAdd = (timeDiff) * blueprints[i]['bots'][botChoice]['geode']
       
        }
         else if( selectionTracker[botChoice-2] === 'obsidianBot'){
             mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
             clayToAdd =     (timeDiff )  * blueprints[i]['bots'][botChoice]['clay']
             obsidianToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['obsidian'] + (1 * blueprints[i]['bots'][botChoice-2]['obsidian'])
             geodeToAdd = (timeDiff) * blueprints[i]['bots'][botChoice]['geode']
         }
         else if( selectionTracker[botChoice-2] === 'geodeBot'){
         mineralsToAdd = timeDiff * blueprints[i]['bots'][botChoice]['ore']
         clayToAdd =     (timeDiff )  * blueprints[i]['bots'][botChoice]['clay']
         obsidianToAdd = (timeDiff ) * blueprints[i]['bots'][botChoice]['obsidian']
         geodeToAdd = (timeDiff -1) * blueprints[i]['bots'][botChoice]['geode']+ (1 * blueprints[i]['bots'][botChoice-2]['geode'])
         }
 
 
         blueprints[i]['minerals'][botChoice]['ore'] += mineralsToAdd
         blueprints[i]['minerals'][botChoice]['clay'] += clayToAdd
         blueprints[i]['minerals'][botChoice]['obsidian'] += obsidianToAdd 
         blueprints[i]['minerals'][botChoice]['geode'] += geodeToAdd 
 
         if( selectionTracker[botChoice -1] === 'oreBot'){
             blueprints[i]['bots'][botChoice]['ore']++
         }
         if( selectionTracker[botChoice -1] === 'clayBot'){
             blueprints[i]['bots'][botChoice]['clay']++
         }
         if( selectionTracker[botChoice -1] === 'obsidianBot'){
             blueprints[i]['bots'][botChoice]['obsidian']++
         }
         if( selectionTracker[botChoice -1] === 'geodeBot'){
             blueprints[i]['bots'][botChoice]['geode']++
         }
     
     }    
 
 
 
          //triangular number heuristic
 
          let timeRemaining = 25 - minutes
          let maxGeodes
          if (timeRemaining === 1){maxGeodes = 0}
          if (timeRemaining === 2){maxGeodes = 1}
          if (timeRemaining === 3){maxGeodes = 3}
          if (timeRemaining === 4){maxGeodes = 6}
          if (timeRemaining === 5){maxGeodes = 10}
          if (timeRemaining === 6){maxGeodes = 15}
          if (timeRemaining === 7){maxGeodes = 21}
          if (timeRemaining === 8){maxGeodes = 28}
          if (timeRemaining === 9){maxGeodes = 36}
          if (timeRemaining === 10){maxGeodes = 45}
          if (timeRemaining === 11){maxGeodes = 55}
          if (timeRemaining === 12){maxGeodes = 66}
          if (timeRemaining === 13){maxGeodes = 78}
          if (timeRemaining === 14){maxGeodes = 91}
          if (timeRemaining === 15){maxGeodes = 105}
          if (timeRemaining === 16){maxGeodes = 120}
          if (timeRemaining === 17){maxGeodes = 136}
          if (timeRemaining === 18){maxGeodes = 153}
          if (timeRemaining === 19){maxGeodes = 171}
          if (timeRemaining === 20){maxGeodes = 190}
          if (timeRemaining === 21){maxGeodes = 210}
          if (timeRemaining === 22){maxGeodes = 231}
          if (timeRemaining === 23){maxGeodes = 253}
          if (timeRemaining === 24){maxGeodes = 276}
          if (timeRemaining === 25){maxGeodes = 300}
          if (timeRemaining === 26){maxGeodes = 325}
          if (timeRemaining === 27){maxGeodes = 351}
          if (timeRemaining === 28){maxGeodes = 378}
          if (timeRemaining === 29){maxGeodes = 406}
     
        //  console.log('minutes, maxGeodes, highGeodeCount, current geodeBots, current geode minerals', minutes, maxGeodes, highGeodeAmount, blueprints[i]['bots'][botChoice]['geode'],  blueprints[i]['minerals'][botChoice]['geode'])
 
     
     //So basically, we can prune the search if geodes collected + geode robots * time remaining + T(time remaining) <= best total geodes found so far.
     let canPrune = false
     if(blueprints[i]['minerals'][botChoice]['geode'] + (blueprints[i]['bots'][botChoice]['geode'] * timeRemaining) + maxGeodes <= highGeodeAmount){
      //   console.log('this could be pruned')
         canPrune = true
         minutes = 24
         return minutes
 
     }
     else{
      //   console.log('cannot be pruned')
     }
 
 
   //  console.log('previous botSelection', selectionTracker[botChoice -1])
   //  console.log('previous previous botSelection', selectionTracker[botChoice -2])
 
     for(const m in blueprints[i]['minerals'][botChoice]){
         // how much of each mineral per min currently
     //     console.log('current minerals per botChoice:', botChoice, m, blueprints[i]['minerals'][botChoice][m])
     }
     for(const b in blueprints[i]['bots'][botChoice]){
         // how much of each bot per min currently
      //    console.log('bots per botChoice:', botChoice, b, blueprints[i]['bots'][botChoice][b])
     }
 
  //   console.log('blueprints[i]:', blueprints[i])
 
 
     let oreBotCost = blueprints[i]['costs']['ore']
     // console.log('oreBotCost', oreBotCost)
     // let timeToBuildOreBot = (oreBotCost - blueprints[i]['minerals'][botChoice]['ore']) / blueprints[i]['bots'][botChoice]['ore']
     let timeToBuildOreBot = ( (oreBotCost - blueprints[i]['minerals'][botChoice]['ore']) - (1 *  blueprints[i]['bots'][botChoice-1]['ore'] ) )  / blueprints[i]['bots'][botChoice]['ore']
     timeToBuildOreBot += 1
     timeToBuildOreBot = Math.ceil(timeToBuildOreBot)
     timeToBuildOreBot = Math.max(timeToBuildOreBot, 1)
     // console.log('timeToBuildOreBot', timeToBuildOreBot)
 
     let clayBotCost = blueprints[i]['costs']['clay']
     // console.log('clayBotCost', clayBotCost)
     // let timeToBuildClayBot = (clayBotCost - blueprints[i]['minerals'][botChoice]['ore']) / blueprints[i]['bots'][botChoice ]['ore']
     let timeToBuildClayBot = ( (clayBotCost - blueprints[i]['minerals'][botChoice]['ore']) - (1 *  blueprints[i]['bots'][botChoice-1]['ore'] ) )  / blueprints[i]['bots'][botChoice]['ore']
     timeToBuildClayBot += 1
     timeToBuildClayBot = Math.ceil(timeToBuildClayBot)
     timeToBuildClayBot = Math.max(timeToBuildClayBot, 1)
     // console.log('timeToBuildClayBot', timeToBuildClayBot)
 
 
     let obsidianBotOreCost = blueprints[i]['costs']['obsidian']['ore']
     let obsidianBotClayCost = blueprints[i]['costs']['obsidian']['clay']
     // console.log('obsidianBotOreCost', obsidianBotOreCost)
     // console.log('obsidianBotClayCost', obsidianBotClayCost)
     // let timeToBuildObsidianBotOre = (obsidianBotOreCost - blueprints[i]['minerals'][botChoice]['ore']) / blueprints[i]['bots'][botChoice]['ore']
     let timeToBuildObsidianBotOre = ( (obsidianBotOreCost - blueprints[i]['minerals'][botChoice]['ore']) - (1 *  blueprints[i]['bots'][botChoice-1]['ore'] ) )  / blueprints[i]['bots'][botChoice]['ore']
     timeToBuildObsidianBotOre += 1
    // let timeToBuildObsidianBotClay = (obsidianBotClayCost - blueprints[i]['minerals'][botChoice]['clay']) / blueprints[i]['bots'][botChoice]['clay']
     let timeToBuildObsidianBotClay = ( (obsidianBotClayCost - blueprints[i]['minerals'][botChoice]['clay']) - (1 *  blueprints[i]['bots'][botChoice-1]['clay'] ) )  / blueprints[i]['bots'][botChoice]['clay']
     timeToBuildObsidianBotClay += 1
     // console.log('timeToBuildObsidianBotOre', timeToBuildObsidianBotOre)
     // console.log('timeToBuildObsidianBotClay', timeToBuildObsidianBotClay)
     let timeToBuildObsidianBot = Math.max(timeToBuildObsidianBotOre, timeToBuildObsidianBotClay)
     timeToBuildObsidianBot = Math.ceil(timeToBuildObsidianBot)
     timeToBuildObsidianBot = Math.max(timeToBuildObsidianBot, 1)
     // console.log('timeToBuildObsidianBot', timeToBuildObsidianBot)
 
 
     let geodeBotOreCost = blueprints[i]['costs']['geode']['ore']
     let geodeBotObsidianCost = blueprints[i]['costs']['geode']['obsidian']
     // console.log('geodeBotOreCost', geodeBotOreCost)
     // console.log('geodeBotObsidianCost', geodeBotObsidianCost)
     // let timeToBuildGeodeBotOre = (geodeBotOreCost - blueprints[i]['minerals'][botChoice]['ore']) / blueprints[i]['bots'][botChoice]['ore']
     let timeToBuildGeodeBotOre = ( (geodeBotOreCost - blueprints[i]['minerals'][botChoice]['ore']) - (1 *  blueprints[i]['bots'][botChoice-1]['ore'] ) )  / blueprints[i]['bots'][botChoice]['ore']
     timeToBuildGeodeBotOre += 1
     let timeToBuildGeodeBotObsidian =( (geodeBotObsidianCost - blueprints[i]['minerals'][botChoice]['obsidian']) - (1 *  blueprints[i]['bots'][botChoice-1]['obsidian'] ) )  / blueprints[i]['bots'][botChoice]['obsidian']
     timeToBuildGeodeBotObsidian += 1 // the cost is adjusted like this because 1 round is simulated before the recently built bot starts producing
                                      // so the total cost, minus the existing mineral of that type, minus one round * the old botCount, and then divide that by the new botCount
                                      // but need to add one because one round has already been simulated or subtracted
                                      // if the previous build was not of the type being calculated it should still work
     // console.log('timeToBuildGeodeBotOre', timeToBuildGeodeBotOre)
     // console.log('timeToBuildGeodeBotObsidian', timeToBuildGeodeBotObsidian)
     let timeToBuildGeodeBot = Math.max(timeToBuildGeodeBotOre, timeToBuildGeodeBotObsidian)
     timeToBuildGeodeBot = Math.ceil(timeToBuildGeodeBot)
     timeToBuildGeodeBot = Math.max(timeToBuildGeodeBot, 1)
     // console.log('timeToBuildGeodeBot', timeToBuildGeodeBot)
 
 
 
 
     let possibilities = [timeToBuildOreBot,  timeToBuildClayBot, timeToBuildObsidianBot, timeToBuildGeodeBot]
     possible[botChoice] = {}
     possible[botChoice]['oreBot'] = timeToBuildOreBot
     possible[botChoice]['clayBot'] = timeToBuildClayBot
     possible[botChoice]['obsidianBot'] = timeToBuildObsidianBot
     possible[botChoice]['geodeBot'] = timeToBuildGeodeBot
 
 
     // console.log('possibilities', possibilities)
 
     if(!recurse){
 
 
 
         for(const p in possible[botChoice]){
             if(possible[botChoice][p]!= Infinity && possible[botChoice][p] > -1 && minutes + possible[botChoice][p] < 24){
         //      if(possible[botChoice][p]!= Infinity && minutes + possible[botChoice][p] < 24){
                 //heuristics
                 if(p === 'oreBot' 
                  && blueprints[i]['bots'][botChoice]['ore'] === highOreObj[i]
                 ){
                   //  console.log('blueprints[i]ore]', blueprints[i]['bots'][botChoice]['ore'])
                   //  console.log('early SKIP')
                 }
               //  else if(p === 'clayBot' && blueprints[i]['bots'][botChoice-1]['clay'] > 1){
               //          console.log('SKIP CLAY')
               //  }
                 else{
                     possibleCombinations[botChoice].push(p)
                 }
  
             }
         }
     }
     else{
        //  console.log('recursive options: ', possibleCombinations[botChoice])
 
          for(const p of possibleCombinations[botChoice]){
          //   console.log('p', p)
 
                 //heuristics
                 if(p === 'oreBot' 
                  && blueprints[i]['bots'][botChoice]['ore'] === highOreObj[i]
                 ){
                   //  console.log('blueprints[i]ore]', blueprints[i]['bots'][botChoice]['ore'])
                   //  console.log('recursive SKIP')
                     possibleCombinations[botChoice] = possibleCombinations[botChoice].filter(x => x !== 'oreBot')
                 }
 
                 else{
 
                 }
  
 
         }
 
     }

     // console.log('attemptedCombinations:', attemptedCombinations)
     // console.log('possible:', possible)
    // console.log('possibleCombinations:', possibleCombinations)
 
     botSelection = possibleCombinations[botChoice].pop()
 
   //   console.log('botSelection', botSelection)
   //   console.log('possibleCombinations:', possibleCombinations)
 
 
      selectionTracker[botChoice] = botSelection
      // console.log('blueprints[i]:', blueprints[i])
 
     if(botSelection === 'oreBot'){
      //  let mineralsToAdd = timeToBuildOreBot * blueprints[i]['bots'][botChoice -1]['ore']
        minutes += timeToBuildOreBot
 
       // blueprints[i]['minerals'][botChoice]['ore'] += mineralsToAdd
       
       blueprints[i]['minerals'][botChoice]['ore'] -= oreBotCost
 
     }
     if(botSelection === 'clayBot'){
       //  let mineralsToAdd = timeToBuildClayBot * blueprints[i]['bots'][botChoice -1]['ore']
 
         minutes += timeToBuildClayBot
      //   console.log('clay mins ', mineralsToAdd, minutes, timeToBuildClayBot,  blueprints[i]['bots'][botChoice -1]['ore'])
         blueprints[i]['minerals'][botChoice]['ore'] -= clayBotCost
 
     }
     if(botSelection === 'obsidianBot'){
 
         minutes += timeToBuildObsidianBot
         blueprints[i]['minerals'][botChoice]['ore'] -= obsidianBotOreCost
         blueprints[i]['minerals'][botChoice]['clay'] -= obsidianBotClayCost
 
     }
     if(botSelection === 'geodeBot'){
 
         minutes += timeToBuildGeodeBot
         blueprints[i]['minerals'][botChoice]['ore'] -= geodeBotOreCost
         blueprints[i]['minerals'][botChoice]['obsidian'] -= geodeBotObsidianCost
 
     }
     if(botSelection === undefined){
        //  console.log('no effective choices')
         // calc end amount of minerals
 
         //need to check if last bot chosen was a geode, then adjust
 
         if(selectionTracker[botChoice-1] === 'geodeBot'){
           //  console.log('adjust for geodeBot')
 
             let minutesRemaining = 25 - minutes
             let startingGeode =  blueprints[i]['minerals'][botChoice]['geode']
             let finalAmount = startingGeode + ((minutesRemaining - 1) * blueprints[i]['bots'][botChoice]['geode']) + (1 * blueprints[i]['bots'][botChoice-1]['geode'])
           //  console.log('startingGeode, minutesRemaining, bots', startingGeode,  minutesRemaining, blueprints[i]['bots'][botChoice]['geode'])
           //   console.log('finalAmount 1', finalAmount)
          //    console.log('selectionTracker', selectionTracker)
              highGeodeAmount = Math.max(highGeodeAmount, finalAmount)
             minutes = 24
             return minutes
 
         }
         else{
             let minutesRemaining = 25 - minutes
             let startingGeode =  blueprints[i]['minerals'][botChoice]['geode']
             let finalAmount = startingGeode + minutesRemaining * blueprints[i]['bots'][botChoice]['geode']
           //  console.log('startingGeode, minutesRemaining, bots', startingGeode,  minutesRemaining, blueprints[i]['bots'][botChoice]['geode'])
           //   console.log('finalAmount 1', finalAmount)
           //   console.log('selectionTracker', selectionTracker)
              highGeodeAmount = Math.max(highGeodeAmount, finalAmount)
             minutes = 24
             return minutes
         }
 
     }
 
     botChoice++
 
    //  console.log('blueprints[i]:', blueprints[i])
    //  console.log('minute:', minutes)
    //  console.log('botChoice:', botChoice)
 
 
     if(minutes === 24){
                 // calc end amount of minerals
              //   console.log('reached the end')
              //   let minutesRemaining = 24 - minutes
                 let finalBuildMinutes = 1
                 let startingGeode =  blueprints[i]['minerals'][botChoice-1]['geode']
                 let finalAmount = startingGeode + finalBuildMinutes * blueprints[i]['bots'][botChoice-1]['geode']
                  console.log('finalAmount 2', finalAmount)
                 return minutes
     }
 
     return minutes
     
 }
 
 
 
 let minutes = 1
 while(minutes < 24){
 minutes = buildTick(blueprints, minutes, possibleCombinations)
 // reset recurse flag so it will continue as normal until completing
 recurse = false
 // console.log('minuteTracker', minuteTracker)
 
 
     if(minutes === 24){
   //   console.log('les go')
 
         let remainingCombos = 0
 
         for(const pc in possibleCombinations){
             // console.log('pc', pc, possibleCombinations[pc])
         
             remainingCombos += possibleCombinations[pc].length
         }
         // console.log('remainingCombos', remainingCombos)
 
                     //return to most recent build choice, reset state and make new choice
 
             for(let j = botChoice - 1; j > 0; j--){
                 // console.log('botChoice', j)
                 // console.log('possible combos [botChoice]', possibleCombinations[j]) 
                 
                 if(possibleCombinations[j].length){
                     // console.log('*need to try a combo here')
                  //   let recursiveBotSelection = possibleCombinations[j].pop()
                     let recursiveBotChoice = j
                     let recursiveMinutes = minuteTracker[j]
 
                     // console.log('recursive BotChoice #, minutes', recursiveBotChoice, recursiveMinutes)
                     // console.log('recursive selection, BotChoice #, minutes', recursiveBotSelection, recursiveBotChoice, recursiveMinutes)
                     // need to reset minerals and bots to correct state
                     // break out to send back to while loop
                     recurse = true
                     minutes = recursiveMinutes
                     botChoice = recursiveBotChoice
                     break
                 }
             }
     }
 
 
 }
 
 console.log('highGeodeAmount', i, highGeodeAmount)
 totalCalc += i * highGeodeAmount
 
 }
 console.log('totalCalc', totalCalc)
