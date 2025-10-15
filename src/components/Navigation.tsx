'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'About', 
      href: '#',
      dropdown: [
        { name: 'Our Story', href: '/about' },
        { name: 'Meet the Team', href: '/team' }
      ]
    },
    { 
      name: 'Programs', 
      href: '#',
      dropdown: [
        { name: 'Writing Program', href: '/writing-program' },
        { name: 'Essays Program', href: '/essays-program' }
      ]
    },
    { name: 'Free Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAboutOpen(!isAboutOpen);
    setIsProgramsOpen(false);
  };

  const handleProgramsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProgramsOpen(!isProgramsOpen);
    setIsAboutOpen(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              The Academics Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative group">
                    <button
                      onClick={item.name === 'About' ? handleAboutClick : handleProgramsClick}
                      onMouseEnter={() => item.name === 'About' ? setIsAboutOpen(true) : setIsProgramsOpen(true)}
                      className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        (item.name === 'About' && isAboutOpen) || (item.name === 'Programs' && isProgramsOpen) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                        (item.name === 'About' && isAboutOpen) || (item.name === 'Programs' && isProgramsOpen)
                          ? 'opacity-100 visible transform translate-y-0'
                          : 'opacity-0 invisible transform -translate-y-2'
                      }`}
                      onMouseLeave={() => {
                        if (item.name === 'About') setIsAboutOpen(false);
                        if (item.name === 'Programs') setIsProgramsOpen(false);
                      }}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                          onClick={() => {
                            setIsAboutOpen(false);
                            setIsProgramsOpen(false);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={scrollToContact}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 text-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={item.name === 'About' ? handleAboutClick : handleProgramsClick}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          (item.name === 'About' && isAboutOpen) || (item.name === 'Programs' && isProgramsOpen) ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {((item.name === 'About' && isAboutOpen) || (item.name === 'Programs' && isProgramsOpen)) && (
                        <div className="pl-4 bg-gray-50">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-2">
                <button
                  onClick={() => {
                    scrollToContact();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
