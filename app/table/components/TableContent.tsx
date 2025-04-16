import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { User } from "../types";
import { highlightText } from "../utils";

interface TableContentProps {
  data: User[];
  searchQuery: string;
}

export function TableContent({ data, searchQuery }: TableContentProps) {
  const highlightMatch = (text: string) => {
    const highlighted = highlightText(text, searchQuery);
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <TableBody>
      {data.map((user) => (
        <TableRow key={user.id} className="border-b">
          <TableCell className="border-r">{highlightMatch(user.name)}</TableCell>
          <TableCell className="border-r">{highlightMatch(user.email)}</TableCell>
          <TableCell className="border-r">{highlightMatch(user.birthdate)}</TableCell>
          <TableCell>{highlightMatch(user.skills.join(", "))}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
} 