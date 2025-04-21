import React, { useState, useEffect } from 'react';

const steps = [
  {
    title: 'Upload Files',
    description: 'Simply upload your 3D files or product photos. We support all major 3D and image formats.',
    mobileDescription: 'Upload your 3D files or photos in any format',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=400',
  },
  {
    title: 'Configure & Design',
    description: 'Customize materials, lighting, and environments to match your brand identity.',
    mobileDescription: 'Customize materials and lighting for your brand',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400',
  },
  {
    title: 'Integrate',
    description: 'Seamlessly embed your 3D products into your website with our simple integration.',
    mobileDescription: 'Easily embed 3D products on your site',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400',
  },
  {
    title: 'Track & Optimize',
    description: 'Monitor engagement and optimize your 3D assets based on analytics.',
    mobileDescription: 'Track and improve with analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400',
  },
];

export default function Journey() {
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
      <div className="text-center px-4 sm:px-0">
        <h2 className={`text-[#fff4e2] ${isMobile ? 'text-4xl' : 'text-6xl'} justify-center font-bold mb-3 sm:mb-4`}>
          Simple & Easy <span className="text-[#677870]">Journey</span>
        </h2>
        <p className={`text-[#fff4e2]/60 text-center ${isMobile ? 'text-lg px-6' : 'text-2xl'} font-medium ${isMobile ? 'mb-10' : 'mb-16'}`}>
          {isMobile ? 'Four easy steps to get started' : 'Get started with our straightforward process'}
        </p>
        
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Timeline line - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute left-1/2 h-full w-0.5 bg-[#677870]/20"></div>
          )}
          
          <div className={`${isMobile ? 'space-y-8' : 'space-y-24'}`}>
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Mobile Layout */}
                {isMobile ? (
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <div className="bg-[#1e1e1f] rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-48 object-cover opacity-80"
                        />
                      </div>
                    </div>
                    <div className="text-left px-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-[#677870] shadow-[0_0_0_2px_#677870/20]"></div>
                        <h3 className="text-xl font-bold text-[#fff4e2]">{step.title}</h3>
                      </div>
                      <p className="text-[#fff4e2]/70 text-sm pl-6">{step.mobileDescription}</p>
                    </div>
                  </div>
                ) : (
                  /* Desktop Layout */
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-12">
                      <div className="bg-[#1e1e1f] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#677870]/10 transition-shadow duration-300">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2">
                      <div className="w-4 h-4 rounded-full bg-[#677870] border-4 border-[#181819] shadow-[0_0_0_2px_#677870/20]"></div>
                    </div>
                    
                    <div className="w-1/2 px-12">
                      <h3 className="text-2xl font-bold text-[#fff4e2] mb-3">{step.title}</h3>
                      <p className="text-[#fff4e2]/70 text-lg">{step.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}