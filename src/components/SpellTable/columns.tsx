"use client";

import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import type { Spell } from "@/schemas/Spell";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const sortingHeader = (header: string) =>
  function Header({ column }: HeaderContext<Spell, unknown>) {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header} <ArrowUpDown className="ml-1" />
      </Button>
    );
  };

export const columns: ColumnDef<Spell>[] = [
  {
    id: "selected",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Alles auswählen"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Zeile auswählen"
      />
    ),
  },
  {
    accessorKey: "name",
    header: sortingHeader("Name"),
  },
  {
    accessorKey: "grad",
    header: sortingHeader("Grad"),
  },
  {
    accessorKey: "schule",
    header: sortingHeader("Schule"),
  },
  {
    accessorKey: "zeitaufwand",
    header: sortingHeader("Zeitaufwand"),
  },
  {
    id: "komponenten",
    header: sortingHeader("Komponenten"),
    accessorFn: (row) => {
      const comps = [];
      if (row.verbal) comps.push("V");
      if (row.gestik) comps.push("G");
      if (row.material) comps.push("M");
      return comps.join(",");
    },
  },
  {
    accessorKey: "konzentration",
    header: sortingHeader("Konzentration"),
    cell: ({ getValue }) => (getValue() ? "Konzentration" : ""),
  },
  {
    accessorKey: "reichweite",
    header: sortingHeader("Reichweite"),
    // TODO: Add sorting function that makes sense
  },
  {
    accessorKey: "ritual",
    header: sortingHeader("Ritual"),
    cell: ({ getValue }) => (getValue() ? "Ritual" : ""),
  },
  {
    accessorKey: "beschreibung",
    header: "Beschreibung",
    cell: ({ row }) => {
      const description = row.getValue("beschreibung") as string[];
      return (
        <div className="text-left font-medium text-ellipsis">
          {description.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      );
    },
  },
];
