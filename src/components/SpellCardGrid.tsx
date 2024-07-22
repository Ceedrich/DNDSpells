import { type Spell } from "@/schemas/Spell";
import { SpellCard } from "./SpellCard";

export function SpellCardGrid({ spells }: { spells: Spell[] }) {
  return (
    <div className="print:columns-2 print:space-y-4 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
      {spells.map((spell) => (
        <SpellCard spell={spell} key={spell.name} />
      ))}
    </div>
  );
}
