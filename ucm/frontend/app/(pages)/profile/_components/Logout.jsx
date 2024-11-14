"use client";
import { logout } from "@/app/_actions/auth";

export default function Logout() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="text-red-500" onClick={handleLogout}>
      logout
    </button>
  );
}
