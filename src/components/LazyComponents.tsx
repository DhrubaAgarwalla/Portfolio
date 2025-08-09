import { lazy } from 'react';

// Lazy load heavy components to improve initial load time
export const LazyProjectsSection = lazy(() => 
  import('./ProjectsSection').then(module => ({ default: module.ProjectsSection }))
);

export const LazyAboutSection = lazy(() => 
  import('./AboutSection').then(module => ({ default: module.AboutSection }))
);

export const LazyTechStack = lazy(() => 
  import('./TechStack').then(module => ({ default: module.TechStack }))
);

export const LazyContactSection = lazy(() => 
  import('./ContactSection').then(module => ({ default: module.ContactSection }))
);

export const LazyProjectModal = lazy(() => 
  import('./ProjectModal').then(module => ({ default: module.ProjectModal }))
);

export const LazyChatbot = lazy(() => 
  import('./Chatbot').then(module => ({ default: module.default }))
);

// Preload components during loading screen
export const preloadComponents = () => {
  // Preload critical components
  import('./ProjectsSection');
  import('./AboutSection');
  import('./TechStack');
  import('./ContactSection');
  import('./ProjectModal');
  import('./Chatbot');
};
