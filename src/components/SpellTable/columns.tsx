"use client";

import { ColumnDef, HeaderContext, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { schulen, type Spell } from "@/schemas/Spell";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatComponents } from "@/utils/formatComponents";

const sortingHeader = (header: string) =>
  function Header({ column }: HeaderContext<Spell, unknown>) {
    return (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {header} <ArrowUpDown className="ml-1" />
        </Button>
      </>
    );
  };

const categoryFilter =
  (categories: readonly string[]) =>
  (row: Row<Spell>, id: string, filterValue: (typeof categories)[number][]) => {
    return filterValue.includes(row.getValue(id));
  };

const numberFilter =
  () =>
  (row: Row<Spell>, id: string, { min, max }: { min: number; max: number }) => {
    const value = parseInt(row.getValue(id));
    return value <= max && value >= min;
  };

export const columns: ColumnDef<Spell>[] = [
  {
    id: "selected",
    enableHiding: false,
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
    enableHiding: false,
  },
  {
    accessorKey: "grad",
    header: sortingHeader("Grad"),
    filterFn: numberFilter(),
  },
  {
    accessorKey: "schule",
    header: sortingHeader("Schule"),
    filterFn: categoryFilter(schulen),
  },
  {
    accessorKey: "zeitaufwand",
    header: sortingHeader("Zeitaufwand"),
  },
  {
    id: "komponenten",
    header: "Komponenten",
    accessorFn: (row) => formatComponents({ ...row }, false),
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
