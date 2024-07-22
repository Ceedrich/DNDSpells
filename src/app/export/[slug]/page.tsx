import { SpellCardGrid } from "@/components/SpellCardGrid";
import { getSpells } from "@/utils/getSpells";

export default function Export({ params }: { params: { slug: string } }) {
  var data;
  try {
    data = JSON.parse(atob(decodeURIComponent(params.slug)));
  } catch {
    return invalidRequest();
  }
  if (!Array.isArray(data)) return invalidRequest();

  return (
    <div className="container">
      <SpellCardGrid spells={getSpells(data)} />
    </div>
  );
}

function invalidRequest() {
  return "Fail";
}
