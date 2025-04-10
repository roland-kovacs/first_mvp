"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PaginationControls } from "./components/PaginationControls";
import { TableHeaderComponent } from "./components/TableHeader";
import { sampleData } from "./data";
import { SortColumn, SortDirection } from "./types";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "../components/auth/actions";
import { Input } from "@/components/ui/input";

export default function TablePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const filteredData = sampleData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Table</h1>
          <form action={logout}>
            <button 
              type="submit"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
        <div className="w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
    </div>
  );
}