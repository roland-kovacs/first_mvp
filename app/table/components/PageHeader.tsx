import { LogOut } from "lucide-react";
import { logout } from "../../components/auth/actions";

export function PageHeader() {
  return (
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
  );
} 