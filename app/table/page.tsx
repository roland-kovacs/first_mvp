"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { sampleData } from "./data";
import { SortColumn, SortDirection, User } from "./types";
import { PaginationControls } from "./components/PaginationControls";
import { TableHeaderComponent } from "./components/TableHeader";

export default function TablePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      if (sortDirection === null) {
        setSortDirection("asc");
      } else if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    if (sortColumn === "skills") {
      const aSkills = a.skills.join(", ");
      const bSkills = b.skills.join(", ");
      return sortDirection === "asc"
        ? aSkills.localeCompare(bSkills)
        : bSkills.localeCompare(aSkills);
    }

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Table</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeaderComponent
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableBody>
            {currentData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.skills.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}