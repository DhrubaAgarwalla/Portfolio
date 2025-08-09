
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Link, ArrowUp } from "lucide-react";
import { Project } from "@/pages/Index";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8 modal-content">
              {/* Header */}
              <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8">
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-cyber leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h2>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors duration-300 touch-friendly"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mb-4 sm:mb-6 md:mb-8 rounded-lg sm:rounded-xl overflow-hidden"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-contain max-w-full"
                  style={{ maxHeight: '70vh' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-4 sm:mb-6 md:mb-8"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white">About This Project</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4 sm:mb-6 md:mb-8"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-full text-cyber-blue border border-cyber-blue/30 font-medium text-xs sm:text-sm md:text-base"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-4 sm:mb-6 md:mb-8"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {project.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg"
                    >
                      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-green mt-0.5 transform rotate-90 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 touch-friendly text-sm sm:text-base"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Code</span>
                </motion.button>

                {project.demoUrl && (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue rounded-lg transition-all duration-500 text-white font-medium touch-friendly text-sm sm:text-base"
                  >
                    <Link className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Website</span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
