import React, { useState } from 'react';
import { navLinks } from "../constants";
import { hamburger } from "../assets/icons";

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="fixed z-999 px-15 py-5 backdrop-blur-md w-full bg-[#FFFFF]">
        <nav className="flex justify-between items-center text-shadow">
          <a href="/" className="font-heading text-h5 text-primary">
            SEA Catering
          </a>

          {/* Desktop Menu */}
          <ul className="flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="font-paragraph text-paragraph-black">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <img 
              src={hamburger} 
              alt="Menu" 
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 z-[998] lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-[#FFFFFF] transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[999] lg:hidden shadow-lg`}
      >
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-8">
            <a 
              href="/" 
              onClick={closeSidebar}
              className="font-heading text-h5 text-primary"
            >
              SEA Catering
            </a>
            <button
              onClick={closeSidebar}
              className="p-2 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-paragraph-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-6">
            {navLinks.map((item) => (
              <div key={item.label} className="pb-2">
                <a
                  href={item.href}
                  onClick={closeSidebar}
                  className="font-paragraph text-paragraph-black text-lg hover:opacity-80 transition-opacity block"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav;