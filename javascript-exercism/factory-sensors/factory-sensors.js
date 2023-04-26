// @ts-check

export class ArgumentError extends Error {
    constructor() {
    super(`Argument Error!`);
  }
}

export class UnknownError extends Error {
    constructor() {
    super(`Unknown Error!`);
  }
}

export class OverheatingError extends Error {
  constructor(temperature) {
    if(temperature > 600){
    throw new ShutdownError(temperature);
    }
    
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

export class ShutdownError extends Error {
  constructor(temperature) {
    super(`The temperature is ${temperature} ! SHUTDOWN !`);
    this.temperature = temperature;
  }
}

/**
 * Check if the humidity level is not too high.
 *
 * @param {number} humidityPercentage
 * @throws {Error}
 */
export function checkHumidityLevel(humidityPercentage) {
  if(humidityPercentage > 70){
    throw new Error({message: 'Oops'});
  }
}

/**
 * Check if the temperature is not too high.
 *
 * @param {number|null} temperature
 * @throws {ArgumentError|OverheatingError}
 */
export function reportOverheating(temperature) {
    if(temperature === null){
    throw new ArgumentError({message: 'Oops'});
  }
    if(temperature > 600){
    throw new shutdownError(temperature);
  }
  if(temperature > 500 ){
    throw new OverheatingError(temperature);
  }
}

/**
 *  Triggers the needed action depending on the result of the machine check.
 *
 * @param {{
 * check: function,
 * alertDeadSensor: function,
 * alertOverheating: function,
 * shutdown: function
 * }} actions
 * @throws {ArgumentError|OverheatingError|Error}
 */
export function monitorTheMachine(actions) {
    

  
try {
  let test = actions.check()
      
} catch (test) {
  if (test instanceof ArgumentError) {
    actions.alertDeadSensor()
    console.log('The error thrown is an instance of the ArgumentError');
  }
  else if (test instanceof OverheatingError) {
    actions.alertOverheating()
    console.log('The error thrown is an instance of the OverheatingError');
  }
  else if (test instanceof ShutdownError) {
    actions.shutdown()
    console.log('The error thrown is an instance of the ShutdownError');
  }
  else{
  actions.check()
  }

  
}

 return test
  
}
