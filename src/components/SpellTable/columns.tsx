"use client";

import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import type { Spell } from "@/schemas/Spell";
import { Button } from "../ui/button";

const sortingHeader =
  (header: string) =>
  ({ column }: HeaderContext<Spell, unknown>) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header} <ArrowUpDown />
    </Button>
  );
export const columns: ColumnDef<Spell>[] = [
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
