export class DnDCharacter {
  strength: number = DnDCharacter.generateAbilityScore();
  dexterity: number = DnDCharacter.generateAbilityScore();
  constitution: number = DnDCharacter.generateAbilityScore();
  intelligence: number = DnDCharacter.generateAbilityScore();
  wisdom: number = DnDCharacter.generateAbilityScore();
  charisma: number = DnDCharacter.generateAbilityScore();
  hitpoints: number
  
  public static generateAbilityScore(): number {
    let rolls = Array.from([getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6)], );
    const lowRollIndex = rolls.indexOf(Math.min(...rolls));
    rolls.splice(lowRollIndex, 1); //remove lowest roll
    return rolls.reduce((acc, cur) => acc + cur, 0);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2) 
  }

  constructor() {
      this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
      console.log(this)}
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive 
}