//
// This is only a SKELETON file for the 'Diffie Hellman' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export class DiffieHellman {
  
  constructor(p, g) {
      if ( p < 1 || g < 1 )
          {        throw new Error('out of bounds');}
      if ( p % 2 === 0 || g % 2 === 0 ) 
          {        throw new Error('not prime');}
  this.p = p
  this.g = g
  }

  getPublicKey(privateKey) {

          if ( privateKey < 2 || privateKey === this.p || privateKey > this.p  ) 
                { throw new Error('out of bounds');}
        return this.g**privateKey % this.p
  }

  
  getSecret(theirPublicKey, myPrivateKey) {
    return theirPublicKey**myPrivateKey % this.p     
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
