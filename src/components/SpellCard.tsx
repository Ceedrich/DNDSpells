import { Spell } from "@/schemas/Spell";
import { ComponentProps } from "react";

type SpellCardProps = {
  spell: Spell;
} & ComponentProps<"div">;

export function SpellCard({ spell }: SpellCardProps) {
  return (
    <div className="p-5 bg-yellow-100 text-black rounded-sm">
      <div className="text-2xl uppercase">{spell.name}</div>
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
          {/* TODO  */}
        </li>
        <li>
          <span className="font-bold">Wirkungsdauer: </span>
          {spell.wirkungsdauer}
        </li>
      </ul>
      <div>
        {spell.beschreibung.map((p, i) => (
          <p key={i}>
            {p
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>")}
          </p>
        ))}
      </div>
    </div>
  );
}
