"use client"
import React from 'react'
import { useEffect, useState } from 'react';

export default function UserDetails({ params }: { params: { id: string } }) {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserDetails = async () => {
    try {
      console.log("Fetching user details for ID:", params.id);
      
      const request = await fetch(`http://localhost:8000/users/${params.id}`);
      
      if (!request.ok) {
        throw new Error(`Failed to fetch user details. Status: ${request.status}`);
      }
      
      const response = await request.json();
      setUserDetails(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [params]);

  if (loading) return <p className="text-center text-blue-500 font-semibold">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: { "An unexpected error occurred."}</p>;
  async function returnBook(userId: number, bookId: number) {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/return/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(`Book ${bookId} successfully returned!`);
      } else {
        alert(result.error || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to return the book.");
    }
  }
  async function borrowBook(userId: number, bookId: number) {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(`Book ${bookId} successfully borrowed!`);
      } else {
        alert(result.error || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to borrow the book.");
    }
  }
    
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">User Details</h1>
  
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">User Information</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {userDetails.name}
          </p>
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Currently Borrowed Books</h2>
          {userDetails.books?.present?.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {userDetails.books.present.map((book: any) => (
                <li key={book.id} className="py-2 flex justify-between items-center">
                  <span>{book.name}</span>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => returnBook(userDetails.id, book.id)}
                  >
                    Return Book
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No books currently borrowed.</p>
          )}
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">Past Borrowed Books</h2>
          {userDetails.books?.past?.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {userDetails.books.past.map((book: any) => (
                <li key={book.id} className="py-2 flex justify-between items-center">
                  <span>
                    {book.name} - <span className="text-sm text-gray-600">Rating: {book.userScore}</span>
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => borrowBook(userDetails.id, book.id)}
                  >
                    Borrow Again
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No past borrowed books.</p>
          )}
        </div>
      </div>
    </div>
  );
}
