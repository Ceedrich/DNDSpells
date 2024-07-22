import { Spell } from "@/schemas/Spell";
import { formatComponents } from "@/utils/formatComponents";
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
          {formatComponents(spell)}
        </li>
        <li>
          <span className="font-bold">Wirkungsdauer: </span>
          {spell.wirkungsdauer}
        </li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: spell.beschreibung_HTML }}></div>
    </div>
  );
}
