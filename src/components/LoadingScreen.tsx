import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code, Cpu, Zap, Image, Wifi, Database } from "lucide-react";
import { preloadComponents } from "./LazyComponents";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingTasks, setLoadingTasks] = useState<string[]>([]);
  const { isMobile, isLowEndDevice, connectionSpeed } = usePerformanceOptimization();

  const loadingSteps = [
    { icon: <Image className="w-6 h-6" />, text: "Preloading Assets...", color: "cyber-blue" },
    { icon: <Code className="w-6 h-6" />, text: "Loading Components...", color: "cyber-purple" },
    { icon: <Database className="w-6 h-6" />, text: "Initializing Data...", color: "cyber-green" },
    { icon: <Cpu className="w-6 h-6" />, text: "Optimizing Performance...", color: "cyber-blue" },
    { icon: <Wifi className="w-6 h-6" />, text: "Establishing Connections...", color: "cyber-purple" },
    { icon: <Zap className="w-6 h-6" />, text: "Finalizing Portfolio...", color: "cyber-green" }
  ];

  // Preload critical assets
  const preloadAssets = async () => {
    const assetsToPreload = [
      '/Resume.pdf',
      // Add any other critical assets here
    ];

    const imagePromises = assetsToPreload.map(src => {
      return new Promise((resolve, reject) => {
        if (src.endsWith('.pdf')) {
          // For PDFs, just check if they exist
          fetch(src, { method: 'HEAD' })
            .then(() => resolve(src))
            .catch(() => resolve(src)); // Don't fail loading for missing PDFs
        } else {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src); // Don't fail loading for missing images
          img.src = src;
        }
      });
    });

    try {
      await Promise.all(imagePromises);
      setLoadingTasks(prev => [...prev, 'Assets preloaded']);
    } catch (error) {
      console.log('Some assets failed to preload, continuing...');
      setLoadingTasks(prev => [...prev, 'Assets loaded with fallbacks']);
    }
  };

  // Preload fonts and critical CSS
  const preloadFonts = async () => {
    try {
      // Force font loading by creating invisible elements
      const testElements = [
        { fontFamily: 'Orbitron', text: 'DHRUBA KUMAR AGARWALLA' },
        { fontFamily: 'Rajdhani', text: 'AI-Orchestrated Full-Stack Developer' }
      ];

      testElements.forEach(({ fontFamily, text }) => {
        const span = document.createElement('span');
        span.style.fontFamily = fontFamily;
        span.style.position = 'absolute';
        span.style.left = '-9999px';
        span.style.visibility = 'hidden';
        span.textContent = text;
        document.body.appendChild(span);

        // Remove after a short delay
        setTimeout(() => {
          document.body.removeChild(span);
        }, 100);
      });

      setLoadingTasks(prev => [...prev, 'Fonts optimized']);
    } catch (error) {
      setLoadingTasks(prev => [...prev, 'Fonts loaded']);
    }
  };

  // Initialize heavy components in background
  const initializeComponents = async () => {
    try {
      // Preload all heavy components
      preloadComponents();
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadingTasks(prev => [...prev, 'Components preloaded']);
    } catch (error) {
      console.log('Component preloading completed with fallbacks');
      setLoadingTasks(prev => [...prev, 'Components initialized']);
    }
  };

  // Warm up animations
  const warmupAnimations = async () => {
    // Pre-calculate some animation values
    await new Promise(resolve => setTimeout(resolve, 200));
    setLoadingTasks(prev => [...prev, 'Animations optimized']);
  };

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepInterval: NodeJS.Timeout;

    const runOptimizations = async () => {
      // Start the loading tasks in parallel
      const optimizationTasks = [
        preloadAssets(),
        preloadFonts(),
        initializeComponents(),
        warmupAnimations()
      ];

      // Run tasks in background while showing progress
      Promise.all(optimizationTasks).then(() => {
        setLoadingTasks(prev => [...prev, 'All optimizations complete']);
      });

      // Optimize loading speed based on device performance
      const progressIncrement = isLowEndDevice ? 1.2 : isMobile ? 1.5 : 2;
      const progressInterval_ms = isLowEndDevice ? 100 : isMobile ? 80 : 60;
      const stepInterval_ms = isLowEndDevice ? 1500 : isMobile ? 1200 : 1000;
      const completionDelay = connectionSpeed === 'slow' ? 800 : 400;

      // Start progress and step intervals
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Adjust completion delay based on performance
            setTimeout(onLoadingComplete, completionDelay);
            return 100;
          }
          return prev + progressIncrement;
        });
      }, progressInterval_ms);

      stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % loadingSteps.length);
      }, stepInterval_ms);
    };

    runOptimizations();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-4 sm:px-6">
        {/* Main Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-cyber mb-4"
            animate={{
              textShadow: [
                "0 0 20px #00d4ff",
                "0 0 30px #00d4ff",
                "0 0 20px #00d4ff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-gray-300 font-rajdhani"
          >
            AI-Orchestrated Development
          </motion.p>
        </motion.div>

        {/* Loading Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-full bg-${loadingSteps[currentStep].color}/20 text-${loadingSteps[currentStep].color}`}
            >
              {loadingSteps[currentStep].icon}
            </motion.div>
            <span className="text-white font-medium text-sm sm:text-base md:text-lg">
              {loadingSteps[currentStep].text}
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span>Loading Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green rounded-full relative"
            >
              <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 text-center"
        >
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-blue">140K+</div>
            <div className="text-xs text-gray-400">Lines of Code</div>
          </div>
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-green">$0</div>
            <div className="text-xs text-gray-400">Budget Used</div>
          </div>
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-purple">4</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
        </motion.div>

        {/* Optimization Status (subtle) */}
        {loadingTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-center"
          >
            <div className="text-xs text-gray-500 mb-2">System Optimizations</div>
            <div className="flex flex-wrap justify-center gap-1 max-w-xs mx-auto">
              {loadingTasks.slice(-3).map((task, index) => (
                <motion.span
                  key={task}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs px-2 py-1 bg-cyber-blue/10 text-cyber-blue/70 rounded-full"
                >
                  ✓
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Floating Particles - Reduced count on mobile/low-end devices */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isLowEndDevice ? 5 : isMobile ? 8 : 15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
