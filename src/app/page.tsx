import { columns } from "@/components/SpellTable/columns";
import { SpellTable } from "@/components/SpellTable/table";
import { spells } from "@/globals";

export default async function Home() {
  return (
    <div className="container">
      <h1 className="text-4xl">Dungeons and Dragons: Zauber</h1>
      <SpellTable columns={columns} data={spells} />
    </div>
  );
}
