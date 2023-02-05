// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
  console.log(array1, array2)

    let number1 = parseInt(array1.reduce((acc, cur) => acc + cur, ' '))
    let number2 = parseInt(array2.reduce((acc, cur) => acc + cur, ' '))

  console.log(number1, number2)
  return number1 + number2
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean} whether the number is a palindrome or not
 */
export function luckyNumber(value) {
  let strings = String(value)
  let x = strings.length
  let palindrome = true
  for (var i = 0; i < x/2; i++){
    if (strings[i] != strings[x - 1 - i]){palindrome = false} // if digit index doesnt equal its mirror
  }
  return palindrome
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
  console.log(input)
  if (input === '' || input === null || input === undefined)
      return 'Required field'
  let numberInput = Number(input)
      if( isNaN(numberInput) || numberInput < 1 ){
      return 'Must be a number besides 0'
    }
  return ''
}

