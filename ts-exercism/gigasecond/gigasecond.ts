const GIGASECOND = 10 ** 12
export class Gigasecond {
    time: Date;  
    constructor(date: Date) {
    this.time = new Date(+date);
  }
  public date() {
  return new Date(Date.UTC(70, 0, 1, 0, 0, 0, this.time.getTime() + GIGASECOND));
  }
}
