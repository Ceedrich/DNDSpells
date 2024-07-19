import { columns } from "@/components/SpellTable/columns";
import { SpellTable } from "@/components/SpellTable/table";
import { spells } from "@/globals";

export default async function Home() {
  return (
    <>
      <h1 className="text-4xl">Header and stuff</h1>
      <br />
      <br />
      <br />
      <br />
      <br />

      <SpellTable columns={columns} data={spells} />
    </>
  );
}
