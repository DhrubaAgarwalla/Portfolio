import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

export const EnhancedParticleBackground = () => {
  const { scrollY, scrollProgress } = useScrollAnimation();
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 20,
      speed: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Scroll-Responsive Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 50}% ${50 + scrollProgress * 30}%, 
            rgba(0, 212, 255, ${0.1 + scrollProgress * 0.2}) 0%, 
            rgba(139, 92, 246, ${0.1 + scrollProgress * 0.15}) 50%, 
            transparent 100%)`,
        }}
      />

      {/* Interactive Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyber-blue/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -scrollY * particle.speed * 0.1, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1 + scrollProgress * 2, 1],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-cyber-purple/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + Math.sin(i) * 40}%`,
            width: `${20 + i * 5}px`,
            height: `${20 + i * 5}px`,
            borderRadius: i % 2 === 0 ? "50%" : "0%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1 + scrollProgress * 0.5, 1],
            y: [0, -scrollY * 0.1, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="rgba(0, 212, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth="1"
          strokeDasharray="3,7"
          animate={{
            strokeDashoffset: [0, -15],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};