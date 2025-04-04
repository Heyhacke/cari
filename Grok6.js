import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Rocket, Brain } from 'lucide-react';

// Optimized Particle Background with Advanced Interactions
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const { scrollY } = useViewportScroll();

  // Memoized mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Optimized particle generation
  const generateParticles = useMemo(() => {
    const particleCount = 200;
    return Array.from({ length: particleCount }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.5 ? 'white' : 'rgba(16, 185, 129, 0.5)' // mix of white and emerald
    }));
  }, []);

  useEffect(() => {
    setParticles(generateParticles);
    const intervalId = setInterval(() => {
      setParticles(generateParticles);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [generateParticles]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <AnimatePresence>
        {particles.map((particle) => {
          // Advanced particle movement calculation
          const dx = (particle.x / 100 * window.innerWidth) - mousePosition.x;
          const dy = (particle.y / 100 * window.innerHeight) - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          return (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0,
                x: `${particle.x}%`,
                y: `${particle.y}%`
              }}
              animate={{ 
                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                scale: [1, distance < 250 ? 1.8 : 1, 1],
                x: `calc(${particle.x}% + ${-dx * 0.02}px)`,
                y: `calc(${particle.y}% + ${-dy * 0.02}px)`,
                transition: { 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: Math.random() * 2
                }
              }}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Advanced Navigation with Dropdown and Mega Menu Concept
const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  const navigationItems = [
    {
      label: 'Grok',
      icon: <Brain className="mr-2 text-emerald-400" />,
      subItems: [
        { label: 'Overview', description: 'Explore Grok\'s capabilities' },
        { label: 'Pricing', description: 'Flexible plans for everyone' },
        { label: 'Case Studies', description: 'Real-world AI applications' }
      ]
    },
    {
      label: 'API',
      icon: <Rocket className="mr-2 text-blue-400" />,
      subItems: [
        { label: 'Documentation', description: 'Comprehensive API guides' },
        { label: 'Integration', description: 'Seamless AI integration' },
        { label: 'Developer Tools', description: 'Accelerate your projects' }
      ]
    },
    { label: 'Company', label: 'Careers', label: 'News' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Sparkle Effect */}
        <motion.div 
          className="text-white text-2xl font-bold flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="mr-2 text-emerald-400 animate-pulse" />
          Grok
        </motion.div>

        {/* Navigation with Mega Menu Concept */}
        <div className="flex space-x-6 relative">
          {navigationItems.map((item) => (
            <motion.div
              key={item.label}
              className="relative"
              onHoverStart={() => setActiveDropdown(item.label)}
              onHoverEnd={() => setActiveDropdown(null)}
            >
              <motion.div
                className="text-white/70 hover:text-white cursor-pointer flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                {item.icon || null}
                {item.label}
              </motion.div>

              {activeDropdown === item.label && item.subItems && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-full left-0 mt-4 w-64 bg-gray-900 rounded-lg shadow-2xl p-4 border border-white/10"
                >
                  {item.subItems.map((subItem) => (
                    <motion.div
                      key={subItem.label}
                      whileHover={{ 
                        x: 10,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className="py-2 border-b border-white/10 last:border-b-0"
                    >
                      <div className="text-white font-semibold">
                        {subItem.label}
                      </div>
                      <div className="text-white/60 text-sm">
                        {subItem.description}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            background: 'linear-gradient(45deg, #10b981, #059669)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 text-black px-6 py-3 rounded-full flex items-center font-bold uppercase tracking-wider transition-all duration-300"
        >
          Try Grok <ArrowRight className="ml-2" size={20} />
        </motion.button>
      </div>
    </nav>
  );
};

// Hero Section with Advanced Interactions
const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [inputText, setInputText] = useState('');
  const headlineText = "Understand The Universe";
  const subtitleText = "We are thrilled to unveil Grok 3, our most advanced model yet, blending superior reasoning with extensive pretraining knowledge.";

  // Typing effect for headline
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typedText.length < headlineText.length) {
        setTypedText(prev => headlineText.slice(0, prev.length + 1));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [typedText]);

  // AI-like input simulation
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-white mb-6 md:text-5xl sm:text-4xl"
        >
          {typedText.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              {index > 0 && ' '}
              {word === 'Universe' ? (
                <span className="text-emerald-400">{word}</span>
              ) : (
                word
              )}
            </React.Fragment>
          ))}
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 0.7, 
              repeat: Infinity 
            }}
            className="inline-block ml-1 bg-white"
          >
            |
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-white/80 mb-8 md:text-lg sm:text-base"
        >
          {subtitleText}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <motion.input
            value={inputText}
            onChange={handleInputChange}
            whileFocus={{ 
              scale: 1.02,
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.5)'
            }}
            className="bg-black/50 border border-white/20 text-white px-4 py-3 rounded-full w-full max-w-md mb-4 transition-all duration-300 focus:outline-none"
            placeholder="Ask Grok anything..."
          />
          {inputText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full mt-2 bg-gray-900/80 backdrop-blur-md rounded-lg p-4 text-left"
            >
              <div className="text-white/80">
                Generating response for: <span className="font-bold text-emerald-400">{inputText}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-1 bg-emerald-500 mt-2"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Main App Component with Additional Sections Stub
const GrokLandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navigation />
      <HeroSection />
      {/* Placeholder for additional sections */}
      <div className="h-screen bg-black/80">
        {/* Future sections will go here */}
      </div>
    </div>
  );
};

export default GrokLandingPage;