const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

export const rotate = (str, key) => {
  let rotatedAlphabet = 'abcdefghijklmnopqrstuvwxyz'
  let rotated = str

    for (var i = 0; i < key; i++){
        let firstLetter = rotatedAlphabet.slice(0, 1)
        let restOfCipher = rotatedAlphabet.substring(1, rotatedAlphabet.length)
        rotatedAlphabet = restOfCipher.concat(firstLetter)
   }

    for (var i = 0; i < str.length; i++){
      let alreadyRotated = rotated.substring(0, i)
      let notRotated = rotated.substring(i, rotated.length)
      let alphaIndex = ALPHABET.indexOf(str[i].toLowerCase())
      let target = str.substring(i, i + 1)
      let targetText = rotatedAlphabet[alphaIndex]
        //if char isnt in the alphabet leave it alone
        if (alphaIndex < 0) {
        }
      else {
          if (str[i] == str[i].toUpperCase()){
          notRotated = notRotated.replace(target, targetText.toUpperCase())
          }
           else {
         notRotated = notRotated.replace(target, targetText)
           }
      }
      rotated = alreadyRotated.concat(notRotated)
      console.log(rotatedAlphabet, alphaIndex, target, targetText, rotated, str)
    }
    return rotated
};
