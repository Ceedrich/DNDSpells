import { Spell } from "@/schemas/Spell";

type SpellCardProps = {
  spell: Spell;
};

export function SpellCard({ spell }: SpellCardProps) {
  return (
    <div className="p-5 bg-yellow-100 text-black">
      <div className="text-2xl uppercase">{spell.name}</div>
      <span className="italic">
        {spell.schule} des {spell.grad}. Grades
      </span>
    </div>
  );
}
