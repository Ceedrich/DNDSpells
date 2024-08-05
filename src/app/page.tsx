import { columns } from "@/components/SpellTable/columns";
import { SpellTable } from "@/components/SpellTable/table";
import { spells } from "@/globals";

export default function Home() {
  return (
    <>
      <header className="p-4">
        <h1 className="text-4xl font-semibold font-heading">
          Dungeons and Dragons: Zauber
        </h1>
      </header>
      <main>
        <SpellTable columns={columns} data={spells} />
      </main>
    </>
  );
}
