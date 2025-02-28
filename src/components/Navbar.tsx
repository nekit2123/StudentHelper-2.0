import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, MessageSquare, Home, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-xl">СтудДопомога</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-1">
              <Home className="h-5 w-5" />
              <span>Головна</span>
            </Link>
            <Link to="/materials" className="px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-1">
              <BookOpen className="h-5 w-5" />
              <span>Матеріали</span>
            </Link>
            <Link to="/chat" className="px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-1">
              <MessageSquare className="h-5 w-5" />
              <span>Чат</span>
            </Link>
            <button className="ml-4 px-4 py-2 bg-white text-blue-800 rounded-md font-medium flex items-center space-x-1 hover:bg-gray-100">
              <LogIn className="h-5 w-5" />
              <span>Увійти</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Головна</span>
            </Link>
            <Link 
              to="/materials" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>Матеріали</span>
            </Link>
            <Link 
              to="/chat" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Чат</span>
            </Link>
            <button 
              className="mt-3 w-full px-4 py-2 bg-white text-blue-800 rounded-md font-medium flex items-center justify-center space-x-1"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-5 w-5" />
              <span>Увійти</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;