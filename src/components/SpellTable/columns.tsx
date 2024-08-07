"use client";

import { ColumnDef, HeaderContext, Row } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";

import { klassen, schulen, type Spell } from "@/schemas/Spell";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { formatComponents } from "@/utils/formatComponents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "../Markdown";

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
// BUG: Something wrong here, but i don't know what.
// It fails if you deselect all "klassen" and then selecte one "klasse" again...
const categoryFilter =
  (categories: readonly string[]) =>
  (row: Row<Spell>, id: string, filterValue: (typeof categories)[number][]) => {
    const value = row.getValue(id);
    if (typeof value === "string") {
      if (value === "") return true;
      return filterValue.includes(value);
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      return value.filter((val) => filterValue.includes(val)).length > 0;
    }
    return false;
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
    accessorKey: "klassen",
    header: sortingHeader("Klassen"),
    filterFn: categoryFilter(klassen),
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
      const description = row.getValue("beschreibung");
      return (
        <Dialog>
          <DialogTrigger>
            <Info />
          </DialogTrigger>
          <DialogContent>
            <DialogDescription>
              <Markdown>
                {Array.isArray(description)
                  ? description.join("\n\n")
                  : "Keine Beschreibung verfügbar"}
              </Markdown>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
