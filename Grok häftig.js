import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useViewportScroll, useScroll } from 'framer-motion';
import { 
  Star, ArrowRight, Sparkles, Rocket, Brain, 
  Code, Zap, Shield, Database, 
  MessageCircle, Users, Globe 
} from 'lucide-react';

// Enhanced Particle Background with Parallax and Depth
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const { scrollY } = useViewportScroll();

  // Advanced color palette with dynamic gradient particles
  const generateParticleColor = () => {
    const colors = [
      'white', 
      'rgba(16, 185, 129, 0.5)', 
      'rgba(59, 130, 246, 0.4)', 
      'rgba(236, 72, 153, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // More sophisticated particle generation
  const generateParticles = useMemo(() => {
    const particleCount = 250;
    return Array.from({ length: particleCount }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random(), // depth layer
      size: Math.random() * 6 + 1,
      speed: Math.random() * 0.6 + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
      color: generateParticleColor()
    }));
  }, []);

  useEffect(() => {
    setParticles(generateParticles);
    const intervalId = setInterval(() => {
      setParticles(generateParticles);
    }, 8000);
    return () => clearInterval(intervalId);
  }, [generateParticles]);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,1) 100%)'
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0,
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: 1
            }}
            animate={{ 
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, particle.z > 0.7 ? 1.5 : 1, 1],
              x: `calc(${particle.x}% + ${Math.random() * 10 - 5}px)`,
              y: `calc(${particle.y}% + ${Math.random() * 10 - 5}px)`,
              transition: { 
                duration: 7,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 2
              }
            }}
            className="absolute rounded-full blur-[1px] opacity-70"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `translateZ(${particle.z * 100}px)`
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// Advanced Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Code className="text-emerald-400" size={40} />,
      title: 'Advanced Programming',
      description: 'Comprehensive code generation and debugging across multiple languages.',
      color: 'emerald'
    },
    {
      icon: <Zap className="text-blue-400" size={40} />,
      title: 'Rapid Insights',
      description: 'Ultra-fast processing with state-of-the-art AI reasoning.',
      color: 'blue'
    },
    {
      icon: <Shield className="text-purple-400" size={40} />,
      title: 'Ethical AI',
      description: 'Robust safety protocols and transparent decision-making.',
      color: 'purple'
    },
    {
      icon: <Database className="text-pink-400" size={40} />,
      title: 'Vast Knowledge',
      description: 'Trained on extensive, up-to-date multidisciplinary datasets.',
      color: 'pink'
    }
  ];

  return (
    <section className="relative py-20 bg-black/90">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Unleash the Power of <span className="text-emerald-400">Intelligent AI</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className={`bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-${feature.color}-500/50 transition-all duration-300`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section with Dynamic Interactions
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'Lead Developer',
      quote: 'Grok has transformed our development workflow with its incredible code generation capabilities.',
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'Sarah Chen',
      role: 'Data Scientist',
      quote: 'The depth of insights and multidisciplinary knowledge is simply unparalleled.',
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'Michael Kumar',
      role: 'Tech Entrepreneur',
      quote: 'Grok\'s ethical AI approach gives me confidence in deploying advanced machine learning solutions.',
      avatar: '/api/placeholder/80/80'
    }
  ];

  return (
    <section className="relative py-20 bg-black/95">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          What <span className="text-emerald-400">Innovators</span> Are Saying
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
            >
              <p className="text-white/80 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Updated Hero Section with More Dynamic Elements
const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [inputText, setInputText] = useState('');
  const headlineText = "Understand The Universe";
  const subtitleText = "Grok 3 represents a quantum leap in AI - combining unparalleled reasoning with a comprehensive, continually updated knowledge base.";

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

// Updated Navigation with More Interactive Elements
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
      label: 'Solutions',
      icon: <Brain className="mr-2 text-emerald-400" />,
      subItems: [
        { 
          label: 'Enterprise AI', 
          description: 'Advanced AI solutions for businesses',
          icon: <Users className="mr-2 text-blue-400" />
        },
        { 
          label: 'Research Tools', 
          description: 'Powerful AI for academic and scientific research',
          icon: <Globe className="mr-2 text-purple-400" />
        },
        { 
          label: 'Developer Platform', 
          description: 'AI-powered coding and development',
          icon: <Code className="mr-2 text-pink-400" />
        }
      ]
    },
    {
      label: 'API',
      icon: <Rocket className="mr-2 text-blue-400" />,
      subItems: [
        { 
          label: 'Documentation', 
          description: 'Comprehensive API guides',
          icon: <MessageCircle className="mr-2 text-emerald-400" />
        },
        { 
          label: 'Integration', 
          description: 'Seamless AI integration',
          icon: <Shield className="mr-2 text-red-400" />
        }
      ]
    },
    { 
      label: 'Company', 
      icon: <Star className="mr-2 text-yellow-400" />,
      subItems: [
        { 
          label: 'About Us', 
          description: 'Our mission and vision',
          icon: <Globe className="mr-2 text-indigo-400" />
        },
        { 
          label: 'Careers', 
          description: 'Join our innovative team',
          icon: <Users className="mr-2 text-green-400" />
        }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Sparkle Effect */}
        <motion.div 
          className="text-white text-2xl font-bold flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="mr-2 text-emerald-400 animate-pulse" />
          Grok AI
        </motion.div>

        {/* Navigation with Enhanced Mega Menu */}
        <div className="flex space-x-6 relative">
          {navigationItems.map((item) => (
            <motion.div
              key={item.label}
              className="relative group"
              onHoverStart={() => setActiveDropdown(item.label)}
              onHoverEnd={() => setActiveDropdown(null)}
            >
              <motion.div
                className="text-white/70 hover:text-white cursor-pointer flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                {item.icon}
                {item.label}
              </motion.div>

              {activeDropdown === item.label && item.subItems && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-full left-0 mt-4 w-72 bg-gray-900 rounded-xl shadow-2xl p-4 border border-white/10"
                >
                  {item.subItems.map((subItem) => (
                    <motion.div
                      key={subItem.label}
                      whileHover={{ 
                        x: 10,
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className="py-3 border-b border-white/10 last:border-b-0 flex items-center"
                    >
                      {subItem.icon}
                      <div>
                        <div className="text-white font-semibold">
                          {subItem.label}
                        </div>
                        <div className="text-white/60 text-sm">
                          {subItem.description}
                        </div>
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
          Get Started <ArrowRight className="ml-2" size={20} />
        </motion.button>
      </div>
    </nav>
  );
};

// Main App Component with Enhanced Sections
const GrokLandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default GrokLandingPage;