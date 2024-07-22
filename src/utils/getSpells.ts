import { spells as spells_db } from "@/globals";

/**
 * @param spells a list of the spell's names
 * @returns an array of spells matching the given names
 */
export function getSpells(spells: string[]) {
  console.log(spells, "Arkanes Auge" in spells);
  return spells_db.filter((spell) => spells.indexOf(spell.name) > -1);
}
