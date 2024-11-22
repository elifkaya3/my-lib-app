"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface User {
  id: number;
  name: string;
}

interface UserTableProps {
  userList: User[];
}

export default function UserTable({ userList }: UserTableProps) {
  const router = useRouter();

  const redirectUserDetailsPage = (id: number) => {
    return router.push(`/users/${id}`);
  };

  return (
    <div className="p-5 font-sans">
      <table className="border-collapse w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Id</th>
            <th className="text-left border border-gray-300 py-2 px-8">User Name</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: User) => (
            <tr
              key={user.id}
              className="cursor-pointer odd:bg-white even:bg-gray-100"
              onClick={() => redirectUserDetailsPage(user.id)}
            >
              <td className="border border-gray-300 text-center p-2">
                {user.id}
              </td>
              <td className="border border-gray-300 text-left py-2 px-8">
                {user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
