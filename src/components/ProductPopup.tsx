import React, { useState, useRef, useEffect } from 'react';
import { X, Star, Sun, Moon, ZoomIn, ZoomOut, Camera, Undo } from 'lucide-react';

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    modelSrc: string;
    iosSrc: string;
  };
}

const ProductPopup: React.FC<ProductPopupProps> = ({ isOpen, onClose, product }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const modelViewerRef = useRef<any>(null);
  const [cameraPosition, setCameraPosition] = useState({ orbit: '0deg 75deg 105%', target: '0m 0m 0m' });
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Initialize model-viewer element
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = cameraPosition.orbit;
      modelViewerRef.current.cameraTarget = cameraPosition.target;
    }
  }, [cameraPosition]);

  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' ? zoomLevel + 10 : zoomLevel - 10;
    setZoomLevel(Math.min(Math.max(newZoom, 50), 150));
    
    // Update camera orbit with new zoom
    const [theta, phi, radius] = cameraPosition.orbit.split(' ');
    const newRadius = `${(parseFloat(radius) * (direction === 'in' ? 1.1 : 0.9))}%`;
    setCameraPosition({ ...cameraPosition, orbit: `${theta} ${phi} ${newRadius}` });
  };

  const resetView = () => {
    setCameraPosition({ orbit: '0deg 75deg 105%', target: '0m 0m 0m' });
    setZoomLevel(100);
  };

  const takeScreenshot = async () => {
    if (modelViewerRef.current) {
      try {
        const blob = await modelViewerRef.current.toBlob({ idealAspect: true });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.title.toLowerCase().replace(/\s+/g, '-')}-screenshot.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#181819]/90 overflow-hidden">
      <div className={`w-full h-screen flex ${isDarkMode ? 'bg-[#181819]' : 'bg-[#fff4e2]'}`}>
        <div className={`flex ${isMobile ? 'flex-col h-full w-full' : 'h-full w-full'}`}>
          {/* Left side - 3D Model Viewer */}
          <div className={`${isMobile ? 'w-full h-[50vh]' : 'w-1/2 h-full'} border-r border-[#2A2A2C] relative overflow-hidden`}>
            {/* Model Viewer Controls */}
            <div className={`absolute ${isMobile ? 'bottom-4 gap-4 left-1/2 -translate-x-1/2' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'} flex gap-2 z-10`}>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 sm:p-3 rounded-xl bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
              <button
                onClick={() => handleZoom('out')}
                disabled={zoomLevel >= 150}
                className="p-2 sm:p-3 rounded-xl bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] transition-colors disabled:opacity-50"
                title="Zoom Out"
              >
                <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => handleZoom('in')}
                disabled={zoomLevel <= 50}
                className="p-2 sm:p-3 rounded-xl bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] transition-colors disabled:opacity-50"
                title="Zoom In"
              >
                <ZoomOut className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={resetView}
                className="p-2 sm:p-3 rounded-xl bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] transition-colors"
                title="Reset View"
              >
                <Undo className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={takeScreenshot}
                className="p-2 sm:p-3 rounded-xl bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] transition-colors"
                title="Take Screenshot"
              >
                <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="w-full h-full">
              <model-viewer
                ref={modelViewerRef}
                src={product.modelSrc}
                camera-controls
                auto-rotate={!isScreenshotMode}
                style={{ width: "100%", height: "100%", maxWidth: "100vw" }}
                background-color={isDarkMode ? "#181819" : "#fff4e2"}
                exposure={isDarkMode ? "0.8" : "1"}
                shadow-intensity="1"
                shadow-softness="0.5"
                camera-orbit={cameraPosition.orbit}
                camera-target={cameraPosition.target}
                field-of-view={`${zoomLevel}deg`}
                min-field-of-view="50deg"
                max-field-of-view="150deg"
                interaction-prompt="none"
              ></model-viewer>
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className={`${isMobile ? 'w-full h-[50vh]' : 'w-1/2 h-full'} flex flex-col ${isDarkMode ? 'bg-[#181819]' : 'bg-[#fff4e2]'}`}>
            {/* Header */}
            <div className={`${isMobile ? 'p-4 w-full' : 'p-8'} border-b ${isDarkMode ? 'border-[#2A2A2C]' : 'border-[#3d3938]/20'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'}`}>
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#677870] fill-current`} />
                      ))}
                    </div>
                    <span className="text-[#677870] text-sm">(24 reviews)</span>
                  </div>
                  <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'} mt-2 sm:mt-4`}>
                    {product.price}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#677870] hover:text-[#3d3938] transition-colors p-2"
                >
                  <X className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className={`flex-1 ${isMobile ? 'p-4 w-full' : 'p-8'} overflow-y-auto`}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'} mb-2 sm:mb-4`}>
                    Description
                  </h3>
                  <p className="text-[#677870] text-sm sm:text-lg leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'} mb-2 sm:mb-4`}>
                    Features
                  </h3>
                  <ul className="space-y-2 text-[#677870] text-sm sm:text-lg">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#677870]"></span>
                      Premium quality materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#677870]"></span>
                      Handcrafted with attention to detail
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#677870]"></span>
                      Sustainable and eco-friendly
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#677870]"></span>
                      Easy to assemble
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'} mb-2 sm:mb-4`}>
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-[#677870] text-sm sm:text-lg">
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'}`}>Material</p>
                      <p>Solid Wood</p>
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'}`}>Dimensions</p>
                      <p>120cm x 60cm x 45cm</p>
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'}`}>Weight</p>
                      <p>15kg</p>
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-[#fff4e2]' : 'text-[#3d3938]'}`}>Assembly</p>
                      <p>Required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={`${isMobile ? 'p-3 w-full' : 'p-4'} border-t ${isDarkMode ? 'border-[#2A2A2C]' : 'border-[#3d3938]/20'}`}>
              <div className="flex gap-3 sm:gap-4">
                <button className={`flex-1 ${
                  isDarkMode
                    ? 'bg-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870]'
                    : 'bg-[#3d3938] text-[#fff4e2] hover:bg-[#677870]'
                } py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-medium text-sm sm:text-lg transition-colors`}>
                  Add to Cart
                </button>
                <button className={`flex-1 border-2 ${
                  isDarkMode
                    ? 'border-[#2A2A2C] text-[#fff4e2] hover:bg-[#677870] hover:border-[#677870]'
                    : 'border-[#3d3938] text-[#3d3938] hover:bg-[#677870] hover:border-[#677870] hover:text-[#fff4e2]'
                } py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-medium text-sm sm:text-lg transition-colors`}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup; 