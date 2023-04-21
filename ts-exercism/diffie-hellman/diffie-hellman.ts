export class DiffieHellman {
  p: number
  g: number
  constructor(p: number, g: number) {
          if ( p < 1 || g < 1 )
          {        throw new Error('out of bounds');}
      if ( p % 2 === 0 || g % 2 === 0 ) 
          {        throw new Error('not prime');}
  this.p = p
  this.g = g
  }

  public getPublicKey(privateKey: number): number {
              if ( privateKey < 2 || privateKey === this.p || privateKey > this.p  ) 
                { throw new Error('out of bounds');}
        return this.g**privateKey % this.p
  }

  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    return theirPublicKey**myPrivateKey % this.p  
  }
}
