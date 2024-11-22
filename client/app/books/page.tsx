import BookTable from '@/components/BookTable'
import React from 'react'


const getBooks = async () => {
  const request = await fetch("http://localhost:8000/books");
  const response = await request.json();
  return response;
}


export default async function Books() {
    const books = await getBooks();
  console.log(books, "books")
  return (
    <div>
        <BookTable books={books} />
    </div>
  )
}
