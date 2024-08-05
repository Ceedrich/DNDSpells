import { SpellCardGrid } from "@/components/SpellCardGrid";
import { Button } from "@/components/ui/button";
import { getSpells } from "@/utils/spells";
import { Undo } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "../_components/ExportButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default async function Export({ params }: { params: { slug: string } }) {
  var data;
  try {
    data = JSON.parse(atob(decodeURIComponent(params.slug)));
  } catch {
    return invalidRequest();
  }
  if (!Array.isArray(data)) return invalidRequest();

  return (
    <div className="container">
      <header className="py-4 flex gap-4 items-center print:hidden">
        <Button variant="outline" asChild>
          <Link href="/">
            Zurück <Undo className="ml-2" />
          </Link>
        </Button>
        <ExportButton />
        <Label htmlFor="card-layout">Karteikarten-Layout</Label>
        <Switch id="card-layout" />
      </header>
      <SpellCardGrid spells={getSpells(data)} />
    </div>
  );
}

function invalidRequest() {
  return "Fail";
}
