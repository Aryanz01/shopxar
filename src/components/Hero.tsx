import React, { useState, useEffect } from 'react';

// Add this type at the top of the file
type Model = {
  id: number;
  position: string;
  modelSrc: string;
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
};

const Hero = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [animatingModels, setAnimatingModels] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  
  // Tooltip position configuration
  const tooltipPosition = {
    top: '6', // Distance from top in pixels - moved higher to top of shelf
    horizontalOffset: '0', // Centered horizontally
  };
  
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
          border-color: rgba(255, 244, 226, 0.6);
        }
        25% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1.2);
          border-color: rgba(255, 244, 226, 1);
        }
        50% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1);
          border-color: rgba(255, 244, 226, 0.6);
        }
        75% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1.2);
          border-color: rgba(255, 244, 226, 1);
        }
        100% { 
          transform: translate(var(--offset-x), var(--offset-y)) scale(1);
          border-color: rgba(255, 244, 226, 0.6);
        }
      }
      .highlight-animation {
        animation: highlight-position 4s ease-in-out;
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

  const models = [
    {
      id: 1,
      position: 'top-[41.5%] right-[39%]',
      modelSrc: 'https://angle-3d-demo.myshopify.com/cdn/shop/3d/models/o/4acb33bc7cc53ea1/apple-watch.glb?v=0',
      scale: 'scale-[0.6]',
      rotation: 'rotate-90',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 87deg 105%',
    },
    {
      id: 2,
      position: 'top-[28%] right-[25%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/88174270d865823c/headphone_headset.glb',
      scale: 'scale-[1.4]',
      rotation: 'rotate-270',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 98deg 105%',
      highlight: true,
      highlightSize: 80, // Larger square for headphones
      highlightOffsetX: 0,
      highlightOffsetY: 0,
    },
    {
      id: 3,
      position: 'top-[77%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/f0733ecc7a32b9d8/iphone_16_pro_max.glb',
      scale: 'scale-[0.6]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '90deg 90deg 110%',
    },
    {
      id: 4,
      position: 'top-[80%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b705057628482aab/mechanical_keyboard_-_aesthetic.glb',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      cameraOrbit: '0deg 70deg 105%',
    },
    {
      id: 5,
      position: 'top-[39.6%] left-[67%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/97a034ad7547e534/chinese_vase.glb',
      cameraOrbit: '0deg 83deg',
      scale: 'scale-[0.69]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 6,
      position: 'top-[26.7%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/17856a3ec41e1217/microphone.glb',
      cameraOrbit: 'odeg 100deg',
      scale: 'scale-[0.65]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
      highlight: true,
      highlightSize: 167, // Base size for microphone
      highlightOffsetY: 20,
      highlightOffsetX: 0,
    },
    {
      id: 7,
      position: 'top-[53%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/122aa9e96161099f/cinema_camera.glb',
      cameraOrbit: '50deg 90deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 8,
      position: 'top-[52%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/a0bc8bbb4b6024b5/air_jordan_1.glb',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[1.3]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 9,
      position: 'top-[67%] right-[26%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b8c47a616dcc3199/low_poly_car_-_cadillac_75_sedan_1953.glb',
      cameraOrbit: '50deg 94deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
    {
      id: 10,
      position: 'top-[65.5%] right-[39%]',
      modelSrc: 'https://cdn.shopify.com/3d/models/b04d6ab77c573e10/jbl_xtreme_3.glb',
      cameraOrbit: '5deg 80deg',
      scale: 'scale-[1]',
      rotation: 'rotate-0',
      yOffset: 'translate-y-0',
      xOffset: 'translate-x-0',
    },
  ];

  return (
    <section className="relative h-[100vh] overflow-hidden rounded-2xl">
      {/* Background image container */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/final.jpg"
          alt="Illuminated wooden shelves"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Shelf 3D model in background - Fixed Position */}
      {modelsLoaded && (
        <div 
          className="absolute w-full h-full z-[10]"
          style={{ 
            top: '12%',
            right: '-14.1%',
            left: 'auto',
            bottom: 'auto',
            transform: `translateZ(-100px) rotate(0.3deg)`,
            transformOrigin: 'center center',
            position: 'absolute'
          }}
        >
          <model-viewer
            className="w-full h-full"
            style={{ 
              transform: `scale(1.1)`, 
              transformOrigin: 'center center',
              display: 'block'
            }}
            src="https://cdn.shopify.com/3d/models/3d72a3f9a696850b/untitled.glb"
            camera-controls={false}
            auto-rotate={false}
            rotation-per-second="0deg"
            interaction-prompt="none"
            camera-orbit="0deg 86deg 180%"
            min-camera-orbit="auto auto 180%"
            max-camera-orbit="auto auto 180%"
            disable-zoom
            disable-pan
            ar-status="not-presenting"
            environment-image="neutral"
            exposure="0.7"
            shadow-intensity="0"
            field-of-view="45deg"
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
      )}

      {/* Interactive tooltip - Shown during animation */}
      {showTooltip && modelsLoaded && !selectedModel && !tooltipDismissed && (
        <div 
          className={`fixed z-[50] 
                      bg-gradient-to-r from-[#30221c]/90 to-[#3d2c20]/90 backdrop-blur-sm
                      px-8 py-5 rounded-lg shadow-2xl border border-[#d9c2a7]/20
                      transition-all duration-300 ease-in-out w-auto mx-auto
                      ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            top: `${tooltipPosition.top}rem`,
            left: '50%',
            transform: `translateX(calc(-50% + ${tooltipPosition.horizontalOffset}px))`,
            minWidth: '280px',
            maxWidth: '400px'
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
              className={`absolute ${model.position} ${model.scale} ${model.rotation} ${model.yOffset} ${model.xOffset}`}
            >
              <div className="relative w-28 h-28">
                {/* Square highlighting around the model */}
                {model.highlight && showHighlights && (
                  <div 
                    className={`absolute border-[4px] border-[#fff4e2] bg-[#fff4e2]/10 z-[5] pointer-events-none
                              ${animatingModels ? 'highlight-animation' : ''}`}
                    style={{
                      '--offset-x': `calc(-50% + ${model.highlightOffsetX || 0}px)`,
                      '--offset-y': `calc(-50% + ${model.highlightOffsetY || 0}px)`,
                      width: `${model.highlightSize || 80}px`,
                      height: `${model.highlightSize || 80}px`,
                      top: '50%',
                      left: '50%',
                      transform: `translate(calc(-50% + ${model.highlightOffsetX || 0}px), calc(-50% + ${model.highlightOffsetY || 0}px))`,
                      borderRadius: '4px'
                    } as React.CSSProperties}
                  ></div>
                )}
                
                {/* Model container */}
                <div 
                  className={`absolute inset-0 cursor-pointer transition-transform duration-300 pointer-events-auto
                            ${model.highlight && animatingModels ? 'model-zoom-animation' : ''}`}
                  onClick={() => {
                    setSelectedModel(model);
                    setTooltipDismissed(true);
                    setShowTooltip(false);
                  }}
                >
                  <model-viewer
                    className={`model-viewer-shadow model-viewer-no-ui ${model.highlight && animatingModels ? 'brightness-125' : ''}`}
                    src={model.modelSrc}
                    camera-controls
                    auto-rotate
                    rotation-per-second="0deg"
                    interaction-prompt="none"
                    camera-orbit={model.cameraOrbit}
                    min-camera-orbit="auto auto auto"
                    max-camera-orbit="auto auto auto"
                    disable-zoom
                    ui-info="no"
                    ar-status="not-presenting"
                    show-annotations="false"
                    environment-image="neutral"
                    enable-pan="false"
                    reveal="auto"
                    shadow-intensity="0.5"
                    shadow-softness="2"
                    exposure="1"
                    field-of-view="35deg"
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
          ))}
        </div>
      )}

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 h-full relative z-[20] pointer-events-none">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          {selectedModel ? (
            <h1 className="text-9xl font-bold text-[#fff4e2]/10 select-none">
              ShopXAR
            </h1>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#fff4e2] mb-4 sm:mb-6 leading-tight">
                Product <span className="text-[#677870]">visualizations</span><br />
                with <span className="text-[#677870]">3D</span> modeling<br />
                services
              </h1>
              <p className="text-[#fff4e2]/20 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl">
                Infuse unparalleled realism with 3D visualization where we comprehensively 
                boast your business capabilities.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 relative pointer-events-auto">
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

      {/* Expanded model viewer overlay */}
      {selectedModel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-start"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedModel(null);
          }}
        >
          <div 
            className="ml-[190px] mt-[150px] w-[500px] h-[500px] bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              {/* Expanded instructions */}
              <div className="absolute bottom-full left-0 mb-4 bg-[#30221c]/90 backdrop-blur-sm px-4 py-2 rounded-lg text-[#fff4e2] text-sm border border-[#d9c2a7]/20 animate-fade-in">
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
    </section>
  );
};

export default Hero;