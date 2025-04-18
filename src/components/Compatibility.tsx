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

  // Double the platforms array for seamless loop
  const allPlatforms = [...platforms, ...platforms];

  return (
    <section className="bg-[#181819] overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-[#fff4e2] text-6xl font-bold mb-5">
            Compatible with <span className="text-[#677870]/90">every</span> platform
          </h2>
          <p className="text-[#fff4e2]/40 text-lg font-light">
            Seamlessly integrate with your favorite e-commerce solutions
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className={styles.slider}>
            <div className={styles.slideTrack}>
              {/* First set of platforms */}
              {platforms.map((platform, index) => (
                <div
                  key={`platform-${index}`}
                  className="flex flex-col items-center justify-center mx-8"
                >
                  <div className="bg-transparent border border-[#677870]/10 p-8 rounded-3xl mb-4 group 
                    hover:border-[#677870]/30 transition-all duration-500 hover:scale-110">
                    <platform.icon 
                      className="w-8 h-8 text-[#fff4e2]/30 
                      group-hover:text-[#677870] transition-all duration-500" 
                    />
                  </div>
                  <span className="text-[#fff4e2]/40 text-sm font-light tracking-wide
                    group-hover:text-[#fff4e2] transition-all duration-500">
                    {platform.name}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {platforms.map((platform, index) => (
                <div
                  key={`platform-duplicate-${index}`}
                  className="flex flex-col items-center justify-center mx-8"
                >
                  <div className="bg-transparent border border-[#677870]/10 p-8 rounded-3xl mb-4 group 
                    hover:border-[#677870]/30 transition-all duration-500 hover:scale-110">
                    <platform.icon 
                      className="w-8 h-8 text-[#fff4e2]/30 
                      group-hover:text-[#677870] transition-all duration-500" 
                    />
                  </div>
                  <span className="text-[#fff4e2]/40 text-sm font-light tracking-wide
                    group-hover:text-[#fff4e2] transition-all duration-500">
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