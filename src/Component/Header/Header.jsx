import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav >
        <div >
          <Link to='/' >Home</Link>
          <Link to='/'>WishList</Link>
        </div>

      </nav>
    </div>
  );
};

export default Header;