"use client";
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { hamburger } from "../assets/icons";

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscription", label: "Subscription" },
    { href: "#contact-us", label: "Contact Us" },
  ];

  const handleNavClick = (href) => {
    // Untuk anchor link (#) hanya berlaku di halaman home
    if (href.startsWith('#') && pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="fixed z-999 px-15 py-5 backdrop-blur-md w-full bg-[#FFFFFF]">
        <nav className="flex justify-between items-center text-shadow">
          <Link href="/" className="font-heading text-h5 text-primary">
            SEA Catering
          </Link>
          {/* Desktop Menu */}
          <ul className="flex justify-center items-center gap-16 max-lg:hidden font-paragraph">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="font-paragraph text-paragraph-black hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-colors cursor-pointer ${
                      pathname === item.href
                        ? 'text-primary font-heading'
                        : 'text-paragraph-black hover:text-primary'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Image
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
          onClick={() => setIsSidebarOpen(false)}
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
            <Link
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className="font-heading text-h5 text-primary"
            >
              SEA Catering
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Sidebar Navigation */}
          <ul className="space-y-4">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block px-4 py-2 text-paragraph-black hover:text-primary hover:bg-gray-100 rounded transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block px-4 py-2 rounded transition-colors cursor-pointer ${
                      pathname === item.href
                        ? 'text-primary bg-gray-100 font-heading'
                        : 'text-paragraph-black hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;