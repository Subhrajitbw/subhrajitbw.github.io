import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">My App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/charts-and-maps" className="text-white">Charts and Maps</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
