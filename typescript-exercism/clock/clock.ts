export class Clock {
  hours: number
  minutes: number
  
  constructor(hour: number, minute: number = 0) {
    this.hours = hour
    this.minutes = minute
  }

  public toString(): string {
    while(this.minutes>=60){this.minutes-=60;this.hours++}
    while(this.minutes<0){this.minutes+=60;this.hours--}
    while(this.hours>=24){this.hours-=24}
    while(this.minutes>=60){this.minutes-=60;this.hours++}
    while(this.hours<0){this.hours+=24}
    
    if(this.minutes>=10 && this.hours<10){       return(`0${this.hours}:${this.minutes}`)  }
    else if(this.minutes<10 && this.hours>=10){  return(`${this.hours}:0${this.minutes}`)  }
    else if(this.minutes<10 && this.hours<10){   return(`0${this.hours}:0${this.minutes}`) }
    return(`${this.hours}:${this.minutes}`)
  }

  public plus(minutes: number) {
    this.minutes+=minutes
    return new Clock(this.hours, this.minutes)
  }

  public minus(minutes: number) {
    this.minutes-=minutes
    return new Clock(this.hours, this.minutes)
  }

  public equals(test: Clock): boolean {
    if(this.toString()===test.toString()){return true}
    return false
  }
}