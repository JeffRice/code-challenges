// @ts-check

/**
 * Given a certain command, help the chatbot recognize whether the command is valid or not.
 *
 * @param {string} command
 * @returns {boolean} whether or not is the command valid
 */

export function isValidCommand(command) {
  if(command.split(' ')[0].match(/chatbot/i)){return true}
  return false
}

/**
 * Given a certain message, help the chatbot get rid of all the emoji's encryption through the message.
 *
 * @param {string} message
 * @returns {string} The message without the emojis encryption
 */
export function removeEmoji(message) {
  let res = ''
  let msgSplit = message.split(' ')
  for(const m of msgSplit){
    if(!m.match(/emoji/)){ res += m + ' ' }
    else{res += ' '}
  }
  return res.trimEnd()
}

/**
 * Given a certain phone number, help the chatbot recognize whether it is in the correct format.
 *
 * @param {string} number
 * @returns {string} the Chatbot response to the phone Validation
 */
export function checkPhoneNumber(number) {
  const re = /^(?:\(\+\d{2}\)\s)\d{3}([-/.])\d{3}\1\d{3}$/;
  if(re.test(number)){  return 'Thanks! You can now download me to your phone.'}
  return 'Oops, it seems like I can\'t reach out to ' + number
}

/**
 * Given a certain response from the user, help the chatbot get only the URL.
 *
 * @param {string} userInput
 * @returns {string[] | null} all the possible URL's that the user may have answered
 */
export function getURL(userInput) {
  const re = /[a-z]+\.[a-z]+/g
  return userInput.match(re)
}

/**
 * Greet the user using the full name data from the profile.
 *
 * @param {string} fullName
 * @returns {string} Greeting from the chatbot
 */
export function niceToMeetYou(fullName) {
  let str = fullName
  const lastName = /[a-z]+,/i
  const firstName = /\s[a-z]+/i
  str = str.replace(/[a-z]+,/i, fullName.match(firstName)).trim()
  str = str.replace(/\s[a-z]+/i, ' ' + fullName.match(/[a-z]+/i)) //remove comma
  return 'Nice to meet you, ' + str
}
