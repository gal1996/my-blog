import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            My Blog
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="font-semibold hover:text-gray-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="font-semibold hover:text-gray-300 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="font-semibold hover:text-gray-300 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};