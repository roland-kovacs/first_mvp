export interface User {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  skills: string[];
}

export type SortDirection = "asc" | "desc" | null;
export type SortColumn = keyof User | null;

export const ROWS_PER_PAGE_OPTIONS = [3, 5, 10, 20]; 