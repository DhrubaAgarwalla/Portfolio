/**
 * Comprehensive Knowledge Base for Dhruba Kumar Agarwalla's AI Portfolio Chatbot
 * This file contains detailed information about Dhruba's profile, projects, achievements, and expertise
 * to enable the AI chatbot to provide accurate and detailed responses.
 */

export interface PersonalProfile {
  name: string;
  title: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    branch: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    github: string;
    portfolio: string;
  };
  specialization: string[];
  philosophy: string;
  achievements: string[];
}

export interface ProjectDetails {
  name: string;
  description: string;
  detailedDescription: string;
  linesOfCode: number;
  technologies: string[];
  features: string[];
  highlights: string[];
  developmentApproach: string;
  challenges: string[];
  solutions: string[];
  impact: string;
  githubUrl: string;
  demoUrl?: string;
  status: 'completed' | 'in-progress' | 'planning';
  developmentTime: string;
}

export interface TechnicalExpertise {
  category: string;
  skills: string[];
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
}

export interface AIOrchestrationDetails {
  definition: string;
  approach: string;
  benefits: string[];
  process: string[];
  tools: string[];
  examples: string[];
}

export interface AugmentCodeDetails {
  name: string;
  description: string;
  primaryModel: string;
  keyFeatures: string[];
  contextEngine: string[];
  performance: string[];
  usageExperience: string[];
  advantages: string[];
}

class KnowledgeBase {
  // Personal Profile
  public readonly personalProfile: PersonalProfile = {
    name: "Dhruba Kumar Agarwalla",
    title: "AI-Orchestrated Full-Stack Developer",
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "National Institute of Technology (NIT) Silchar",
      year: "2024-2028",
      branch: "Civil Engineering (2nd Year)"
    },
    contact: {
      email: "dhrubagarwala67@gmail.com",
      whatsapp: "9395386870",
      github: "https://github.com/DhrubaAgarwalla",
      portfolio: "https://portfolio-dhruba.vercel.app/"
    },
    specialization: [
      "AI-Orchestrated Development",
      "Prompt Engineering",
      "Full-Stack Web Development",
      "AI/ML Integration",
      "Automation Systems",
      "Resource Optimization"
    ],
    philosophy: "Creating large-scale, production-ready applications through strategic AI collaboration and prompt engineering, without traditional coding knowledge. Combining AI/ML with web development to build exceptional user experiences.",
    achievements: [
      "2nd Prize Winner in CSS Hacks Hackathon",
      "Built Event Manager (75,000+ lines) through AI orchestration",
      "Developed GitIQ (40,000+ lines) using AI-driven development",
      "Created advanced portfolio with AI chatbot integration",
      "Specialized in rapid development through AI collaboration",
      "Expert in bypassing platform restrictions for automation systems"
    ]
  };

  // Detailed Project Information
  public readonly projects: Record<string, ProjectDetails> = {
    'event-manager': {
      name: "Event Manager",
      description: "Comprehensive event management system for NIT Silchar",
      detailedDescription: "A comprehensive full-stack event management platform designed specifically for NIT Silchar, featuring a React 19 frontend with Firebase integration and a robust Node.js Express backend. The system handles everything from event creation and registration to real-time updates, participant management, Google Sheets automation, and QR code-based attendance tracking. Built to handle large-scale college events with thousands of participants through a scalable architecture with separate frontend and backend services.",
      linesOfCode: 75000,
      technologies: [
        // Frontend Technologies
        "React 19", "Vite", "Firebase Realtime Database", "Firebase Authentication", "Framer Motion", "GSAP", "Recharts", "QR Code Libraries (qrcode, jsQR)", "ExcelJS", "jsPDF", "SQLite3", "Prisma", "Cloudinary",
        // Backend Technologies
        "Node.js", "Express.js", "Google APIs (Sheets, Drive, Gmail)", "Nodemailer", "Gmail API", "Helmet.js", "Morgan", "CORS", "Express Rate Limit", "Joi Validation", "Google Service Account Authentication"
      ],
      features: [
        // Frontend Features
        "Event creation with custom fields and participation types (Solo/Team/Both)",
        "Real-time registration tracking and analytics",
        "Firebase Authentication with role-based access (Admin, Club, Participant)",
        "QR code generation with security verification and email delivery",
        "Mobile QR scanner using jsQR library",
        "Real-time attendance tracking and confirmation emails",
        "Client-side image compression before Cloudinary upload",
        "Interactive charts using Recharts library",
        "Data pipeline with 5-minute caching",
        "Export functionality to Excel, PDF, and Google Sheets",
        "Payment screenshot upload and verification system",
        // Backend Features
        "Node.js Express backend server with comprehensive API",
        "Google Sheets API integration with Service Account authentication",
        "Automated Google Sheets creation with professional formatting",
        "Real-time sheet updates and auto-sync functionality",
        "Gmail API integration for QR code email delivery",
        "Nodemailer service with SMTP and app password authentication",
        "QR code email templates with HTML formatting",
        "Attendance confirmation email automation",
        "Club approval email system with credentials",
        "Rate limiting (100 requests per 15 minutes)",
        "CORS protection and Helmet.js security headers",
        "Joi validation for all API endpoints",
        "Health check endpoints with system monitoring",
        "Error handling with detailed logging",
        "Vercel deployment with environment configuration"
      ],
      highlights: [
        "Handles 1000+ concurrent users across full-stack architecture",
        "Real-time data pipeline with live processing",
        "70% image compression and intelligent caching",
        "Comprehensive Node.js Express backend with Google APIs integration",
        "Automated Google Sheets creation and real-time synchronization",
        "QR code email automation with Gmail API and Nodemailer",
        "Built through strategic AI collaboration and prompt engineering",
        "Zero downtime during peak registration periods",
        "Background automation and smart scheduling",
        "Enterprise security with Firebase authentication and backend validation",
        "Professional API design with rate limiting and error handling"
      ],
      developmentApproach: "AI-Orchestrated Development using advanced prompt engineering and strategic AI collaboration",
      challenges: [
        "Handling high concurrent user load across frontend and backend",
        "Real-time data synchronization with Firebase",
        "Complex event workflow management",
        "Google APIs integration with Service Account authentication",
        "QR code system with secure email automation",
        "Backend API design with proper error handling",
        "Google Sheets formatting and professional styling",
        "Email service reliability with Gmail API and SMTP fallback",
        "Security implementation with rate limiting and validation",
        "Deployment coordination between frontend and backend services"
      ],
      solutions: [
        "Implemented Firebase Realtime Database with security rules",
        "Created intelligent caching with 5-minute duration",
        "Built comprehensive data pipeline with SQLite3 and Prisma",
        "Developed Node.js Express backend with Google Service Account authentication",
        "Integrated Google APIs (Sheets, Drive, Gmail) with proper OAuth2 flow",
        "Created robust QR code system with jsQR and automated email delivery",
        "Implemented Nodemailer with Gmail API and SMTP app password fallback",
        "Built comprehensive API with Joi validation and error handling",
        "Added security layers with Helmet.js, CORS, and rate limiting",
        "Deployed both frontend and backend on Vercel with environment configuration"
      ],
      impact: "Successfully manages all major events at NIT Silchar, serving thousands of students and faculty with 70% reduction in event registration time",
      githubUrl: "https://github.com/DhrubaAgarwalla/NITS-Event-Managment",
      demoUrl: "https://nits-event-managment.vercel.app/",
      status: "completed",
      developmentTime: "Built in 3-4 weeks through intensive AI collaboration"
    },
    'gitiq': {
      name: "GitIQ",
      description: "AI-powered GitHub repository commit analysis and categorization tool",
      detailedDescription: "A sophisticated Next.js web application that provides AI-powered insights into GitHub repositories through intelligent commit categorization. Uses multiple AI providers (Groq, Google Gemini) with parallel processing to analyze commit history, understand contributor patterns, and generate intelligent summaries of development activity.",
      linesOfCode: 40000,
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui components", "Groq AI", "Google Gemini", "Hugging Face", "Recharts", "GitHub REST API", "React hooks", "Zod", "Lucide React", "date-fns"],
      features: [
        "GitHub repository URL input and analysis",
        "Comprehensive commit history fetching with pagination support",
        "AI-powered commit categorization into 19 categories (bugfix, feature, refactor, documentation, test, chore, styling, performance, security, backend, frontend, database, API, UI, UX, build, ci/cd, dependencies, other)",
        "Multi-AI provider system with Groq and Google Gemini",
        "Parallel processing with 50/50 load balancing between AI providers",
        "Automatic failover when AI providers fail",
        "Bulk commit categorization for faster processing",
        "Interactive pie chart showing commit category distribution",
        "Commit activity timeline with smart aggregation (daily/weekly/monthly)",
        "Contributor analysis with commit counts and line changes",
        "Advanced filtering by categories, authors, date ranges, and message content",
        "AI-generated repository summaries and README analysis",
        "Real-time progress tracking with time estimation",
        "Responsive design with mobile optimization",
        "Dark/Light theme support",
        "Individual commit explanation and insights"
      ],
      highlights: [
        "Ultra-fast AI commit categorization (~0.12s per commit with Groq)",
        "Multi-AI provider system with Groq and Google Gemini",
        "Parallel processing with 50/50 load balancing and automatic failover",
        "19 comprehensive commit categories with smart mapping",
        "Interactive data visualizations with Recharts (pie charts, timeline, contributor stats)",
        "Built entirely through AI orchestration",
        "Real-time progress tracking and bulk processing capabilities",
        "Advanced filtering and search functionality"
      ],
      developmentApproach: "Pure AI-Orchestrated Development with focus on multi-AI integration and data visualization",
      challenges: [
        "GitHub API rate limiting and pagination handling",
        "Multi-AI provider integration with different response formats",
        "Parallel processing coordination and load balancing",
        "Real-time progress tracking for bulk operations",
        "Complex commit categorization with 19 different categories",
        "Responsive data visualization for mobile devices"
      ],
      solutions: [
        "Implemented intelligent GitHub API pagination with rate limit handling",
        "Created unified multi-provider AI interface with automatic failover",
        "Built parallel processing system with 50/50 Groq/Gemini load balancing",
        "Developed real-time progress tracking with time estimation",
        "Created comprehensive category mapping with emoji cleanup and variations",
        "Optimized Recharts visualizations for mobile responsiveness"
      ],
      impact: "Helps developers and teams gain AI-powered insights into their GitHub repositories with ultra-fast analysis and intelligent categorization",
      githubUrl: "https://github.com/DhrubaAgarwalla/GitIQ",
      demoUrl: "https://gitiq.vercel.app/",
      status: "completed",
      developmentTime: "Built in less than a week through AI-driven approach"
    },
    'portfolio': {
      name: "Portfolio Website",
      description: "Advanced portfolio website with AI chatbot integration",
      detailedDescription: "A modern, responsive portfolio website showcasing projects and skills, featuring an advanced AI chatbot powered by Groq AI for interactive user engagement. Built with cyberpunk aesthetic, 3D effects, and comprehensive project showcases.",
      linesOfCode: 15000,
      technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Groq AI (llama3-8b-8192)", "GitHub API", "shadcn/ui", "Radix UI", "React Router DOM", "Recharts", "Zod", "React Query", "Vercel"],
      features: [
        "Interactive AI chatbot with Groq AI integration",
        "Conversation persistence with localStorage (24-hour expiry)",
        "Cyberpunk aesthetic with glassmorphism effects",
        "3D project card effects with hover animations",
        "Mobile-optimized responsive design",
        "Real-time GitHub data integration",
        "Dynamic project information loading with caching",
        "Advanced knowledge base for accurate AI responses",
        "Professional loading screen with progress tracking",
        "Smooth animations with Framer Motion",
        "Context-aware AI responses with intent analysis",
        "Suggested questions and follow-up recommendations"
      ],
      highlights: [
        "Advanced AI chatbot with comprehensive knowledge base",
        "Conversation persistence across sessions",
        "Cyberpunk design with modern aesthetics",
        "Real-time GitHub API integration",
        "Built with $0 budget through AI orchestration",
        "Professional showcase for AI-driven development"
      ],
      developmentApproach: "AI-Orchestrated Development with focus on user experience, AI integration, and modern design patterns",
      challenges: [
        "AI chatbot integration with context management",
        "Conversation persistence and state management",
        "Mobile responsiveness with complex animations",
        "Performance optimization with rich interactions",
        "Knowledge base integration for accurate responses"
      ],
      solutions: [
        "Implemented efficient Groq AI service architecture",
        "Built comprehensive knowledge base system",
        "Created robust localStorage conversation persistence",
        "Optimized bundle size with code splitting",
        "Developed context-aware AI response system"
      ],
      impact: "Serves as a professional showcase demonstrating AI-orchestrated development capabilities and interactive user engagement",
      githubUrl: "https://github.com/DhrubaAgarwalla/stellar-code-lab",
      demoUrl: "https://portfolio-dhruba.vercel.app/",
      status: "completed",
      developmentTime: "Continuously improved through AI collaboration"
    }
  };

  // Technical Expertise Areas
  public readonly technicalExpertise: TechnicalExpertise[] = [
    {
      category: "AI-Orchestrated Development",
      skills: ["Augment Code IDE Plugin", "Claude Sonnet 4", "Prompt Engineering", "AI Collaboration", "Strategic AI Usage", "AI-Driven Architecture"],
      proficiencyLevel: "expert",
      description: "Specialized in creating large-scale applications through strategic AI collaboration using Augment Code IDE plugin with Claude Sonnet 4. Expert in advanced prompt engineering techniques to build production-ready systems without traditional coding knowledge."
    },
    {
      category: "Frontend Development",
      skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Responsive Design"],
      proficiencyLevel: "advanced",
      description: "Expert in modern frontend technologies with focus on React ecosystem, creating responsive and interactive user interfaces."
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "API Development", "Authentication", "Database Design"],
      proficiencyLevel: "advanced",
      description: "Proficient in backend development with Node.js ecosystem, creating scalable APIs and database architectures."
    },
    {
      category: "AI/ML Integration",
      skills: ["Groq AI", "OpenAI API", "AI Chatbots", "Natural Language Processing", "AI Service Architecture"],
      proficiencyLevel: "advanced",
      description: "Experienced in integrating AI services into web applications, particularly chatbots and intelligent user interfaces."
    },
    {
      category: "Automation Systems",
      skills: ["Social Media Automation", "LinkedIn Bots", "YouTube Automation", "Platform Integration"],
      proficiencyLevel: "advanced",
      description: "Specialized in creating automation systems for social media platforms, with expertise in bypassing restrictions and creating robust automation workflows."
    }
  ];

  // AI Orchestration Methodology
  public readonly aiOrchestration: AIOrchestrationDetails = {
    definition: "AI-Orchestrated Development is a methodology where complex software systems are built through strategic collaboration with AI, using advanced prompt engineering and AI guidance rather than traditional manual coding.",
    approach: "Strategic collaboration with AI systems to design, architect, and implement large-scale applications through intelligent prompting and iterative refinement, primarily using Augment Code IDE plugin with Claude Sonnet 4.",
    benefits: [
      "Rapid development of complex systems",
      "Consistent code quality and architecture",
      "Ability to work across multiple technology stacks",
      "Focus on problem-solving rather than syntax",
      "Scalable development approach",
      "Industry-leading context understanding with Augment's proprietary engine"
    ],
    process: [
      "Problem analysis and requirement gathering",
      "AI-assisted architecture design using Augment Code",
      "Strategic prompt engineering for implementation",
      "Iterative development with Claude Sonnet 4 feedback",
      "Testing and optimization through AI collaboration",
      "Deployment and maintenance planning"
    ],
    tools: [
      "Augment Code IDE Plugin (Primary tool)",
      "Claude Sonnet 4 (Primary AI model)",
      "Augment's proprietary context engine",
      "VS Code with Augment extension",
      "Advanced prompt engineering techniques",
      "AI-powered debugging and optimization"
    ],
    examples: [
      "Event Manager: 75,000+ lines built through AI orchestration",
      "GitIQ: 40,000+ lines developed using AI-driven approach",
      "Multiple automation systems created in days rather than months",
      "Portfolio website with advanced AI chatbot integration"
    ]
  };

  // Augment Code IDE Plugin Details
  public readonly augmentCode: AugmentCodeDetails = {
    name: "Augment Code IDE Plugin",
    description: "The most powerful AI software development platform with industry-leading context engine, featuring Claude Sonnet 4 integration for autonomous coding assistance.",
    primaryModel: "Claude Sonnet 4 by Anthropic",
    keyFeatures: [
      "Autonomous software agents in IDE and cloud",
      "Industry-leading proprietary context retrieval engine",
      "Real-time codebase indexing and understanding",
      "Intelligent code completion and suggestions",
      "Smart apply functionality for one-click code changes",
      "Terminal integration with command execution",
      "Multi-IDE support (VS Code, JetBrains, Vim, Neovim)",
      "Native integrations with essential development tools",
      "MCP (Model Context Protocol) support for 100+ external tools",
      "Image and screenshot context support",
      "Enhanced prompts with codebase-specific details",
      "Memories and rules for customized development practices"
    ],
    contextEngine: [
      "Proprietary context retrieval technology",
      "Real-time codebase indexing and analysis",
      "Large codebase understanding and navigation",
      "Intelligent file and function relationship mapping",
      "Context-aware code suggestions and completions",
      "Focus context for prioritizing specific files",
      "Third-party documentation integration"
    ],
    performance: [
      "SWE-bench agent score: 70.6% (new open-source SOTA)",
      "Augment regression suite pass: 63.1% (34.5% improvement)",
      "Valid Tool-Call Rate: 80.0% (220% improvement)",
      "Within-Limit Edit Rate: 64.3% (200.5% improvement)",
      "Superior performance across all coding metrics",
      "Faster and more accurate than previous AI coding assistants"
    ],
    usageExperience: [
      "Primary AI development tool for all major projects",
      "Used for Event Manager (75,000+ lines) development",
      "Essential for GitIQ (40,000+ lines) creation",
      "Key tool in portfolio website development",
      "Enables rapid prototyping and complex system architecture",
      "Facilitates learning new technologies and frameworks",
      "Provides intelligent debugging and optimization suggestions"
    ],
    advantages: [
      "Industry-leading context understanding",
      "Sharper, more precise code edits",
      "Handles larger tasks with better context retention",
      "Requires less hand-holding and follow-up questions",
      "Seamless integration with existing development workflow",
      "Secure and private by default",
      "Continuous model improvements and updates",
      "Professional-grade reliability for production code"
    ]
  };

  // Search functionality for knowledge base
  public searchKnowledge(query: string): string {
    const lowerQuery = query.toLowerCase();
    let context = '';

    // Personal information queries
    if (lowerQuery.includes('about') || lowerQuery.includes('profile') || lowerQuery.includes('background')) {
      context += this.getPersonalProfileContext();
    }

    // Project-specific queries
    if (lowerQuery.includes('event manager') || lowerQuery.includes('nit silchar')) {
      context += this.getProjectContext('event-manager');
    }
    if (lowerQuery.includes('gitiq') || lowerQuery.includes('git iq') || lowerQuery.includes('repository')) {
      context += this.getProjectContext('gitiq');
    }
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('website')) {
      context += this.getProjectContext('portfolio');
    }

    // Technical expertise queries
    if (lowerQuery.includes('skills') || lowerQuery.includes('technology') || lowerQuery.includes('expertise')) {
      context += this.getTechnicalExpertiseContext();
    }

    // AI orchestration queries
    if (lowerQuery.includes('ai orchestration') || lowerQuery.includes('ai-orchestrated') || lowerQuery.includes('how do you')) {
      context += this.getAIOrchestrationContext();
    }

    // AI tools and Augment Code queries
    if (lowerQuery.includes('which ai') || lowerQuery.includes('what ai') || lowerQuery.includes('ai tool') ||
        lowerQuery.includes('ai assistant') || lowerQuery.includes('development tool') || lowerQuery.includes('coding tool') ||
        lowerQuery.includes('augment') || lowerQuery.includes('claude') || lowerQuery.includes('ide plugin') ||
        lowerQuery.includes('ai use') || lowerQuery.includes('ai does') || lowerQuery.includes('tool use') ||
        lowerQuery.includes('primary tool') || lowerQuery.includes('main tool') || lowerQuery.includes('favorite tool')) {
      context += this.getAugmentCodeContext();
    }

    return context || this.getGeneralContext();
  }

  private getPersonalProfileContext(): string {
    const profile = this.personalProfile;
    return `
PERSONAL PROFILE:
Name: ${profile.name}
Title: ${profile.title}
Education: ${profile.education.degree} in ${profile.education.branch} at ${profile.education.institution} (${profile.education.year})
Contact: ${profile.contact.email}, WhatsApp: ${profile.contact.whatsapp}
Portfolio: ${profile.contact.portfolio}

SPECIALIZATION:
${profile.specialization.map(skill => `• ${skill}`).join('\n')}

PHILOSOPHY:
${profile.philosophy}

ACHIEVEMENTS:
${profile.achievements.map(achievement => `• ${achievement}`).join('\n')}
`;
  }

  private getProjectContext(projectKey: string): string {
    const project = this.projects[projectKey];
    if (!project) return '';

    return `
PROJECT: ${project.name}
Description: ${project.detailedDescription}
Lines of Code: ${project.linesOfCode.toLocaleString()}
Technologies: ${project.technologies.join(', ')}

KEY FEATURES:
${project.features.map(feature => `• ${feature}`).join('\n')}

HIGHLIGHTS:
${project.highlights.map(highlight => `• ${highlight}`).join('\n')}

DEVELOPMENT APPROACH: ${project.developmentApproach}

CHALLENGES & SOLUTIONS:
${project.challenges.map((challenge, index) => `Challenge: ${challenge}\nSolution: ${project.solutions[index] || 'Addressed through AI collaboration'}`).join('\n')}

IMPACT: ${project.impact}
Status: ${project.status}
GitHub: ${project.githubUrl}
${project.demoUrl ? `Demo: ${project.demoUrl}` : ''}
`;
  }

  private getTechnicalExpertiseContext(): string {
    return `
TECHNICAL EXPERTISE:
${this.technicalExpertise.map(expertise => `
${expertise.category} (${expertise.proficiencyLevel}):
Skills: ${expertise.skills.join(', ')}
Description: ${expertise.description}
`).join('\n')}
`;
  }

  private getAIOrchestrationContext(): string {
    const ai = this.aiOrchestration;
    return `
AI-ORCHESTRATED DEVELOPMENT:
Definition: ${ai.definition}

Approach: ${ai.approach}

Benefits:
${ai.benefits.map(benefit => `• ${benefit}`).join('\n')}

Process:
${ai.process.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Tools Used:
${ai.tools.map(tool => `• ${tool}`).join('\n')}

Examples:
${ai.examples.map(example => `• ${example}`).join('\n')}
`;
  }

  private getAugmentCodeContext(): string {
    const augment = this.augmentCode;
    return `
DHRUBA'S PRIMARY AI DEVELOPMENT TOOL:
${augment.name} with ${augment.primaryModel}

ANSWER: Dhruba primarily uses ${augment.name}, which features ${augment.primaryModel} as the AI model. This is his main AI assistant for all development work.

ABOUT AUGMENT CODE:
${augment.description}

WHY DHRUBA CHOSE AUGMENT CODE:
${augment.advantages.map(advantage => `• ${advantage}`).join('\n')}

KEY FEATURES DHRUBA USES:
${augment.keyFeatures.slice(0, 8).map(feature => `• ${feature}`).join('\n')}

DHRUBA'S EXPERIENCE WITH AUGMENT:
${augment.usageExperience.map(experience => `• ${experience}`).join('\n')}

PERFORMANCE THAT IMPRESSED DHRUBA:
${augment.performance.slice(0, 4).map(metric => `• ${metric}`).join('\n')}

CONTEXT ENGINE CAPABILITIES:
${augment.contextEngine.slice(0, 5).map(capability => `• ${capability}`).join('\n')}
`;
  }

  private getGeneralContext(): string {
    return `
GENERAL OVERVIEW:
${this.personalProfile.name} is an ${this.personalProfile.title} and ${this.personalProfile.education.branch} student at ${this.personalProfile.education.institution}.

Specializes in building large-scale applications through AI orchestration using Augment Code IDE plugin with Claude Sonnet 4, with major projects including:
• Event Manager (75,000+ lines) - Event management platform for NIT Silchar
• GitIQ (40,000+ lines) - AI-powered GitHub repository insights tool
• Portfolio Website (15,000+ lines) - This website with AI chatbot integration

Primary AI Development Tool: Augment Code IDE Plugin with Claude Sonnet 4 (industry-leading AI coding assistant)
Key expertise: ${this.personalProfile.specialization.slice(0, 3).join(', ')}

Contact: ${this.personalProfile.contact.email}
Portfolio: ${this.personalProfile.contact.portfolio}
`;
  }
}

export const knowledgeBase = new KnowledgeBase();
