import React, { useState } from 'react';

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading , setLoading] = useState([true])
  return (
    <div>
      <h1>Here is the wishlist</h1>
    </div>
  );
};

export default WishList;