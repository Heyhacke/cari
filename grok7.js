import React, { useState, useEffect, useRef } from 'react';
import { Star, Zap } from 'lucide-react';

const InteractiveLandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const generateStars = () => {
    return Array.from({ length: 50 }, (_, index) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3,
      speed: Math.random() * 0.5
    }));
  };

  const [stars] = useState(generateStars());

  return (
    <div 
      ref={backgroundRef} 
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden text-white"
    >
      {/* Animated Stars Background */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute opacity-50 animate-pulse"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            transform: `translateX(${(mousePosition.x - star.x) * star.speed * 0.02}px) 
                       translateY(${(mousePosition.y - star.y) * star.speed * 0.02}px)`
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Text */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Unleash Your <span className="text-blue-400">AI Potential</span>
          </h1>
          <p className="text-xl text-gray-300">
            Experience cutting-edge AI solutions that transform your workflow with intelligent automation.
          </p>
          
          {/* Interactive CTA */}
          <div 
            className="group relative inline-block"
          >
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-full 
                         hover:bg-blue-500 transition-all duration-300 
                         flex items-center space-x-2 transform 
                         group-hover:scale-105 group-hover:shadow-lg"
            >
              <Zap className="w-5 h-5 text-yellow-300" />
              <span>Explore AI Solutions</span>
            </button>
          </div>
        </div>

        {/* Right Column - Interactive Graphic */}
        <div 
          className="hidden md:flex justify-center items-center perspective-1000"
          style={{
            transform: `rotateX(${(mousePosition.y / window.innerHeight - 0.5) * 10}deg) 
                       rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 10}deg)`
          }}
        >
          <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-blue-500 
                          rounded-2xl shadow-2xl transform transition-transform">
            <div className="p-6 text-center">
              <Star className="mx-auto mb-4 text-yellow-300" size={48} />
              <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
              <p className="text-sm text-gray-200">
                Intelligent solutions that adapt and evolve
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLandingPage;