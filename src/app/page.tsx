import { SpellCard } from "@/components/SpellCard";

export default function Home() {
  return (
    <SpellCard
      spell={{
        name: "Ablenkung",
        schule: "Illusion",
        grad: 5,
        reichweite: "selbst",
        klassen: [],
        beschreibung: [
          "Du wirst unsichtbar, gleichzeitig erscheint ein illusionäres Abbild von dir selbst dort, wo du stehst. Dieses Abbild bleibt für die Wirkungsdauer bestehen, aber die Unsichtbarkeit endet, wenn du angreifst oder einen Zauber wirkst.",
          "Als Aktion kannst du dein illusionäres Abbild bis zu deiner doppelten Bewegungsrate bewegen und es gestikulieren, sprechen und auf jede Art handeln lassen, die du möchtest.",
          "Du kannst durch seine Augen sehen und durch seine Ohren hören, als würdest du dort stehen, wo es sich aufhält",
          "In jedem deiner Züge kannst du als Bonusaktion von deinen Sinnen zu den Sinnen des Abbilds wechseln und andersherum. Solange du seine Sinne nutzt, bist du blind und taub für deine eigene Umgebung",
        ],
        gestik: true,
        konzentration: true,
        wirkungsdauer: "bis zu 1 Stunde",
        zeitaufwand: "1 Aktion",
      }}
    />
  );
}
