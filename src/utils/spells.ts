import { Spell } from "@/schemas/Spell";
import { spells } from "../globals";

/**
 * @param names a list of the spell's names
 * @returns an array of spells matching the given names
 */
export function getSpells(names: string[]): Spell[] {
  return spells.filter((spell) => names.includes(spell.name));
}

/**
 * @param name the name of the spell
 * @return the spell with the given name
 */
export function getSpell(name: string): Spell | undefined {
  return spells.filter((spell) => spell.name === name).at(0);
}
