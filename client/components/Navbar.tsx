"use client";
import Link from "next/link";

export default function Library() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/">Library</Link>
        </div>
        <div className="flex gap-8">
          <Link href="/users" className="font-semibold">
            Users
          </Link>
          <Link href="/books" className="font-semibold">
            Books
          </Link>
        </div>
      </div>
    </nav>
  );
}
