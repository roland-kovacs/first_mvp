"use client";

import { Table } from "@/components/ui/table";
import { PaginationControls } from "./components/PaginationControls";
import { TableHeaderComponent } from "./components/TableHeader";
import { TableContent } from "./components/TableContent";
import { SearchBar } from "./components/SearchBar";
import { PageHeader } from "./components/PageHeader";
import { sampleData } from "./data";
import { User, SortColumn, SortDirection } from "./types";
import { useState } from "react";

export default function TablePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({
    name: "",
    email: "",
    birthdate: "",
    skills: "",
  });

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      const nextDirection = {
        asc: "desc",
        desc: null,
        null: "asc"
      }[sortDirection || "null"] as SortDirection;
      
      setSortDirection(nextDirection);
      if (nextDirection === null) {
        setSortColumn(null);
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

  const handleFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setCurrentPage(1);
  };

  const filteredData = sampleData.filter((user) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.birthdate.toLowerCase().includes(searchLower) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    return Object.entries(columnFilters).every(([column, filterValue]) => {
      if (!filterValue) return true;
      
      const userValue = column === "skills" 
        ? user[column].join(", ").toLowerCase()
        : String(user[column as keyof User]).toLowerCase();
      
      return userValue.includes(filterValue.toLowerCase());
    });
  });

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
        <PageHeader />
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <div className="rounded-md border">
          <Table>
            <TableHeaderComponent
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              columnFilters={columnFilters}
              onFilterChange={handleFilterChange}
            />
            <TableContent 
              data={currentData} 
              searchQuery={searchQuery} 
            />
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