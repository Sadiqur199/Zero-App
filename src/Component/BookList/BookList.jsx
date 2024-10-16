import React, { useEffect, useState } from 'react';

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

  // fetch the api function
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
  const toggleWishlist = (book) => {
    const updatedWishlist = wishlist.includes(book.id)
      ? wishlist.filter((id) => id !== book.id)
      : [...wishlist, book.id];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  
// page functionality
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // filter and search functionality
  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((book) => (genre ? book.subjects.includes(genre) : true));

  return (
    <div className="container mx-auto p-5">
      {/* search option */}
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* dropdown option */}
      <select
        className="border p-2 mb-4"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Drama">Drama</option>
      </select>

      {/* book list option*/}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg">
              <img
                src={book.formats['image/jpeg']}
                alt={book.title}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p>Author: {book.authors.map((author) => author.name).join(', ')}</p>
              <button
                className={`mt-2 ${wishlist.includes(book.id) ? 'text-red-500' : 'text-gray-400'}`}
                onClick={() => toggleWishlist(book)}
              >
                {wishlist.includes(book.id) ? '♥ Liked' : '♡ Like'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/*pagination section */}
      <div className="mt-5 flex justify-center">
        <button
          className="border p-2 mx-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}  
        >
          Previous
        </button>
        <span className="p-2">Page {currentPage} of {totalPages}</span>
        <button
          className="border p-2 mx-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}  
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
