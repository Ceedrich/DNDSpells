import { parse as parseTOML } from "toml";
import { readFileSync } from "fs";
import { spellSchema } from "@/schemas/Spell";
import { z } from "zod";

const spellFileSchema = z.object({
  zauber: z.array(spellSchema),
});

export const spells = (() => {
  const file = readFileSync("spells.toml", "utf-8");
  const tomlData = parseTOML(file);
  const data = spellFileSchema.parse(tomlData);
  return data.zauber;
})();
