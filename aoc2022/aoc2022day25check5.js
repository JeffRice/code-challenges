const { ifError } = require('assert');
const exp = require('constants');
const fs = require('fs');
const { cursorTo } = require('readline');
let txtFile = "aocday25.txt";
let str = fs.readFileSync(txtFile,'utf8');

let splitter = str.split('\n')

let snafus = []
for(let i=0; i< splitter.length; i++){
  let itemSplitter = splitter[i].split('')
   console.log(itemSplitter)
   snafus.push(itemSplitter)
}

let decimals = []
for(const s of snafus){
    let totalValue = snafuTranslate(s)
    decimals.push(totalValue)
}

let reduced = decimals.reduce( (acc, cur) => acc + cur,  )
console.log('reduced', reduced)
decimals.push(32762853787275)
console.log('decimals', decimals)

for(const d of decimals){
    console.log('d', d)
    let decimalValue = d

    //find highest divisor
    let decimalSplitter = String(decimalValue/5).split('.')
    let divisor = 5
    let digitCounter = 1

    while(Number(decimalSplitter[0]) > 0){
        console.log('divisor x5', divisor)
        divisor = divisor*5
        decimalSplitter= String(decimalValue/(divisor)).split('.') 
        digitCounter++
    }

    // find the correct snafu digits and start solving
    console.log('divisor ', divisor)
    console.log('digitCounter ', digitCounter)

    let upperBound = '1'
    let lowerBound = ''
    for(let i = 0; i < digitCounter; i++){
        upperBound+= '='
        lowerBound+= '2'
    }
    console.log('upperBound lowerBound', upperBound, lowerBound)

    upperBound = snafuTranslate(upperBound)
    lowerBound = snafuTranslate(lowerBound)
    console.log('upperBound lowerBound', upperBound, lowerBound)

    let decString = ''
    if(decimalValue>=upperBound){
        console.log('upperBounder')
        digitCounter++
    }

        console.log('final digitCounter ', digitCounter)
        //set negative flag outside loop
        let negative = false
        while(digitCounter){
            let roundValue = (5 **  (digitCounter-1))
            console.log('decimalValue / roundValue', decimalValue / roundValue, decimalValue, roundValue)
            // test which multiple gets closest to 0
            let test1 = Math.abs(decimalValue - roundValue * 0)
            let test2 = Math.abs(decimalValue - roundValue * 1)
            let test3 = Math.abs(decimalValue - roundValue * 2)
            console.log('test1, test2, test3', test1, test2, test3)
  
            if(test1 < test2 && test1 < test3){
                decimalValue -= roundValue *  0
                decString += 0
            }
  
            if(test2 < test1 && test2 < test3){
                decimalValue -= roundValue *  1
                if(negative){
                    decString += '-'
                }
                else{
                    decString += 1
                }
   
            }
            if(test3 < test2 && test3 < test1){
                decimalValue -= roundValue *  2 
                if(negative){
                    decString += '='
                }
                else{
                    decString += 2
                }
            }

            if (decimalValue<0){
                // flip
                if(negative){negative = false}
                else{negative = true}
            }
            
            decimalValue = Math.abs(decimalValue)
            console.log('decString', decString)
            console.log('negative', negative)
            digitCounter--
        }
 }

function snafuTranslate(string){
    let s = string
    let sLen = s.length
    let itemMult = 1
    let totalValue = 0
    while(sLen){
        if(s[sLen-1] === '-'){
            let currentItemValue = 1 * itemMult
            totalValue -= currentItemValue
        }
        else if(s[sLen-1] === '='){
            let currentItemValue = 2 * itemMult
            totalValue -= currentItemValue
        }
        else{
            let currentItemValue = s[sLen-1] * itemMult
            totalValue += currentItemValue

        }
        itemMult = itemMult * 5
        sLen--
    }
    console.log('totalValue', totalValue)
    return totalValue
}