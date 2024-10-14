import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-center gap-10">
        <Link to="/" className="text-white text-xl">Home</Link>
        <Link to="/wishlist" className="text-white text-xl">Wishlist</Link>
      </div>
    </nav>
    </div>
  );
};

export default Header;