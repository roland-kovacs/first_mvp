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
  const getSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("name")}
        >
          Name {getSortIndicator("name")}
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("email")}
        >
          Email {getSortIndicator("email")}
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("birthdate")}
        >
          Birthdate {getSortIndicator("birthdate")}
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("skills")}
        >
          Skills {getSortIndicator("skills")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
} 