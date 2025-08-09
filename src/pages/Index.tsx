
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AnimatePresence } from "framer-motion";
import "../styles/mobile.css";

// Lazy load heavy components
import {
  LazyProjectsSection,
  LazyAboutSection,
  LazyTechStack,
  LazyContactSection,
  LazyProjectModal,
  LazyChatbot
} from "@/components/LazyComponents";


export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: "rakhimart",
    title: "RakhiMart - E-commerce Platform",
    description: "Production-ready e-commerce platform with advanced payment integration and multi-delivery partner support",
    longDescription: "A comprehensive e-commerce platform built for Rakhi sales featuring Cashfree payment integration, multi-delivery partner support (Delhivery, Shiprocket, Blue Dart, DTDC), and advanced admin dashboard. Built with React, TypeScript, and Supabase, this production-ready platform includes real-time order tracking, inventory management, AI-generated reviews, and automated email workflows. Demonstrates enterprise-level e-commerce development with security hardening and performance optimization.",
    technologies: ["React", "TypeScript", "Supabase", "Cashfree Payment", "Tailwind CSS", "Google Generative AI", "Recharts", "shadcn/ui"],
    demoUrl: "https://rakhimart.vercel.app/",
    githubUrl: "https://github.com/DhrubaAgarwalla/RakhiMart",
    imageUrl: "/rakhimart.png",
    highlights: [
      "Full-stack e-commerce platform with production deployment",
      "Cashfree payment integration with UPI, cards, and net banking",
      "Multi-delivery partner integration (Delhivery, Shiprocket, Blue Dart, DTDC)",
      "AI-generated product reviews using Google Generative AI",
      "Real-time order tracking and inventory management",
      "Comprehensive admin dashboard with analytics and shipping management",
      "Security hardening with webhook validation and CORS protection",
      "Multi-email provider support (SendGrid, Mailgun, Amazon SES, Postmark)"
    ]
  },
  {
    id: "event-manager",
    title: "NIT Silchar Event Manager",
    description: "75,000+ lines of AI-orchestrated code creating a comprehensive event management platform",
    longDescription: "A revolutionary event management platform built for NIT Silchar through advanced AI collaboration. This 75,000+ line codebase demonstrates the power of AI-driven development, featuring real-time data processing, automated workflows, and enterprise-level architecture - all created with $0 budget in just 3-4 weeks.",
    technologies: ["React", "Node.js", "Firebase", "Google Sheets API", "Recharts", "Cloudinary", "QR Code System"],
    demoUrl: "https://nits-event-managment.vercel.app/",
    githubUrl: "https://github.com/DhrubaAgarwalla/NITS-Event-Managment",
    imageUrl: "/event-manager photo.png",
    highlights: [
      "75,000+ lines of AI-orchestrated code",
      "Reduced event registration time by 70%",
      "Real-time QR code attendance system with email automation",
      "Google Sheets integration with automated data pipeline",
      "Role-based access control (Admin, Club, Participant)",
      "Built in 3-4 weeks with $0 budget through AI collaboration"
    ]
  },
  {
    id: "gitiq",
    title: "GitIQ - AI Repository Insights",
    description: "40,000+ lines of intelligent GitHub analysis tool with multi-AI provider integration",
    longDescription: "An advanced GitHub analytics platform showcasing the pinnacle of AI-driven development. Built in less than a week with 40,000+ lines of code, GitIQ integrates multiple AI providers (Groq, Google Gemini, HuggingFace) to deliver ultra-fast repository analysis with 0.12s processing time per commit.",
    technologies: ["Next.js 14", "TypeScript", "Groq AI", "Google Gemini", "HuggingFace", "Recharts", "GitHub API"],
    demoUrl: "https://git-iq.vercel.app/",
    githubUrl: "https://github.com/DhrubaAgarwalla/GitIQ",
    imageUrl: "/git photo.png",
    highlights: [
      "40,000+ lines built in less than a week",
      "Multi-AI provider integration (Groq, Gemini, HuggingFace)",
      "Ultra-fast processing: 0.12s per commit analysis",
      "Advanced commit categorization and pattern recognition",
      "Real-time repository health scoring",
      "Over-delivered: Created enterprise-level tool for club project"
    ]
  },
  {
    id: "portfolio-website",
    title: "AI-Orchestrated Portfolio",
    description: "This revolutionary portfolio website showcasing the future of AI-driven development",
    longDescription: "A cutting-edge portfolio website that demonstrates the pinnacle of AI-human collaboration in web development. Built with modern technologies and cyberpunk aesthetics, this portfolio itself is a testament to what's possible when strategic AI orchestration meets creative vision. Features advanced animations, responsive design, and a comprehensive showcase of AI-driven development methodology.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "shadcn/ui"],
    demoUrl: window.location.href,
    githubUrl: "https://github.com/DhrubaAgarwalla/stellar-code-lab",
    imageUrl: "/portfolio.png",
    highlights: [
      "Meta-project: Portfolio showcasing AI-orchestrated development",
      "Advanced cyberpunk design with glassmorphism effects",
      "Comprehensive sections: Hero, Projects, About, Tech Stack, Contact",
      "Enhanced 3D card effects and smooth animations",
      "Mobile-responsive with professional loading screen",
      "Built through strategic AI collaboration and prompt engineering"
    ]
  }
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Fallback component for lazy loading
  const SectionFallback = () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue"></div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <div
        className="min-h-screen relative overflow-hidden page-container"
        style={{
          backgroundColor: '#0a0a0a',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          backgroundAttachment: 'fixed'
        }}
      >
        <Navigation />
        <ParticleBackground />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded && !showLoading ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
          style={{ backgroundColor: 'transparent' }}
        >
        <div id="home">
          <Hero />
        </div>

        <Suspense fallback={<SectionFallback />}>
          <LazyProjectsSection
            projects={projects}
            onProjectClick={setSelectedProject}
          />
        </Suspense>

        <div id="about">
          <Suspense fallback={<SectionFallback />}>
            <LazyAboutSection />
          </Suspense>
        </div>

        <div id="tech">
          <Suspense fallback={<SectionFallback />}>
            <LazyTechStack />
          </Suspense>
        </div>

        <div id="contact">
          <Suspense fallback={<SectionFallback />}>
            <LazyContactSection />
          </Suspense>
        </div>
      </motion.div>

      <Suspense fallback={null}>
        <LazyProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>

        <ScrollToTop isProjectModalOpen={selectedProject !== null} />
        <BottomNavigation
          showLoading={showLoading}
          isProjectModalOpen={selectedProject !== null}
        />

        {/* AI Chatbot */}
        {!showLoading && (
          <Suspense fallback={null}>
            <LazyChatbot isProjectModalOpen={selectedProject !== null} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Index;
