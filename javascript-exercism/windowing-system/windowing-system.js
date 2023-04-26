// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */
export class Size {

  constructor(width = 80, height = 60) {
    this.width = width 
    this.height = height
  }
  
  resize(newWidth, newHeight) {
    this.width = newWidth 
    this.height = newHeight
  }

}

export class Position {

  constructor(x = 0, y = 0) {
    this.x = x 
    this.y = y
  }
  
  move(newX, newY) {
    this.x = newX 
    this.y = newY
  }

}


export class ProgramWindow {

  constructor(screenSize, size, position) {
    this.screenSize = new Size(800, 600) 
    this.size = new Size(80, 60) 
    this.position = new Position(0, 0) 
  }

    resize(newSize) {
      console.log(newSize)
      if(newSize.width > 1){
    this.size.width = newSize.width 
          if(newSize.width + this.position.x > this.screenSize.width ){
             this.size.width = this.screenSize.width - this.position.x
          }
      
      }
      else {
    this.size.width = 1
      }
      if(newSize.height > 1){
    this.size.height = newSize.height 
                  if(newSize.height + this.position.y > this.screenSize.height){
             this.size.height = this.screenSize.height - this.position.y
          }
      
      }
      else {
    this.size.height = 1
      }
  }

      move(newPosition) {
        console.log(newPosition)
        if(newPosition.x > 0){
          this.position.x = newPosition.x
        }
        if( this.size.width + newPosition.x > this.screenSize.width  ){
          this.position.x = newPosition.x - ((this.size.width + newPosition.x) - this.screenSize.width)
    
        }
        if(newPosition.y > 0){
          this.position.y = newPosition.y
        }
        if( this.size.height + newPosition.y > this.screenSize.height  ){
          this.position.y = newPosition.y - ((this.size.height + newPosition.y) - this.screenSize.height)
        }
      }


}

export function changeWindow(programWindow){
   programWindow.size.width = 400
   programWindow.size.height = 300
   programWindow.position.x = 100
   programWindow.position.y = 150
  return programWindow
      }