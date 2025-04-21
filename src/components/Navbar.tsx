import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ProductPopup from './ProductPopup';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleGetStarted = () => {
    setIsProductPopupOpen(true);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="overflow-x-hidden w-full">
      <nav className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 bg-[#fff4e2]/95 border-b border-[#3d3938]/10 
        ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-all duration-300`}>
        <div className="max-w-8xl mx-auto px-2 sm:px-6 md:px-10 flex items-center justify-between h-14 sm:h-20">
          {/* Logo */}
          <div className="flex h-full items-center">
            <span className="text-[#3d3938] text-xl sm:text-3xl md:text-5xl font-bold tracking-tight">
              Shopxar
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 h-full">
            <button 
              onClick={() => scrollToSection('about')}
              className="flex items-center h-full text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors relative top-[-7px]"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="flex items-center h-full text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors relative top-[-7px]"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="flex items-center h-full text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors relative top-[-7px]"
            >
              Contact
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-[#3d3938] text-[#fff4e2] px-6 py-2 rounded-lg text-lg font-medium hover:bg-[#677870] transition-all hover:shadow-md relative top-[-7px]"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1.5 rounded-md hover:bg-[#3d3938]/5 active:bg-[#3d3938]/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[#3d3938]" />
            ) : (
              <Menu className="w-5 h-5 text-[#3d3938]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed left-0 top-full bg-[#fff4e2]/95 border-t border-[#3d3938]/10 shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50
            ${isMenuOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}
          `}
          style={{ width: '100vw', maxWidth: '100%' }}
        >
          <div className="flex flex-col items-stretch px-2 py-2">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-[#3d3938]/80 text-sm font-medium hover:text-[#3d3938] transition-colors py-2.5 px-3 rounded-lg hover:bg-[#3d3938]/5 active:bg-[#3d3938]/10 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-[#3d3938]/80 text-sm font-medium hover:text-[#3d3938] transition-colors py-2.5 px-3 rounded-lg hover:bg-[#3d3938]/5 active:bg-[#3d3938]/10 text-left"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-[#3d3938]/80 text-sm font-medium hover:text-[#3d3938] transition-colors py-2.5 px-3 rounded-lg hover:bg-[#3d3938]/5 active:bg-[#3d3938]/10 text-left"
            >
              Contact
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-[#3d3938] text-[#fff4e2] px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#677870] transition-all hover:shadow-md mt-2 w-full"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Product Popup */}
      {isProductPopupOpen && (
        <ProductPopup
          isOpen={isProductPopupOpen}
          onClose={() => setIsProductPopupOpen(false)}
          product={{
            id: 1,
            title: "Get Started with ShopXar",
            description: "Experience the future of e-commerce with our 3D product visualization solutions",
            price: "Custom Pricing",
            modelSrc: "https://cdn.shopify.com/3d/models/122aa9e96161099f/cinema_camera.glb",
            iosSrc: ""
          }}
        />
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Navbar;
