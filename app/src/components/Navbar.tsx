import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 2.5, ease: 'power3.out' }
      );

      // Stagger links
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 2.8,
            ease: 'power3.out',
          }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled 
            ? 'py-3 px-4 md:px-8' 
            : 'py-6 px-6 md:px-12'
          }
        `}
      >
        <div
          className={`
            mx-auto transition-all duration-500 ease-out
            ${isScrolled
              ? 'max-w-4xl glass-strong rounded-full px-6 py-3'
              : 'max-w-7xl'
            }
          `}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-2xl md:text-3xl text-white tracking-wider hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              .<span className="text-red-500">LUSHEGS</span>
            </a>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-sm font-medium text-white/70 hover:text-white transition-colors line-reveal py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-white/70 hover:text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-white/70 hover:text-white" />
                )}
              </button>

              {/* Download CV */}
              <a
                href="https://drive.google.com/file/d/10M2opSMT4G7tv_jkDqpJXjz25WnGh3Je/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
              >
                <Download className="w-4 h-4" />
                CV
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-500 ease-out
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-display text-4xl text-white hover:text-red-500 transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'slide-up 0.5s ease forwards' : 'none',
              }}
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Download CV */}
          <a
            href="https://drive.google.com/file/d/10M2opSMT4G7tv_jkDqpJXjz25WnGh3Je/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-full"
          >
            <Download className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
