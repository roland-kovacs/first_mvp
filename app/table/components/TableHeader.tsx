"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortColumn, SortDirection } from "../types";
import { FilterTooltip } from "./FilterTooltip";

interface TableHeaderProps {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  columnFilters: Record<string, string>;
  onFilterChange: (column: string, value: string) => void;
}

export function TableHeaderComponent({
  sortColumn,
  sortDirection,
  onSort,
  columnFilters,
  onFilterChange,
}: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="border-b">
        <TableHead className="border-r">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer hover:text-gray-600"
              onClick={() => onSort("name")}
            >
              Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </div>
            <FilterTooltip
              value={columnFilters.name || ""}
              onChange={(value) => onFilterChange("name", value)}
              placeholder="Filter name..."
            />
          </div>
        </TableHead>
        <TableHead className="border-r">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer hover:text-gray-600"
              onClick={() => onSort("email")}
            >
              Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </div>
            <FilterTooltip
              value={columnFilters.email || ""}
              onChange={(value) => onFilterChange("email", value)}
              placeholder="Filter email..."
            />
          </div>
        </TableHead>
        <TableHead className="border-r">
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer hover:text-gray-600"
              onClick={() => onSort("birthdate")}
            >
              Birthdate {sortColumn === "birthdate" && (sortDirection === "asc" ? "↑" : "↓")}
            </div>
            <FilterTooltip
              value={columnFilters.birthdate || ""}
              onChange={(value) => onFilterChange("birthdate", value)}
              placeholder="Filter birthdate..."
            />
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center justify-between">
            <div>Skills</div>
            <FilterTooltip
              value={columnFilters.skills || ""}
              onChange={(value) => onFilterChange("skills", value)}
              placeholder="Filter skills..."
            />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
} 