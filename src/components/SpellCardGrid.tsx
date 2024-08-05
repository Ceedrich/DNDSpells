import { type Spell } from "@/schemas/Spell";
import { SpellCard } from "./SpellCard";
import { cn } from "@/lib/utils";

export function SpellCardGrid({ spells }: { spells: Spell[] }) {
  return (
    <div
      className={cn(
        "print:columns-2 print:space-y-2 print:gap-2 print:block",
        "md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3",
      )}
    >
      {spells.map((spell, i) => (
        <SpellCard spell={spell} key={i} variant="fixed" />
      ))}
    </div>
  );
}
