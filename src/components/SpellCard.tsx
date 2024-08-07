import { Spell } from "@/schemas/Spell";
import { formatComponents } from "@/utils/formatComponents";
import { cn } from "@/lib/utils";
import { Markdown } from "./Markdown";

type SpellCardProps = {
  spell: Spell;
  variant?: "fixed" | "variable";
};

export function SpellCard({ spell, variant = "variable" }: SpellCardProps) {
  // DIN-A6
  const widthFixed = 148; // mm
  const heightFixed = 105; // mm

  const description = spell.beschreibung.join("\n\n");

  return (
    <div
      className={cn(
        "p-5 bg-parchment text-black rounded-sm ",
        "break-inside-avoid",
        // variant === "fixed" && `h-[${heightFixed}mm] w-[${widthFixed}mm]`,
      )}
    >
      <div
        className="text-2xl font-heading text-heading print:text-lg"
        style={{ fontVariantCaps: "small-caps" }}
      >
        {spell.name}
      </div>
      <span className="italic">
        {spell.schule} des {spell.grad}. Grades
      </span>
      <ul>
        <li>
          <span className="font-bold">Zeitaufwand: </span>
          {spell.zeitaufwand}
        </li>
        <li>
          <span className="font-bold">Reichweite: </span>
          {spell.reichweite}
        </li>
        <li>
          <span className="font-bold">Komponenten: </span>
          {formatComponents(spell)}
        </li>
        <li>
          <span className="font-bold">Wirkungsdauer: </span>
          {spell.wirkungsdauer}
        </li>
      </ul>
      <div>
        <Markdown>{description}</Markdown>
      </div>
    </div>
  );
}
