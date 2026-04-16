import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const ctx = gsap.context(() => {
      // Mouse move handler
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.02,
          ease: 'none',
        });
      };

      // Mouse down/up handlers
      const onMouseDown = () => setIsClicking(true);
      const onMouseUp = () => setIsClicking(false);

      // Hover handlers for interactive elements
      const onMouseEnterInteractive = (e: Event) => {
        const target = e.target as HTMLElement;
        setIsHovering(true);
        
        // Check for custom cursor text
        const cursorLabel = target.getAttribute('data-cursor-text');
        if (cursorLabel) {
          setCursorText(cursorLabel);
        }
      };

      const onMouseLeaveInteractive = () => {
        setIsHovering(false);
        setCursorText('');
      };

      // Add listeners
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);

      // Add hover listeners to interactive elements
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, .hover-lift, .project-card'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', onMouseEnterInteractive);
          el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          className={`
            relative flex items-center justify-center
            rounded-full border border-white/80
            transition-all duration-200 ease-out
            ${isHovering ? 'w-20 h-20' : 'w-8 h-8'}
            ${isClicking ? 'scale-75' : 'scale-100'}
          `}
        >
          {cursorText && (
            <span className="text-[10px] font-medium text-white uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          className={`
            w-1 h-1 bg-white rounded-full
            transition-all duration-100 ease-out
            ${isHovering ? 'opacity-0' : 'opacity-100'}
            ${isClicking ? 'scale-150' : 'scale-100'}
          `}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
