export function hey(message: string): string {
  let numOfLetters = 0
  let numOfCaps = 0
  let question = false
  let totalChars = 0
  message = message.trim()
  for(let i=0; i< message.length; i++){
    totalChars++
    if(message[i].match(/[a-z]/i)){
      numOfLetters++
      if(message[i] === message[i].toUpperCase()){ numOfCaps++ }
    }
    if(i === message.length-1 && message[i] === '?'){ question = true }
  }
    // test if message is in caps, is a question, has anything except whitespace
    if(numOfLetters != 0 && numOfLetters === numOfCaps && question === false){return 'Whoa, chill out!'}
    if(numOfLetters != 0 && numOfLetters === numOfCaps && question === true)
      {return 'Calm down, I know what I\'m doing!'}
    if(question === true){return 'Sure.'}
    if(totalChars === 0){return 'Fine. Be that way!'}
    return 'Whatever.'
}