import React, { useEffect, useState } from 'react';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading , setLoading] = useState([true])

 // fetch the local storage data
 useEffect(() => {
  const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  setWishlist(storedWishlist);
}, []);

// fetch api
const fetchBooks = async () => {
  try {
    const response = await fetch('https://gutendex.com/books');
    const data = await response.json();
    setBooks(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  setLoading(false);
};

useEffect(() => {
  fetchBooks();
}, []);

// filter wishlist book
const wishlistBooks = books.filter((book) => wishlist.includes(book.id));

return (
  <div className="container mx-auto p-5">
    <h1 className="text-2xl font-bold mb-4">MY Wishlist</h1>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistBooks.length > 0 ? (
          wishlistBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg">
              <img
                src={book.formats['image/jpeg']}
                alt={book.title}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p>Author: {book.authors.map((author) => author.name).join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No books in your wishlist.</p>
        )}
      </div>
    )}
  </div>
);
};

export default WishList;