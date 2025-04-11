"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortColumn, SortDirection } from "../types";

interface TableHeaderProps {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

export function TableHeaderComponent({
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSort("name")}
        >
          Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSort("email")}
        >
          Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSort("birthdate")}
        >
          Birthdate {sortColumn === "birthdate" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableHead>
        <TableHead>
          Skills
        </TableHead>
      </TableRow>
    </TableHeader>
  );
} 