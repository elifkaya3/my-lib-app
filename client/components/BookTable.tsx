"use client"
import { useRouter } from "next/navigation";
import React from "react";
interface Book {
  id: number;
  name: string;
  author: string;
  rating: number;
}

interface BookTableProps {
    books: Book[];
};

export default function BookTable({books} : BookTableProps){
  const router = useRouter();
  const redirectBookDetailsPage = (id: number) => {
    return router.push(`/books/${id}`);
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-200 p-2">Id</th>
            <th className="border border-gray-200 text-left py-2 px-8">Book</th>
            <th className="border border-gray-200 text-left py-2 px-8">Author</th>
            <th className="border border-gray-200 text-left py-2 px-8">Rating</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr 
              key={book.id} 
              onClick={() => redirectBookDetailsPage(book.id)} 
              className="cursor-pointer odd:bg-white even:bg-gray-100"
            >
              <td className="border border-gray-200 p-2 text-center">{book.id}</td>
              <td className="border border-gray-200 text-left py-2 px-8">{book.name}</td>
              <td className="border border-gray-200 text-left py-2 px-8">{book.author}</td>
              <td className="relative border border-gray-200 text-left py-2 px-8">
                <span className="absolute z-10 left-12 top-3 text-white font-semibold text-sm">{book.rating}</span>
                <img
                  alt="star"
                  src="/star.svg"
                  className="absolute top-0.5 h-10 w-10"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};