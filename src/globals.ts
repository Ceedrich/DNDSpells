import { parse as parseTOML } from "toml";
import { readFileSync } from "fs";
import { spellSchema } from "@/schemas/Spell";
import { z } from "zod";

const spellFileSchema = z.object({
  zauber: z.array(spellSchema),
});

const tohtml = (s: string) => {
  let html = s.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Parse italic: *...*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return html;
};

export const spells = (() => {
  const file = readFileSync("spells.toml", "utf-8");
  const tomlData = parseTOML(file);
  const data = spellFileSchema.parse(tomlData);
  return data.zauber.map((spell) => {
    const beschreibung = spell.beschreibung
      .map((p) => `<p>${tohtml(p)}</p>`)
      .join("\n");
    return {
      ...spell,
      beschreibung_HTML: beschreibung,
    };
  });
})();
