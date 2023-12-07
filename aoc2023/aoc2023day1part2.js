const fs = require('fs');
let txtFile = "aocday1.txt";
let str = fs.readFileSync(txtFile,'utf8');

console.log(str);

let splitter = str.split('\n')

console.log(splitter);


let len = splitter.length



console.log(len);

let sum = 0
for(var i = 0; i < len; i++){

    console.log(splitter[i])

    let currentLine = splitter[i]
    let firstValue = 0
    let secondValue = 0

    let firstNumIndex
    let firstStringIndex

    let secondNumIndex
    let secondStringIndex

    for(var j = 0; j < currentLine.length; j++){
    //    console.log(currentLine[j])

    let matches = currentLine.match( /one|two|three|four|five|six|seven|eight|nine/g );

    let match = /one|two|three|four|five|six|seven|eight|nine/g.exec(currentLine);

        if (match) {
            console.log("first match found at " + match.index);
            firstStringIndex = !firstStringIndex ? match.index : Math.min(match.index) 
        }

        if( isNaN(parseFloat(currentLine[j]))   ){
                // skip letters
        }
        else{
            console.log('number index', j)
            firstNumIndex = j
            firstValue = currentLine[j]
            console.log('first', firstValue)
            console.log('matches', matches)

            if(firstStringIndex < firstNumIndex){
                console.log('string first')
                firstValue = matches[0]
            }
            break
        }

        if(!firstNumIndex && matches?.length){
          console.log('string first')
          firstValue = matches[0]
      }

     

        if(matches?.length){
            console.log(matches[matches.length-1])
        }

        console.log('firstStringIndex', firstStringIndex)

    }



    console.log('firstValue', firstValue)


    currentLine = currentLine.split("").reverse().join("");


    for(var j = 0; j < currentLine.length; j++){
        // console.log(currentLine[j])

        

        let matches = currentLine.match( /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g );

        let match = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g.exec(currentLine);
    
        console.log('match crash?', match)
        console.log('matches crash?', matches)


            if (match) {
                console.log(" second match found at " + match.index);
                secondStringIndex = !secondStringIndex ? match.index : Math.min(match.index) 
            }
        console.log('secondStringIndex crash?', secondStringIndex)


        if( isNaN(parseFloat(currentLine[j]))   ){
                // skip letters
        }
        else{


            secondNumIndex = j
            secondValue = currentLine[j]
            console.log('second', secondValue)
            console.log('matches', matches)

            if(secondStringIndex < secondNumIndex){
                console.log('string first seconded')
                console.log('match crash?', match)
                console.log('matches crash?', matches)
                secondValue = matches[0]
            }
            break
            
        }

        if(!secondNumIndex  && matches?.length){
          console.log('string second')
          secondValue = matches[0]
      }


    }
    console.log('secondValue', secondValue)

    switch (firstValue) {
          case 'one':
            firstValue = 1;
          break;
          case 'two':
            firstValue = 2;
          break;
          case 'three':
            firstValue = 3;
          break;
          case 'four':
            firstValue = 4;
          break;
          case 'five':
            firstValue = 5;
          break;
          case 'six':
            firstValue = 6;
          break;
          case 'seven':
            firstValue = 7;
          break;
          case 'eight':
            firstValue = 8;
          break;
          case 'nine':
            firstValue = 9;
          break;
        default:
          console.log(`Sorry, we are out of ${firstValue}.`);
      }

      switch (secondValue) {
        case 'eno':
            secondValue = 1;
        break;
        case 'owt':
            secondValue = 2;
        break;
        case 'eerht':
            secondValue = 3;
        break;
        case 'ruof':
            secondValue = 4;
        break;
        case 'evif':
            secondValue = 5;
        break;
        case 'xis':
            secondValue = 6;
        break;
        case 'neves':
            secondValue = 7;
        break;
        case 'thgie':
            secondValue = 8;
        break;
        case 'enin':
            secondValue = 9;
        break;
      default:
        console.log(`Sorry, we are out of ${secondValue}.`);
    }

    console.log('firstvalue', firstValue)
    console.log('secondValue', secondValue)

    console.log('final value=' + firstValue + secondValue)

    sum += parseFloat('' + firstValue + secondValue)
   

}

console.log(sum)

/*   let sortedElves = threeHighest.sort(function(a, b) {
    return a - b;
  }).reverse()
  
console.log(highCount)
console.log(sortedElves[0] + sortedElves[1] + sortedElves[2])

   */


// newstr = newstr.join(' ')

// console.log(newstr);