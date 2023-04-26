export class Matrix {
  entryRows: number[][] = []
  entryCols: number[][] = []
  
  constructor(entry: string) {
    let splitStr = entry.split('\n')
    for(const e of splitStr){
      let rowSplit = e.split(' ')
      let newRow = []
      for(const r of rowSplit){ newRow.push(Number(r)) }
      this.entryRows.push(newRow)      
    }
    for(let i=0;i<this.entryRows.length;i++){ 
        let newCol = []
        for(let j =0;j<this.entryRows.length;j++){
                    newCol.push(this.entryRows[j][i])
        }
      this.entryCols.push(newCol)    
      }
  }

  get rows(): number[][] { return this.entryRows }
  get columns(): number[][] { return this.entryCols }
}