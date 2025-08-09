import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Link, Download, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useScrollZoom, useParallax } from "@/hooks/useScrollAnimation";

export const InteractiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const { scale } = useScrollZoom(0.0003);
  const { y: parallaxY } = useParallax(0.3);

  // Smooth mouse tracking
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  // Scroll-based transformations
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) * 0.02,
          y: (e.clientY - rect.top - rect.height / 2) * 0.02,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ 
        scale: heroScale, 
        opacity: heroOpacity,
        y: textY 
      }}
      className="min-h-screen flex items-center justify-center relative cyber-grid overflow-hidden"
    >
      {/* Interactive Background Elements */}
      <motion.div 
        style={{ x, y }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Main Title with Zoom Effect */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-4 text-cyber leading-tight"
            style={{ transform: `scale(${scale})` }}
            whileHover={{ 
              scale: scale * 1.02,
              textShadow: "0 0 30px rgba(0, 212, 255, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            DHRUBA KUMAR AGARWALLA
          </motion.h1>

          {/* Subtitle with Parallax */}
          <motion.h2
            style={{ y: parallaxY * 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-rajdhani font-medium mb-6 text-cyber-purple"
            whileHover={{ 
              scale: 1.05,
              color: "#00d4ff"
            }}
          >
            AI-Orchestrated Full-Stack Developer
          </motion.h2>

          {/* Interactive Stats Card */}
          <motion.div
            style={{ y: parallaxY * -0.3 }}
            className="glass-card p-3 sm:p-4 md:p-8 max-w-3xl mx-auto mb-6 md:mb-8 relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2)"
            }}
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 border border-cyber-blue/30 rounded-lg"
              animate={{
                borderColor: ["rgba(0, 212, 255, 0.3)", "rgba(139, 92, 246, 0.5)", "rgba(0, 212, 255, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <h3 className="text-base sm:text-lg md:text-2xl font-rajdhani font-medium mb-3 md:mb-4 text-white">
              Transforming Complex Ideas into Production Reality
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-300 leading-relaxed mb-3 md:mb-4">
              2nd Year Civil Engineering Student at NIT Silchar pioneering the future of AI-driven development.
              I don't just write code - I orchestrate solutions through advanced AI collaboration.
            </p>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 md:gap-4 text-center">
              {[
                { value: "155K+", label: "Lines", color: "cyber-blue", icon: "💻" },
                { value: "$0", label: "Budget", color: "cyber-green", icon: "💰" },
                { value: "4", label: "Projects", color: "cyber-purple", icon: "🚀" },
                { value: "2nd", label: "Prize", color: "cyber-yellow", icon: "🏆" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-1.5 sm:p-2 md:p-3 relative group cursor-pointer"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    z: 50
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.6 }}
                  />
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-${stat.color} font-bold text-xs sm:text-sm md:text-lg`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Action Buttons */}
          <motion.div
            style={{ y: parallaxY * -0.2 }}
            className="flex gap-2 sm:gap-3 md:gap-6 justify-center flex-wrap"
          >
            {[
              { 
                icon: Github, 
                label: "GitHub", 
                href: "https://github.com/DhrubaAgarwalla",
                gradient: "from-gray-600 to-gray-800"
              },
              { 
                icon: Link, 
                label: "LinkedIn", 
                href: "https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/",
                gradient: "from-blue-600 to-blue-800"
              },
              { 
                icon: Download, 
                label: "Resume", 
                href: "/Resume.pdf",
                gradient: "from-green-600 to-green-800"
              },
            ].map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 212, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${button.gradient} opacity-0 group-hover:opacity-20`}
                  transition={{ duration: 0.3 }}
                />
                <button.icon className="w-5 h-5 z-10 relative" />
                <span className="font-medium z-10 relative">{button.label}</span>
              </motion.a>
            ))}

            {/* Special Projects Button */}
            <motion.button
              className="glass-card px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple text-xs sm:text-sm md:text-base relative overflow-hidden group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 15px 30px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="flex items-center gap-2 z-10 relative">
                <Zap className="w-5 h-5" />
                <span className="font-medium text-white">View Projects</span>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating 3D Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-cyber-blue/20 rotate-45 hidden lg:block"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.sin(i) * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};