export function keep<T>(d: T[], pred: (val: T) => boolean): T[] {
  let res = []
  for(const data in d){
     if( pred(d[data])===true ){ res.push(d[data]) }
  }
  return res
}

export function discard<T>(d: T[], pred: (val: T) => boolean): T[] {
return keep(d, (val) => !pred(val) )
}