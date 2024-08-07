import { z } from "zod";

export const klassen = [
  "Barde",
  "Kleriker",
  "Druide",
  "Paladin",
  "Waldläufer",
  "Zauberer",
  "Hexenmeister",
  "Magier",
] as const;

export const schulen = [
  "Bannmagie",
  "Beschwörung",
  "Erkenntnis",
  "Verzauberung",
  "Hervorrufung",
  "Illusion",
  "Nekromantie",
  "Verwandlung",
] as const;

export const spellSchema = z.object({
  name: z.string(),
  grad: z.number().int().min(0).max(9),
  beschreibung: z.array(z.string()),
  klassen: z.array(z.enum(klassen)),
  schule: z.enum(schulen),
  reichweite: z.string(),
  wirkungsdauer: z.string(),
  zeitaufwand: z.string(),
  verbal: z.boolean().optional(),
  gestik: z.boolean().optional(),
  material: z.string().optional(),
  konzentration: z.boolean().optional(),
  ritual: z.boolean().optional(),
});

export type Spell = z.infer<typeof spellSchema>;
