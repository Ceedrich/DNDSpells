import type { Spell } from "@/schemas/Spell";

export function formatComponents(
  { verbal, gestik, material }: Pick<Spell, "verbal" | "gestik" | "material">,
  long = true,
) {
  const comps = [];
  if (verbal) comps.push("V");
  if (gestik) comps.push("G");
  if (material) {
    if (long) comps.push(`M (${material})`);
    else comps.push("M");
  }
  if (long) return comps.join(",");
  else return comps.join(", ");
}
