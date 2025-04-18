import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ProductPopup from './ProductPopup';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);

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
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#fff4e2]/95 border-b border-[#3d3938]/10 shadow-sm">
        <div className="max-w-8xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex h-full mr-auto">
            <span className="text-[#3d3938] text-3xl md:text-5xl relative top-[4px] font-bold tracking-tight">
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
            className="md:hidden p-2 rounded-md hover:bg-[#3d3938]/10 transition-colors ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#3d3938]" />
            ) : (
              <Menu className="w-6 h-6 text-[#3d3938]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full top-20 left-0 bg-[#fff4e2]/95 border-t border-[#3d3938]/10 shadow-lg">
            <div className="flex flex-col items-center space-y-4 px-8 py-6 text-center">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors w-full"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors w-full"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors w-full"
              >
                Contact
              </button>
              <button 
                onClick={handleGetStarted}
                className="bg-[#3d3938] text-[#fff4e2] w-full px-6 py-3 rounded-lg text-base font-medium hover:bg-[#677870] transition-all hover:shadow-md mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
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
    </>
  );
};

export default Navbar;
