interface Schoolobj {
    [key: number]: string[]
}
export class GradeSchool {

  schoolRoster : Schoolobj = {}

  roster(): Schoolobj {
    let newRoster: Schoolobj = {}
    for (const gradeNum in this.schoolRoster) {
        newRoster[Number(gradeNum)] = this.schoolRoster[gradeNum].slice()
    }
    return  newRoster
  }

  add(name: string, grade: number) {
    for (const gradeNum in this.schoolRoster) {
      this.schoolRoster[gradeNum] = this.schoolRoster[gradeNum].filter(x => x!==name)
    }
    if(!this.schoolRoster[grade]){ this.schoolRoster[grade] = [name] }    
    else{
      this.schoolRoster[grade].push(name)
      this.schoolRoster[grade] = this.schoolRoster[grade].sort()
    }
  }

  grade(grade:number) {
    return this.schoolRoster[grade]===undefined ? [] : this.schoolRoster[grade].slice()
  }
}