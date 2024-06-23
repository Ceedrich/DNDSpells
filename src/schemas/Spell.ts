import { z } from "zod";

export const spellSchema = z.object({
  name: z.string(),
  grad: z.number().int().min(0).max(9),
  beschreibung: z.array(z.string()),
  klassen: z.array(
    z.union([
      z.literal("Kleriker"),
      z.literal("Druide"),
      z.literal("Paladin"),
      z.literal("Waldläufer"),
      z.literal("Zauberer"),
      z.literal("Hexenmeister"),
      z.literal("Magier"),
    ]),
  ),
  schule: z.union([
    z.literal("Bannmagie"),
    z.literal("Beschwörung"),
    z.literal("Erkenntnis"),
    z.literal("Verzauberung"),
    z.literal("Hervorrufung"),
    z.literal("Illusion"),
    z.literal("Nekromantie"),
    z.literal("Verwandlung"),
  ]),
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
