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
  const fetchBooks = async (page=1) =>{
    setLoading(true);
    try{
      const response = await fetch(`https://gutendex.com/books?page=${page}`)
      const data = await response.json();
      setBooks(data.results);
      setTotalPages(Math.ceil(data.count / 32))
    }
    
    catch(error){
      console.error('Error Fetching:',error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchBooks(currentPage); 
  }, [currentPage]);

  return (
    <div>
      <h1>Here is the book list</h1>
    </div>
  );
};

export default BookList;