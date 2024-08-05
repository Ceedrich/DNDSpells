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

import { Label } from "@/components/ui/label";

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
  const [gradFilter, setGradFilter] = useState({ min: 0, max: 9 });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 py-4">
          <div className="title">
            <strong>Filter: </strong>
          </div>
          <Input
            className="max-w-sm"
            placeholder="Zauber finden..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
          />
          <CategoryFilterDropdownMenu
            table={table}
            columnId={"schule"}
            name="Schule"
            categories={schulen}
          />
          <CategoryFilterDropdownMenu
            table={table}
            columnId={"klassen"}
            name="Klassen"
            categories={klassen}
          />

          <Label htmlFor="gradFilter">Grad: </Label>
          <DualRangeSlider
            id="gradFilter"
            className="w-40 lg:w-60 pt-8"
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
          />
        </div>

        <ColumnSelectionDropdown table={table} label="Spalten auswählen" />
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
          const selected_rows = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => {
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
    <DropdownMenu modal={false}>
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
          onCheckedChange={(checked) => {
            const data = checked ? [...categories] : [];
            setFilter(data);
            table.getColumn(columnId)?.setFilterValue(data);
          }}
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

type ColumnSelectionDropdownProps<TData> = {
  label: string;
  table: Table<TData>;
};
function ColumnSelectionDropdown<TData>({
  table,
  label,
}: ColumnSelectionDropdownProps<TData>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="italic">
        <Button variant="outline">{label}</Button>
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
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
