export function age(planet: string, seconds: number): number {
    if(planet === 'earth'){   return parseFloat( (seconds / 31557600).toFixed(2) ) }
    if(planet === 'mars'){    return parseFloat( (seconds / (31557600*1.8808158) ).toFixed(2) ) }
    if(planet === 'mercury'){ return parseFloat( (seconds / (31557600*0.2408467) ).toFixed(2) ) }
    if(planet === 'venus'){   return parseFloat( (seconds / (31557600*0.61519726) ).toFixed(2) ) }
    if(planet === 'jupiter'){ return parseFloat( (seconds / (31557600*11.862615) ).toFixed(2) ) }
    if(planet === 'saturn'){  return parseFloat( (seconds / (31557600*29.447498) ).toFixed(2) ) }
    if(planet === 'uranus'){  return parseFloat( (seconds / (31557600*84.016846) ).toFixed(2) ) }
    if(planet === 'neptune'){ return parseFloat( (seconds / (31557600*164.79132) ).toFixed(2) ) }
  return 0
}