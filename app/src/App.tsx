import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import GitHubStats from './sections/GitHubStats';
import Contact from './sections/Contact';
import FloatingCTA from './components/FloatingCTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize scroll animations
      const ctx = gsap.context(() => {
        // Fade in sections on scroll
        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  return (
    <>
      {isLoading && <Preloader />}
      
      <CustomCursor />
      
      <div ref={mainRef} className={`relative min-h-screen overflow-x-hidden transition-colors duration-400 ${isDarkMode ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-900'}`}>
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Background Gradient */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[150px]" />
        </div>
        
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <GitHubStats />
          <Contact />
        </main>
        
        <FloatingCTA />
      </div>
    </>
  );
}

export default App;
