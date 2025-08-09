import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Zap, Code2, Database, Cpu } from "lucide-react";
import { Project } from "@/pages/Index";

interface InteractiveProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const InteractiveProjectCard = ({ project, index, onClick }: InteractiveProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const getProjectIcon = (tech: string[]) => {
    if (tech.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('groq'))) {
      return <Cpu className="w-6 h-6" />;
    }
    if (tech.some(t => t.toLowerCase().includes('database') || t.toLowerCase().includes('supabase'))) {
      return <Database className="w-6 h-6" />;
    }
    return <Code2 className="w-6 h-6" />;
  };

  return (
    <motion.div
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 100 }}
        className="relative"
      >
        {/* Main Card */}
        <motion.div
          className="glass-card p-6 cursor-pointer relative overflow-hidden min-h-[400px] border border-white/10"
          onClick={onClick}
          whileHover={{ 
            boxShadow: "0 25px 50px rgba(0, 212, 255, 0.3)",
            borderColor: "rgba(0, 212, 255, 0.5)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={isHovered ? {
              background: [
                "linear-gradient(45deg, rgba(0, 212, 255, 0.1), transparent)",
                "linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.1))",
                "linear-gradient(225deg, rgba(0, 212, 255, 0.1), transparent)",
                "linear-gradient(315deg, transparent, rgba(139, 92, 246, 0.1))",
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Floating Icon */}
          <motion.div
            className="absolute top-4 right-4 p-2 rounded-full bg-cyber-blue/20 text-cyber-blue"
            animate={isHovered ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformStyle: "preserve-3d", z: 10 }}
          >
            {getProjectIcon(project.technologies)}
          </motion.div>

          {/* Project Image with Parallax */}
          <motion.div
            className="relative mb-6 rounded-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            
            {/* Overlay Action Buttons */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            >
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cyber-blue/80 rounded-full text-white hover:bg-cyber-blue"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/80 rounded-full text-white hover:bg-gray-700"
                whileHover={{ scale: 1.1, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            style={{ transformStyle: "preserve-3d", z: 20 }}
          >
            <motion.h3
              className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-gray-300 text-sm mb-4 line-clamp-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              {project.description}
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue text-xs rounded-full border border-cyber-blue/30"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(0, 212, 255, 0.3)",
                    y: -2
                  }}
                  transition={{ delay: techIndex * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 3 && (
                <motion.span
                  className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  +{project.technologies.length - 3}
                </motion.span>
              )}
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="space-y-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                <motion.div
                  key={highlightIndex}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: highlightIndex * 0.1 }}
                >
                  <Zap className="w-3 h-3 text-cyber-yellow mt-1 flex-shrink-0" />
                  <span className="text-xs text-gray-400">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: isHovered 
                ? "linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)"
                : "transparent"
            }}
            animate={isHovered ? {
              x: ["-100%", "100%"]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>

        {/* 3D Shadow */}
        <motion.div
          className="absolute inset-0 bg-black/20 blur-xl"
          style={{
            transformStyle: "preserve-3d",
            z: -10,
            rotateX,
            rotateY,
          }}
          animate={isHovered ? {
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};