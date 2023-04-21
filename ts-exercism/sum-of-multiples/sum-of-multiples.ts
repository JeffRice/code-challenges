export function sum(arr: number[], limit: number): number {
  let multiples = new Set<number>();
  for(const a of arr){
      for(let i=a;i<limit;i++){
           if(i%a===0){ multiples.add(i) }
       }
  }
  return [...multiples].reduce( (acc, cur) => acc + cur, 0  )
}