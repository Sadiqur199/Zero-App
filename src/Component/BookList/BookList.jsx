import React, { useState } from 'react';

const BookList = () => {
  const [books,setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist'))||[]
  )
  const [genre, setGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  return (
    <div>
      <h1>Here is the book list</h1>
    </div>
  );
};

export default BookList;