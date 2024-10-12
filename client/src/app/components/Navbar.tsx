import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 mt-2 border border-gray-700 p-4 rounded-full mx-auto flex justify-between items-center max-w-7xl w-1/2">
      <h1 className="font-bold text-white text-2xl">Mage.ai</h1>

      <div className="hidden md:flex gap-x-6 border rounded-full px-4 py-2 border-gray-500">
        <a href="#about" className="text-white font-semibold hover:text-gray-300 transition-colors duration-300">About</a>
        <a href="#services" className="text-white font-semibold hover:text-gray-300 transition-colors duration-300">Services</a>
        <a href="#contact" className="text-white font-semibold hover:text-gray-300 transition-colors duration-300">Contact</a>
      </div>

      <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Get Started
      </button>

      {/* Hamburger menu for mobile view */}
      <div className="md:hidden">
        <button className="text-white hover:text-gray-400 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}
