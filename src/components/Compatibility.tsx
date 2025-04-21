import React from 'react';
import { ShoppingBag, Code, Box } from 'lucide-react';
import styles from './Compatibility.module.css';

const Compatibility = () => {
  const platforms = [
    { name: 'Shopify', icon: ShoppingBag },
    { name: 'Wix', icon: Code },
    { name: 'WooCommerce', icon: ShoppingBag },
    { name: 'Framer', icon: Box },
    { name: 'Webflow', icon: Code },
    { name: 'Magento', icon: ShoppingBag },
  ];

  // Triple the platforms array for smoother loop
  const allPlatforms = [...platforms, ...platforms, ...platforms];

  return (
    <section className="bg-[#181819] overflow-hidden py-12 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[#fff4e2] text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5">
            Compatible with <span className="text-[#677870]/90">every</span> platform
          </h2>
          <p className="text-[#fff4e2]/40 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Seamlessly integrate with your favorite e-commerce solutions
          </p>
        </div>

        <div className="relative w-full">
          <div className={styles.slider}>
            <div className={styles.slideTrack}>
              {allPlatforms.map((platform, index) => (
                <div
                  key={`platform-${index}`}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="bg-transparent border border-[#677870]/10 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 
                    hover:border-[#677870]/30 transition-all duration-500 hover:scale-110 group">
                    <platform.icon 
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#fff4e2]/30 
                      group-hover:text-[#677870] transition-all duration-500" 
                    />
                  </div>
                  <span className="text-[#fff4e2]/40 text-xs sm:text-sm font-light tracking-wide
                    group-hover:text-[#fff4e2] transition-all duration-500 whitespace-nowrap">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compatibility;