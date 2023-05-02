export function isValid(isbn: string): boolean {
  isbn = isbn.replaceAll('-', '')
  let isbnArr = []
  if(isbn.length!==10){return false}
  for(let i=0; i<isbn.length; i++){
    isbnArr.push(isbn[i])
    if(i===isbn.length-1){
      if(isbn[i].match(/[a-z]/i) && isbn[i]!=='X'){
        return false
      }
    }
    else{
      if(isbn[i].match(/[a-z]/i)){return false}
    }
  }

  let n = 10
  let total = 0
  for(const item of isbnArr){
    if(item === 'X'){total+= 10}
    else{total+= Number(item)*n}
    n--
  }
  if(total%11===0){return true}
  return false
}