/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *

 */
  export function cookingStatus(timeLeft) {
    let message = ''
    if(timeLeft === 0){
      message =  'Lasagna is done.'
    }
    if(timeLeft !== 0){
      message = 'Not done, please wait.'
    }
        if(timeLeft === undefined){
      message = 'You forgot to set the timer.'
    }
    return message
  }

  export function preparationTime(layers, avgTime = 2) {
    return layers.length * avgTime
  }

  export function quantities(layers) {
    let noodles = layers.filter(x => x === 'noodles')
    let sauce = layers.filter(x => x === 'sauce')

    let prepObject = {noodles: noodles.length * 50,
                      sauce: sauce.length * 0.2}
    return prepObject
  }

  export function addSecretIngredient(friendList, List) {
    List.push(friendList[friendList.length - 1])
  }

  export function scaleRecipe(recipe, portions) {
   let prepObject = {}

    for(const ingredient in recipe){
        prepObject[ingredient] = (0.5 * recipe[ingredient]) * portions
    }
    return prepObject
  }