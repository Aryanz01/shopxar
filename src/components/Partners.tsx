import React, { useState, useEffect } from 'react';

const partners = [
  { 
    name: 'Apple', 
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Google', 
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Amazon', 
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Microsoft', 
    logo: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Tesla', 
    logo: 'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=150&h=50&q=80' 
  },
  { 
    name: 'Samsung', 
    logo: 'https://images.unsplash.com/photo-1662947995584-e2e162e12e5a?auto=format&fit=crop&w=150&h=50&q=80' 
  },
];

export default function Partners() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="bg-[#181819] py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className={`text-[#fff4e2] ${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-3 sm:mb-4`}>
            Backed & <span className="text-[#677870]">Supported</span> by
          </h2>
          <p className={`text-[#fff4e2]/60 ${isMobile ? 'text-base' : 'text-xl'} font-medium`}>
            {isMobile ? 'Trusted by industry leaders' : 'Trusted by industry leaders worldwide'}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className={`flex items-center justify-center bg-[#1e1e1f] rounded-xl sm:rounded-2xl
                hover:bg-[#242425] transition-all duration-300 group
                ${isMobile ? 'p-4' : 'p-8'}`}
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className={`object-contain grayscale opacity-50 
                  group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300
                  ${isMobile ? 'max-h-8' : 'max-h-12'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}