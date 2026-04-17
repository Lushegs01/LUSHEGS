import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate text reveal
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate progress bar
      tl.fromTo(
        progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 1.5, ease: 'power2.inOut' },
        '-=0.4'
      );

      // Counter animation
      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.value).toString();
            }
          },
        },
        '-=1.5'
      );

      // Exit animation
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="preloader flex-col"
    >
      <div className="relative">
        {/* Main Text */}
        <div
          ref={textRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider"
          style={{ perspective: '1000px' }}
        >
          LU$HEGS
        </div>

        {/* Progress Bar Container */}
        <div className="mt-8 w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-red-600 to-red-400"
            style={{ width: '0%' }}
          />
        </div>

        {/* Counter */}
        <div className="mt-4 flex justify-between items-center text-sm text-white/50 font-body">
          <span>Loading</span>
          <span className="font-mono">
            <span ref={counterRef}>0</span>%
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default Preloader;
