import React, { useState, useEffect, useRef } from 'react';

// Add this type at the top of the file
type Model = {
  id: number;
  position: string;
  modelSrc: string;
  imageSrc: string;
  scale: string;
  rotation: string;
  yOffset: string;
  xOffset: string;
  cameraOrbit: string;
  highlight?: boolean;
  // Added highlight configuration properties
  highlightSize?: number;
  highlightOffsetX?: number;
  highlightOffsetY?: number;
  mobilePosition?: string; // Add mobile-specific positioning
  mobileScale?: string; // Add mobile-specific scaling
};

const Hero = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [animatingModels, setAnimatingModels] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const expandedViewRef = useRef<HTMLDivElement>(null);
  const nextComponentRef = useRef<HTMLDivElement>(null);
  const topMarkerRef = useRef<HTMLDivElement>(null);
  
  // Tooltip position configuration
  const tooltipPosition = {
    top: '6',
    horizontalOffset: '0',
  };
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Load model-viewer script if not already loaded
    if (!document.querySelector('script[src*="model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.type = 'module';
      script.onload = () => setModelsLoaded(true);
      document.body.appendChild(script);
    } else {
      setModelsLoaded(true);
    }

    // Add animation keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes zoom-animation {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      .model-zoom-animation {
        animation: zoom-animation 4s ease-in-out;
      }
      
      @keyframes highlight-position {
        0% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1);
        }
        25% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1.2);
        }
        50% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1);
        }
        75% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1.2);
        }
        100% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1);
        }
      }
      .highlight-animation {
        animation: highlight-position 4s ease-in-out;
      }
      
      @keyframes finger-tap-animation {
        0% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1) rotate(0deg);
          opacity: 0.8;
        }
        25% { 
          transform: translate(calc(var(--offset-x) + 5px), calc(var(--offset-y) + 5px)) scale(1.1) rotate(0deg);
          opacity: 1;
        }
        50% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1) rotate(0deg);
          opacity: 0.8;
        }
        75% { 
          transform: translate(calc(var(--offset-x) + 5px), calc(var(--offset-y) + 5px)) scale(1.1) rotate(0deg);
          opacity: 1;
        }
        100% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1) rotate(0deg);
          opacity: 0.8;
        }
      }
      .finger-tap-animation {
        animation: finger-tap-animation 4s ease-in-out;
      }

      @media (max-width: 768px) {
        .expanded-model-container {
          width: 100vw !important;
          height: 100vh !important;
          margin: 0 !important;
          top: 0 !important;
          left: 0 !important;
          transform: none !important;
        }
        
        .expanded-model {
          width: 100% !important;
          height: 100% !important;
        }

        .model-container {
          width: 80px !important;
          height: 80px !important;
        }

        .shelf-container {
          transform: scale(0.8) !important;
          transform-origin: top center !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Animation and tooltip cycle
    if (!tooltipDismissed && modelsLoaded) {
      // First setup animation cycle
      const animationCycle = () => {
        // Start Animation Phase and show tooltip simultaneously - 4 seconds
        setAnimatingModels(true);
        setShowHighlights(true);
        setShowTooltip(true);
        
        // End Animation Phase and hide tooltip
        setTimeout(() => {
          setAnimatingModels(false);
          setShowHighlights(false);
          setShowTooltip(false);
        }, 4000);
      };

      // Start initial cycle
      animationCycle();
      
      // Setup repeating cycle every 5 seconds (4s animation + 1s pause)
      const intervalId = setInterval(animationCycle, 5000);
      
      return () => {
        clearInterval(intervalId);
        // Clean up the style element
        if (styleSheet.parentNode) {
          styleSheet.parentNode.removeChild(styleSheet);
        }
      };
    }
  }, [modelsLoaded, tooltipDismissed]);

  useEffect(() => {
    if (!nextComponentRef.current || !topMarkerRef.current || !selectedModel) return;

    const nextComponentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start fading out when next component is visible
            setScrollProgress(1);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    const topMarkerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Fade back in only when we're back at the top
            setScrollProgress(0);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
      }
    );

    // Add scroll event listener for early fade out
    const handleScroll = () => {
      if (window.scrollY > 50) { // Start fading when scrolled 50px
        setScrollProgress(Math.min(window.scrollY / 200, 1)); // Full fade at 200px
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    nextComponentObserver.observe(nextComponentRef.current);
    topMarkerObserver.observe(topMarkerRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      nextComponentObserver.disconnect();
      topMarkerObserver.disconnect();
    };
  }, [selectedModel]);

  const models = [
    {
      id: 1,
      position: 'top-[33.4%] right-[38%]',
      mobilePosition: 'top-[50.1%] right-[57%]',
      modelSrc: 'https://angle-3d-demo.myshopify.com/cdn/shop/3d/models/o/4acb33bc7cc53ea1/apple-watch.glb?v=0',
      imageSrc: '/images/products/watch.png',
      scale: 'scale-[0.5]',
      mobileScale: 'scale-[0.5]',
      rotation: '',
      yOffset: 'translate-y-3',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 87deg 105%',
    },
    {
      id: 2,
      position: 'top-[22%] right-[25.4%]',
      mobilePosition: 'top-[44.3%] right-[23%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/88174270d865823c/headphone_headset.glb',
      imageSrc: '/images/products/headphones.png',
      scale: 'scale-[0.8]',
      mobileScale: 'scale-[0.7]',
      rotation: 'rotate-270',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 98deg 105%',
    },
    {
      id: 3,
      position: 'top-[72%] right-[25.1%]',
      mobilePosition: 'top-[73%] right-[26.7%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/f0733ecc7a32b9d8/iphone_16_pro_max.glb',
      imageSrc: '/images/products/iphone.png',
      scale: 'scale-[0.8]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '90deg 90deg 110%',
    },
    {
      id: 4,
      position: 'top-[73.7%] right-[38.5%]',
      mobilePosition: 'top-[74.5%] right-[55%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b705057628482aab/mechanical_keyboard_-_aesthetic.glb',
      imageSrc: '/images/products/keyboard.png',
      scale: 'scale-[0.8]',
      mobileScale: 'scale-[0.7]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 70deg 105%',
      highlight: true,
      highlightSize: 120,
      highlightOffsetX: 0,
      highlightOffsetY: 0,
    },
    {
      id: 5,
      position: 'top-[34.8%] left-[67.3%]',
      mobilePosition: 'top-[51.5%] left-[57.8%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/97a034ad7547e534/chinese_vase.glb',
      imageSrc: '/images/products/vase.png',
      cameraOrbit: '0deg 83deg',
      scale: 'scale-[0.75]',
      mobileScale: 'scale-[0.69]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      highlight: true,
      highlightSize: 160,
      highlightOffsetX: 0,
      highlightOffsetY: 0,
    },
    {
      id: 6,
      position: 'top-[21.5%] right-[38.3%]',
      mobilePosition: 'top-[43.8%] right-[56.5%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/17856a3ec41e1217/microphone.glb',
      imageSrc: '/images/products/microphone.png',
      cameraOrbit: 'odeg 100deg',
      scale: 'scale-[0.65]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      highlight: true,
      highlightSize: 167,
      highlightOffsetY: 20,
      highlightOffsetX: 0,
    },
    {
      id: 7,
      position: 'top-[48.4%] right-[38.4%]',
      mobilePosition: 'top-[59.2%] right-[56%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/122aa9e96161099f/cinema_camera.glb',
      imageSrc: '/images/products/camera.png',
      cameraOrbit: '50deg 90deg',
      scale: 'scale-[0.6]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      highlight: true,
      highlightSize: 120,
      highlightOffsetX: 0,
      highlightOffsetY: 0,
    },
    {
      id: 8,
      position: 'top-[49%] right-[24.9%]',
      mobilePosition: 'top-[60%] right-[25%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/a0bc8bbb4b6024b5/air_jordan_1.glb',
      imageSrc: '/images/products/shoes.png',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[0.9]',
      mobileScale: 'scale-[0.9]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 9,
      position: 'top-[61%] right-[25.3%]',
      mobilePosition: 'top-[67%] right-[25%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b8c47a616dcc3199/low_poly_car_-_cadillac_75_sedan_1953.glb',
      imageSrc: '/images/products/car.png',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[0.65]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      highlight: true,
      highlightSize: 120,
      highlightOffsetX: 0,
      highlightOffsetY: 0,
    },
    {
      id: 10,
      position: 'top-[61%] right-[38.2%]',
      mobilePosition: 'top-[67%] right-[56%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b04d6ab77c573e10/jbl_xtreme_3.glb',
      imageSrc: '/images/products/speaker.png',
      cameraOrbit: '5deg 80deg',
      scale: 'scale-[0.65]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
  ];

  return (
    <section className="relative h-[95vh] overflow-hidden rounded-2xl">
      {/* Background image container */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/crop 2.png"
          alt="Illuminated wooden shelves"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Content container - Moved to left for desktop */}
      <div className={`relative z-[20] pointer-events-none
                      ${isMobile ? 'container mx-auto px-4 sm:px-6 pt-12' : 'absolute left-8 top-0 w-[40%] h-full flex items-center'}`}>
        <div className={`flex flex-col ${isMobile ? 'items-center text-center h-auto mb-12' : 'items-start justify-center h-full'} ${isMobile ? 'mx-auto' : ''}`}>
          {selectedModel ? (
            <h1 className={`text-6xl sm:text-8xl py-5 font-bold text-[#fff4e2]/10 select-none ${isMobile ? '' : 'text-left'} -translate-y-4`}>
              Shopxar
            </h1>
          ) : (
            <>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#fff4e2] mb-4 leading-tight ${isMobile ? 'text-center' : 'text-left'}`}>
                Product <span className="text-[#677870]">visualizations</span><br />
                with <span className="text-[#677870]">3D</span> modeling<br />
                services
              </h1>
              <p className={`text-[#fff4e2]/20 text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-xl ${isMobile ? 'text-center mx-auto' : 'text-left'}`}>
                Infuse unparalleled realism with 3D visualization where we comprehensively 
                boast your business capabilities.
              </p>
              <div className={`flex flex-wrap gap-3 sm:gap-4 relative pointer-events-auto ${isMobile ? 'justify-center' : 'justify-start'}`}>
                <button className="bg-[#181819] text-[#fff4e2] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#272425] transition-all duration-300">
                  Request a sample
                </button>
                <button className="bg-[#fff4e2] text-[#181819] border border-[#181819] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#677870] hover:text-[#fff4e2] hover:border-[#677870] transition-all duration-300">
                  Schedule now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add scroll-friendly areas to the sides of the shelf */}
      <div className="fixed left-0 top-0 bottom-0 w-[10%] z-[5]" />
      <div className="fixed right-0 top-0 bottom-0 w-[10%] z-[5]" />

      {/* Shelf 3D model in background - Centered for mobile */}
      {modelsLoaded && (
        <div 
          className="absolute w-full h-full z-[10] shelf-container pointer-events-none"
          style={{ 
            top: isMobile ? '25%' : '7%',
            right: isMobile ? '0%' : '-14.1%',
            left: isMobile ? '0%' : 'auto',
            bottom: 'auto',
            transform: `translateZ(-100px) rotate(0.3deg) ${isMobile ? 'scale(1.2)' : ''}`,
            transformOrigin: 'center center',
            position: 'absolute'
          }}
        >
          <model-viewer
            className="w-full h-full"
            style={{ 
              transform: `scale(${isMobile ? '1.3' : '1.1'})`, 
              transformOrigin: 'center center',
              display: 'block'
            }}
            src="https://cdn.shopify.com/3d/models/3d72a3f9a696850b/untitled.glb"
            camera-controls={false}
            auto-rotate={false}
            rotation-per-second="0deg"
            interaction-prompt="none"
            camera-orbit="0deg 86deg 180%"
            min-camera-orbit="0deg 86deg 180%"
            max-camera-orbit="0deg 86deg 180%"
            disable-zoom
            disable-pan
            interaction-policy="none"
            touch-action="none"
            pointer-events="none"
            ar-status="not-presenting"
            environment-image="neutral"
            exposure="0.7"
            shadow-intensity="0"
            field-of-view="45deg"
          >
            <div slot="shadow-root"></div>
          </model-viewer>
        </div>
      )}

      {/* Interactive tooltip - Shown during animation */}
      {showTooltip && modelsLoaded && !selectedModel && !tooltipDismissed && (
        <div 
          className={`fixed z-[50] 
                      bg-gradient-to-r from-[#30221c]/90 to-[#3d2c20]/90 backdrop-blur-sm
                      px-4 sm:px-8 py-3 sm:py-5 rounded-lg shadow-2xl border border-[#d9c2a7]/20
                      transition-all duration-300 ease-in-out w-auto mx-auto
                      ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            top: `${tooltipPosition.top}rem`,
            left: '50%',
            transform: `translateX(calc(-50% + ${tooltipPosition.horizontalOffset}px))`,
            minWidth: isMobile ? '240px' : '280px',
            maxWidth: isMobile ? '320px' : '400px'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-[#fff4e2] text-sm sm:text-base text-center flex-1">
              <span className="block font-semibold mb-1 text-center">Interactive 3D Models</span>
              <span className="text-[#fff4e2]/80 text-xs sm:text-sm text-center block">Click on any product to explore in 3D</span>
            </div>
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center 
                        bg-[#677870] hover:bg-[#566860] text-white cursor-pointer
                        transition-colors duration-300 flex-shrink-0"
              onClick={() => {
                setShowTooltip(false);
                setTooltipDismissed(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Model viewers on shelves */}
      {modelsLoaded && (
        <div className="absolute inset-0 z-[20] pointer-events-none">
          {models.map((model) => (
            <div
              key={model.id}
              className={`absolute ${isMobile ? model.mobilePosition || model.position : model.position} 
                         ${isMobile ? model.mobileScale || model.scale : model.scale} 
                         ${model.rotation} ${model.yOffset} ${model.xOffset} 
                         ${selectedModel?.id === model.id ? 'opacity-0 pointer-events-none' : ''} 
                         transition-opacity duration-300`}
            >
              <div className={`relative ${isMobile ? 'w-48 h-48' : 'w-28 h-28'} model-container`}>
                {/* Cursor hand click icon animation */}
                {model.highlight && showHighlights && (
                  <div 
                    className={`absolute z-[6] pointer-events-none ${animatingModels ? 'finger-tap-animation' : ''}`}
                    style={{
                      '--offset-x': `calc(${(model.highlightOffsetX || 0) + 15}px)`,
                      '--offset-y': `calc(${(model.highlightOffsetY || 0) - 15}px)`,
                      top: '50%',
                      left: '50%',
                      transform: `translate(calc(${(model.highlightOffsetX || 0) + 15}px), calc(${(model.highlightOffsetY || 0) - 15}px))`,
                    } as React.CSSProperties}
                  >
                    <svg className="h-11 w-11 text-[#fff4e2] drop-shadow-xl" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M30.4,17.6c-1.8-1.9-4.2-3.2-6.7-3.7c-1.1-0.3-2.2-0.5-3.3-0.6c2.8-3.3,2.3-8.3-1-11.1s-8.3-2.3-11.1,1s-2.3,8.3,1,11.1c0.6,0.5,1.2,0.9,1.8,1.1v2.2l-1.6-1.5c-1.4-1.4-3.7-1.4-5.2,0c-1.4,1.4-1.5,3.6-0.1,5l4.6,5.4c0.2,1.4,0.7,2.7,1.4,3.9c0.5,0.9,1.2,1.8,1.9,2.5v1.9c0,0.6,0.4,1,1,1h13.6c0.5,0,1-0.5,1-1v-2.6c1.9-2.3,2.9-5.2,2.9-8.1v-5.8C30.7,17.9,30.6,17.7,30.4,17.6z M8.4,8.2c0-3.3,2.7-5.9,6-5.8c3.3,0,5.9,2.7,5.8,6c0,1.8-0.8,3.4-2.2,4.5V7.9c-0.1-1.8-1.6-3.2-3.4-3.2c-1.8-0.1-3.4,1.4-3.4,3.2v5.2C9.5,12.1,8.5,10.2,8.4,8.2L8.4,8.2z M28.7,24c0.1,2.6-0.8,5.1-2.5,7.1c-0.2,0.2-0.4,0.4-0.4,0.7v2.1H14.2v-1.4c0-0.3-0.2-0.6-0.4-0.8c-0.7-0.6-1.3-1.3-1.8-2.2c-0.6-1-1-2.2-1.2-3.4c0-0.2-0.1-0.4-0.2-0.6l-4.8-5.7c-0.3-0.3-0.5-0.7-0.5-1.2c0-0.4,0.2-0.9,0.5-1.2c0.7-0.6,1.7-0.6,2.4,0l2.9,2.9v3l1.9-1V7.9c0.1-0.7,0.7-1.3,1.5-1.2c0.7,0,1.4,0.5,1.4,1.2v11.5l2,0.4v-4.6c0.1-0.1,0.2-0.1,0.3-0.2c0.7,0,1.4,0.1,2.1,0.2v5.1l1.6,0.3v-5.2l1.2,0.3c0.5,0.1,1,0.3,1.5,0.5v5l1.6,0.3v-4.6c0.9,0.4,1.7,1,2.4,1.7L28.7,24z" />
                    </svg>
                  </div>
                )}
                
                {/* Image container */}
                <div 
                  className={`absolute inset-0 cursor-pointer transition-transform duration-300 pointer-events-auto
                            ${model.highlight && animatingModels ? 'model-zoom-animation' : ''}`}
                  onClick={() => {
                    setSelectedModel(model);
                    setTooltipDismissed(true);
                    setShowTooltip(false);
                  }}
                  style={model.id === 1 ? { transform: 'rotate(0deg)' } : undefined}
                >
                  <img
                    src={model.imageSrc}
                    alt={`Product ${model.id}`}
                    className={`w-full h-full object-cover rounded-lg shadow-lg ${model.highlight && animatingModels ? 'brightness-125' : ''}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded model viewer overlay */}
      {selectedModel && (
        <div 
          ref={expandedViewRef}
          className={`fixed inset-0 z-[100] expanded-model-container ${isMobile ? 'items-center' : 'items-start'}`}
          style={{ 
            opacity: 1 - scrollProgress,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-start',
            alignItems: 'center',
            paddingLeft: isMobile ? '0' : '8rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedModel(null);
          }}
        >
          <div 
            className={`${isMobile ? (selectedModel.id === 6 || selectedModel.id === 5 || selectedModel.id === 3 || selectedModel.id === 1 ? 'w-[40%] h-[40%]' : 'w-[70%] h-[70%]') : 'w-[500px] h-[500px]'} bg-transparent ${isMobile ? 'left-1/2 -translate-x-1/2' : 'left-0'} relative`}
            style={{ 
              transition: 'transform 0.3s ease-in-out',
              transform: `translate(${isMobile ? '-50%, -84%' : '0, -50%'}) scale(${1 - scrollProgress * 0.2})`,
              position: 'fixed',
              top: '50%',
              left: isMobile ? '50%' : '8rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#30221c]/50 hover:bg-[#30221c]/70 transition-colors duration-200 z-10"
              style={{ opacity: 1 - scrollProgress }}
            >
              <svg
                className="w-5 h-5 text-[#fff4e2]/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-full h-full">
              {/* Expanded instructions */}
              <div 
                className={`absolute ${isMobile ? 'bottom-full left-0 mb-4' : 'top-4 left-4'} bg-[#30221c]/90 backdrop-blur-sm px-4 py-2 rounded-lg text-[#fff4e2] text-sm border border-[#d9c2a7]/20`}
                style={{ 
                  opacity: 1 - scrollProgress,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Drag to rotate • Pinch or scroll to zoom</span>
                </div>
              </div>
              <model-viewer
                className="expanded-model model-viewer-no-ui"
                src={selectedModel.modelSrc}
                camera-controls
                auto-rotate
                rotation-per-second="3deg"
                camera-orbit={selectedModel.cameraOrbit}
                shadow-intensity="0.5"
                shadow-softness="2"
                exposure="1"
                ui-info="no"
                ar-status="not-presenting"
                show-annotations="false"
                environment-image="neutral"
                enable-pan="false"
                reveal="auto"
                field-of-view="35deg"
                style={{ 
                  opacity: 1 - scrollProgress,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    background: 'transparent',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    zIndex: 10
                  }}
                  slot="shadow-root"
                ></div>
              </model-viewer>
            </div>
          </div>
        </div>
      )}

      {/* Top marker */}
      <div ref={topMarkerRef} className="absolute top-0 w-full h-1" />

      {/* Next component marker */}
      <div ref={nextComponentRef} className="absolute bottom-0 w-full h-1" />
    </section>
  );
};

export default Hero;