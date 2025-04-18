import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="relative overflow-hidden rounded-2xl bg-[#181819] py-16">
      <div className="absolute inset-0 z-[1]">
        <div className="w-full h-full bg-gradient-to-b from-[#181819] to-[#272425]" />
      </div>

      <div className="container mx-auto px-8 sm:px-12 relative z-[20]">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 max-w-7xl mx-auto">
          {/* Left Heading */}
          <div className="lg:w-1/4 shrink-0">
            <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#fff4e2] mb-4">ShopXar</h3>
            <p className="text-[#677870] text-2xl sm:text-3xl mb-4">Venture Labs</p>
            <div className="h-px w-32 bg-[#677870]/30 mb-6"></div>
            <p className="text-[#fff4e2]/60 text-lg leading-relaxed">
              Pioneering the future of e-commerce through immersive 3D visualization
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 xl:gap-16 lg:w-3/4">
            {/* Services Column */}
            <div id="features" className="space-y-6">
              <h3 className="text-xl font-semibold text-[#fff4e2] mb-8">Services</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">3D Modeling</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">AR Integration</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">360° Views</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Custom Solutions</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#fff4e2] mb-8">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Careers</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Press</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Partners</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#fff4e2] mb-8">Support</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Help Center</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Documentation</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base group">
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">Terms of Service</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div id="contact" className="space-y-6">
              <h3 className="text-xl font-semibold text-[#fff4e2] mb-8">Contact</h3>
              <ul className="space-y-6">
                <li className="group">
                  <div className="flex items-center gap-3 text-base">
                    <svg className="w-5 h-5 text-[#677870] group-hover:text-[#fff4e2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:aryan2642004@gmail.com" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base">
                      aryan2642004@gmail.com
                    </a>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-center gap-3 text-base">
                    <svg className="w-5 h-5 text-[#677870] group-hover:text-[#fff4e2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+919876543210" className="text-[#fff4e2]/60 hover:text-[#677870] transition-colors text-base">
                      +91 9876543210
                    </a>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3">
                    <svg className="w-7 h-5 text-[#677870] mt-1 group-hover:text-[#fff4e2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <address className="text-[#fff4e2]/60 not-italic text-base leading-relaxed">
                      Thapar Institute of Engineering and Technology<br />
                      Patiala, Punjab<br />
                      India - 140401
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-[#677870]/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default AboutUs; 