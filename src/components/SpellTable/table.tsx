"use client";

// Guide: https://ui.shadcn.com/docs/components/data-table

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table,
} from "@tanstack/react-table";

import {
  Table as TableRoot,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { klassen, schulen } from "@/schemas/Spell";
import { DualRangeSlider } from "../ui/dual-range-slider";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function SpellTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [schuleFilter, setSchuleFilter] = useState<(typeof schulen)[number][]>([
    ...schulen,
  ]);
  const [klassenFilter, setKlassenFilter] = useState<
    (typeof klassen)[number][]
  >([...klassen]);

  const [gradFilter, setGradFilter] = useState({ min: 0, max: 9 });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    beschreibung: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="italic">
            <Button variant="outline">Spalten auswählen</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-8 py-4">
        <div className="title">
          <strong>Filter: </strong>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Schulen</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem
              checked={
                schuleFilter.length === schulen.length
                  ? true
                  : schuleFilter.length === 0
                    ? false
                    : "indeterminate"
              }
              onCheckedChange={(checked) => {
                const data = checked ? [...schulen] : [];
                setSchuleFilter(data);
                table.getColumn("schule")?.setFilterValue(data);
              }}
            >
              Alle
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />

            {schulen.map((schule, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                checked={schuleFilter.includes(schule)}
                onCheckedChange={(value) => {
                  if (value) {
                    setSchuleFilter([...schuleFilter, schule]);
                    table
                      .getColumn("schule")
                      ?.setFilterValue([...schuleFilter, schule]);
                  } else {
                    const x = schuleFilter.filter((s) => s != schule);
                    setSchuleFilter(x);
                    table.getColumn("schule")?.setFilterValue(x);
                  }
                }}
              >
                {schule}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Klassen</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {klassen.map((klasse, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                checked={klassenFilter.includes(klasse)}
                onCheckedChange={(value) => {
                  if (value) {
                    setKlassenFilter([...klassenFilter, klasse]);
                    table
                      .getColumn("schule")
                      ?.setFilterValue([...klassenFilter, klasse]);
                  } else {
                    const x = klassenFilter.filter((s) => s != klasse);
                    setKlassenFilter(x);
                    table.getColumn("klassen")?.setFilterValue(x);
                  }
                }}
              >
                {klasse}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DualRangeSlider
          min={0}
          max={9}
          step={1}
          label={(value) => value}
          labelPosition="top"
          defaultValue={[0, 9]}
          value={[gradFilter.min, gradFilter.max]}
          onValueChange={(value) => {
            const [a, b] = value;
            const [min, max] = [Math.min(a, b), Math.max(a, b)];
            setGradFilter({ min, max });
            table.getColumn("grad")?.setFilterValue({ min, max });
          }}
          className="w-40 pt-8"
        />
      </div>
      <div className="flex items-end gap-4">
        <Input
          className="max-w-sm"
          placeholder="Zauber finden..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
        />
      </div>
      <div className="rounded-md border">
        <TableRoot>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableRoot>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          vorherige
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          nächste
        </Button>
      </div>
      <Button
        disabled={
          !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
        }
        onClick={() => {
          const selected_rows = table.getSelectedRowModel().rows.map((row) => {
            return row.getValue("name");
          });
          const x = btoa(JSON.stringify(selected_rows));
          router.push(`/export/${x}`);
        }}
      >
        Zauber exportieren
      </Button>
    </>
  );
}

type CategoryFilterDropdownMenuProps<TData> = {
  table: Table<TData>;
  columnId: string;
  name: string;
  categories: readonly string[];
};

function CategoryFilterDropdownMenu<TData>({
  table,
  columnId,
  name,
  categories,
}: CategoryFilterDropdownMenuProps<TData>) {
  const [filter, setFilter] = useState<(typeof categories)[number][]>([
    ...categories,
  ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuCheckboxItem
          checked={
            filter.length === categories.length
              ? true
              : filter.length === 0
                ? false
                : "indeterminate"
          }
        >
          Alle
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {categories.map((item, idx) => (
          <DropdownMenuCheckboxItem
            key={idx}
            checked={filter.includes(item)}
            onCheckedChange={(value) => {
              const data = value
                ? [...filter, item]
                : filter.filter((i) => i != item);
              setFilter(data);
              table.getColumn(columnId)?.setFilterValue(data);
            }}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
