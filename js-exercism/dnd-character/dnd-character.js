//
// This is only a SKELETON file for the 'D&D Character' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const abilityModifier = (d) => {
  if (d < 3)
      throw new Error('Ability scores must be at least 3')
  if (d > 18)
      throw new Error('Ability scores can be at most 18')
   return Math.floor((d - 10) / 2) 
};

export class Character {
  static rollAbility() {
    let rolls = Array.from([getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6)], );
    const lowRollIndex = rolls.indexOf(Math.min(...rolls));
    rolls.splice(lowRollIndex, 1); //remove lowest roll
    return rolls.reduce((acc, cur) => acc + cur, 0);
  }

  get strength() {
    if (!Character.strength) {
      return Character.strength = Character.rollAbility();
    }
      return Character.strength
  }

  get dexterity() {
    if (!Character.dexterity) {
      return Character.dexterity = Character.rollAbility();
    }
      return Character.dexterity
  }

  get constitution() {
    if (!Character.constitution) {
      return Character.constitution = Character.rollAbility();
    }
      return Character.constitution
  }

  get intelligence() {
    if (!Character.intelligence) {
      return Character.intelligence = Character.rollAbility();
    }
      return Character.intelligence
  }

  get wisdom() {
    if (!Character.wisdom) {
      return Character.wisdom = Character.rollAbility();
    }
      return Character.wisdom
  }

  get charisma() {
    if (!Character.charisma) {
      return Character.charisma = Character.rollAbility();
    }
      return Character.charisma
  }

  get hitpoints() {
     return 10 + abilityModifier(this.constitution)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

