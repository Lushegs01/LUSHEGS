import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Building scalable, high-performance web applications with modern technologies.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually stunning user interfaces and experiences.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and SEO.',
    },
    {
      icon: Globe,
      title: 'Full Stack',
      description: 'End-to-end development from database to frontend deployment.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, clipPath: 'circle(0% at 50% 50%)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value');
      statElements?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-value') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-red-500 text-sm font-medium uppercase tracking-widest mb-4 block">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
            CRAFTING DIGITAL
            <br />
            <span className="text-gradient-red">EXPERIENCES</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/about-image.jpg"
                alt="About Alex Chen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-red-500/20 rounded-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-white/70 leading-relaxed">
              I&apos;m Alex Chen, a passionate software developer with over 5 years of experience
              building digital products that make a difference. I specialize in creating
              modern, performant web applications that combine beautiful design with
              robust functionality.
            </p>

            <p className="text-lg text-white/70 leading-relaxed">
              My journey in tech started with a curiosity about how things work on the web,
              which evolved into a career focused on crafting exceptional user experiences.
              I believe in writing clean, maintainable code and staying at the forefront
              of modern development practices.
            </p>

            <p className="text-lg text-white/70 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community.
            </p>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-4 glass rounded-xl hover:bg-white/5 transition-all duration-300 hover-lift"
                >
                  <service.icon className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium mb-1">{service.title}</h3>
                  <p className="text-sm text-white/50">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-white mb-2">
                <span className="stat-value" data-value={parseInt(stat.value)}>
                  {stat.value}
                </span>
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
