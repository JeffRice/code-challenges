// @ts-check

/**
 * Double every card in the deck.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with every card doubled
 */
export function seeingDouble(deck) {
  return deck.map(x => x * 2 )
}

/**
 *  Creates triplicates of every 3 found in the deck.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with triplicate 3s
 */
export function threeOfEachThree(deck) {
  let triplicate = deck.reduce(
  (accumulator, currentValue) => {
    if (currentValue % 3 === 0) {
      accumulator.triplicate.push(currentValue);
      accumulator.triplicate.push(currentValue);
      
    } 
      accumulator.total.push(currentValue);
      accumulator.triplicate.push(currentValue);
    return accumulator;
  },
  { total: [], triplicate: [] }
);
  return triplicate.triplicate
}

/**
 * Extracts the middle two cards from a deck.
 * Assumes a deck is always 10 cards.
 *
 * @param {number[]} deck of 10 cards
 *
 * @returns {number[]} deck with only two middle cards
 */
export function middleTwo(deck) {
  return deck.slice(4, 6)
}

/**
 * Moves the outside two cards to the middle.
 *
 * @param {number[]} deck with even number of cards
 *
 * @returns {number[]} transformed deck
 */

export function sandwichTrick(deck) {
  let last = deck.pop()
  let first = deck.shift()
  console.log(deck)
  deck.splice(deck.length / 2, 0, first)
  deck.splice(deck.length / 2, 0, last)
  return deck
}

/**
 * Removes every card from the deck except 2s.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with only 2s
 */
export function twoIsSpecial(deck) {
  return deck.filter(x => x === 2)
}

/**
 * Returns a perfectly order deck from lowest to highest.
 *
 * @param {number[]} deck shuffled deck
 *
 * @returns {number[]} ordered deck
 */
export function perfectlyOrdered(deck) {
  let sortedDeck = deck.sort(function(a, b) {
    return a - b;
  })

  return sortedDeck
}

function compareNumbers(a, b) {
    return a - b;
  }

/**
 * Reorders the deck so that the top card ends up at the bottom.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} reordered deck
 */
export function reorder(deck) {
  return deck.reverse()
}
