export class Series {
  seriesStr: string
  constructor(series: string) {
    if(series === ''){throw new Error('series cannot be empty')}
    this.seriesStr = series
  }

  slices(sliceLength: number): number[][] {
    if(sliceLength < 0){throw new Error('slice length cannot be negative')}
    if(sliceLength === 0){throw new Error('slice length cannot be zero')}
    if(sliceLength > this.seriesStr.length){throw new Error('slice length cannot be greater than series length')}
    let allSlices = []
    for(let i=0;i<this.seriesStr.length;i++){
        if(i<=this.seriesStr.length-sliceLength){
        let tmpArr = []
          for(let j = 0; j < sliceLength; j++){
            tmpArr.push(Number(this.seriesStr[i+j]))
          }
          allSlices.push(tmpArr)
        }
    }
    return allSlices
  }
}