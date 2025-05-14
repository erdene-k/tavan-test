"use client"
import { useState, useEffect } from "react";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for header transparency effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
      isScrolled ? "bg-white/80 backdrop-blur shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section: Logo + Title */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
              <span className="text-2xl font-extrabold text-white tracking-wider">TBF</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/20 to-green-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 tracking-tighter hover:scale-105 transition-all duration-300">
            Chat On
          </h1>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="font-medium text-gray-800 hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="font-medium text-gray-800 hover:text-blue-500 transition-colors">About</a>
          <a href="#" className="font-medium text-gray-800 hover:text-blue-500 transition-colors">Products</a>
          
          {/* Dropdown menu */}
        
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification icon */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User profile */}
          <div className="hidden md:flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-blue-500 transition-colors">Account</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X className="w-6 h-6 text-gray-700" /> : 
              <Menu className="w-6 h-6 text-gray-700" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="font-medium text-gray-700 hover:text-blue-500 transition-colors">Home</a>
            <a href="#" className="font-medium text-gray-700 hover:text-blue-500 transition-colors">Features</a>
            <a href="#" className="font-medium text-gray-700 hover:text-blue-500 transition-colors">Pricing</a>
            <a href="#" className="font-medium text-gray-700 hover:text-blue-500 transition-colors">Resources</a>
            <a href="#" className="font-medium text-gray-700 hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="flex items-center space-x-2 font-medium text-gray-700 hover:text-blue-500 transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}