import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
    >
      {/* Expanded Content */}
      <div
        className={`
          absolute bottom-full right-0 mb-4
          transition-all duration-300 ease-out
          ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <div className="glass-strong rounded-2xl p-4 w-64">
          <p className="text-sm text-white/70 mb-3">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
          <button
            onClick={scrollToContact}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative w-14 h-14 rounded-full
          bg-red-600 hover:bg-red-700
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          ${isExpanded ? 'rotate-90' : 'rotate-0'}
        `}
        aria-label="Toggle contact options"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}

        {/* Pulse Animation */}
        {!isExpanded && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingCTA;
