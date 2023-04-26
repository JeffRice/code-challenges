// @ts-check

/**
 * Determine how many cards of a certain type there are in the deck
 *
 * @param {number[]} stack
 * @param {number} card
 *
 * @returns {number} number of cards of a single type there are in the deck
 */
export function cardTypeCheck(stack, card) {
  let cardCount = 0
    for (const currentCard of stack) {
      if (currentCard === card) {
        cardCount++
      }
}
  return cardCount
}

/**
 * Determine how many cards are odd or even
 *
 * @param {number[]} stack
 * @param {boolean} type the type of value to check for - odd or even
 * @returns {number} number of cards that are either odd or even (depending on `type`)
 */
export function determineOddEvenCards(stack, type) {  
      let oddCount = 0
      let evenCount = 0
    for (const currentCard of stack) {
      if (currentCard % 2 === 0) {
        evenCount++
      }
      else {
        oddCount++
      }
}
      if (type === true){
        return evenCount
      }
        return oddCount
  
}
