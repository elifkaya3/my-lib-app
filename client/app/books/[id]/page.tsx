"use client";
import { useEffect, useState } from "react";

const books = [
  {
    id: 1,
    name: "1984",
    img:"https://i.dr.com.tr/cache/500x400-0/originals/0001905997001-1.jpg",
    author: "George Orwell",
    rating: 4,
    year: "1949",
  },
  {
    id: 2,
    img:"https://i.dr.com.tr/cache/500x400-0/originals/0000000662978-1.jpg",
    name: "Dune",
    author: "Frank Herbert",
    rating: 5,
    year: "1965",
  },
  {
    id: 3,
    img:"https://i.dr.com.tr/cache/500x400-0/originals/0000000384920-1.jpg",
    name: "Brave New World",
    author: "Aldous Huxley",
    rating: 5,
    year: "1932",
  },
  {
    id: 4,
    img:"https://i.dr.com.tr/cache/500x400-0/originals/0001993198001-1.jpg",
    name: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    rating: 2,
    year: "1979",
  },
  {
    id: 5,
    img:"https://cdn.kobo.com/book-images/8323556b-d9e3-456b-970b-00b8a25bfa54/353/569/90/False/i-robot.jpg",
    name: "I, Robot",
    author: "Isaac Asimov",
    rating: 5,
    year: "1950",
  },
];

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = () => {
      setLoading(true);
      const bookId = parseInt(params.id);
      const foundBook = books.find((b) => b.id === bookId);
      setBook(foundBook);
      setLoading(false);
    };

    fetchBookDetails();
  }, [params.id]);

  if (loading) return <p className="text-center">Loading book details...</p>;
  if (!book) return <p className="text-center text-red-500">Book not found.</p>;

  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        <div>
          <img
            alt="book-cover"
            src={book.img}
            className="h-[500px] w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{book.name}</h1>
          <p className="text-lg text-gray-600">Author: {book.author}</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: book.rating }).map((_, index) => (
              <img
                key={index}
                alt="star"
                src="/star.svg"
                className="h-5 w-5"
              />
            ))}
            <span className="text-gray-600 text-sm">({book.rating} / 5)</span>
          </div>
          <p className="text-gray-500">Published Year: {book.year}</p>
        </div>
      </div>
    </div>
  );
}

