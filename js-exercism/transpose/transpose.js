//
// This is only a SKELETON file for the 'Transpose' exercise. It's been provided as a
// convenience to get you started writing code faster.
//








export const transpose = (d) => {


  
  var output = []
  var maxLength = 0

const performanceTest = (getLEngthFn, iterations) => {

  console.time(getLEngthFn.name);
  d.forEach(d => maxLength = Math.max(maxLength, d.length))
  console.timeEnd(getLEngthFn.name);
}


  for (var i = 0; i < d.length; i++){

    for (var z = 0; z < d[i].length; z++){

       // if the array index already exists
          if(output[z]){
    output[z] = output[z] + d[i].charAt(z)

            
        // add whitespaces if not longest string or last
     if ((z + 1) === d[i].length) {
          if (d[i].length < maxLength) {
          
            for ( var difference = d[i].length; difference < maxLength; difference++) {

                if (i + 1 < d.length){
                  
                  output[difference] += ' '
                }
              
                              if (i >= d.length - 1)
              {
                output[difference].trim()
              }
              
                
            }
             
          }
      }

            
          }
        // if the array index does not exist yet
      else {
         output.push(d[i].charAt(z))

        // add whitespaces if not longest string
        if ((z + 1) === d[i].length  && i < d.length - 1){
          if (d[i].length < maxLength) {
          
            for ( var difference = d[i].length ; difference < maxLength; difference++) {

                
                  output.push(' ')
              if (i === d.length - 1)
              {
                output.trim()
              }
                

            }
             
          }
          
        }
          


        
  //      }
      } 


      
    }


    
  }

  if(output.length) 
  {  output[output.length - 1] = output[output.length - 1].trimEnd();}

  return output
  
};

