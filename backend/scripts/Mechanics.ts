import { CharacterFull } from "../scripts/BattleManager";

export const RegisterSkillFunctions = (character: CharacterFull | null) => {
    if (character) {
        character.TakeDamage = TakeDamage.bind(character);
    } else {
        console.error('Cannot register skill functions on a null character');
    }
}

const TakeDamage = function(this: CharacterFull, amount: number) {
    this.health -= amount;
}
