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
} from "@tanstack/react-table";

import {
  Table,
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
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { schulen } from "@/schemas/Spell";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Schulen</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
        <Input
          type="number"
          min={0}
          max={9}
          className="w-20"
          value={gradFilter.min}
          onChange={(event) => {
            const value = parseInt(event.target.value);
            if (value > gradFilter.max) return;
            setGradFilter({ ...gradFilter, min: value });
            table
              .getColumn("grad")
              ?.setFilterValue({ ...gradFilter, min: value });
          }}
        />
        <Input
          type="number"
          min={0}
          max={9}
          className="w-20"
          value={gradFilter.max}
          onChange={(event) => {
            const value = parseInt(event.target.value);
            if (value < gradFilter.min) return;
            setGradFilter({ ...gradFilter, max: value });
            table
              .getColumn("grad")
              ?.setFilterValue({ ...gradFilter, max: value });
          }}
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
        <Table>
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
        </Table>
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
          console.log(selected_rows);
          const x = btoa(JSON.stringify(selected_rows));
          router.push(`/export/${x}`);
        }}
      >
        Zauber exportieren
      </Button>
    </>
  );
}
