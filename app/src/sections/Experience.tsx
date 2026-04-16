import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  type: 'work' | 'education' | 'award';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      organization: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of enterprise-scale web applications and mentoring junior developers.',
      highlights: [
        'Architected microservices infrastructure serving 1M+ users',
        'Reduced application load time by 60% through optimization',
        'Led a team of 5 developers across multiple projects',
      ],
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      organization: 'Digital Agency XYZ',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: 'Developed custom web solutions for Fortune 500 clients with focus on performance and UX.',
      highlights: [
        'Delivered 20+ successful projects for clients',
        'Implemented CI/CD pipelines reducing deployment time by 80%',
        'Introduced modern frontend frameworks to the team',
      ],
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      organization: 'StartupHub',
      location: 'Austin, TX',
      period: '2019 - 2020',
      description: 'Built responsive web interfaces and collaborated with design teams on product development.',
      highlights: [
        'Developed MVP that secured $2M in seed funding',
        'Created component library used across 5 products',
        'Implemented accessibility standards (WCAG 2.1)',
      ],
    },
    {
      type: 'education',
      title: 'B.S. Computer Science',
      organization: 'University of Technology',
      location: 'Boston, MA',
      period: '2015 - 2019',
      description: 'Focused on software engineering, algorithms, and web technologies.',
      highlights: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'President of Coding Club',
      ],
    },
    {
      type: 'award',
      title: 'Best Developer Award',
      organization: 'Tech Summit 2023',
      location: 'Virtual',
      period: '2023',
      description: 'Recognized for outstanding contribution to open-source projects.',
      highlights: [
        'Top contributor to React ecosystem',
        'Created popular developer tools',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      // Animate timeline items
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      items?.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            x: isLeft ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate dots
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
      dots?.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'award':
        return Award;
      default:
        return Briefcase;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-red-500 text-sm font-medium uppercase tracking-widest mb-4 block">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
            EXPERIENCE &
            <span className="text-gradient-red"> EDUCATION</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-600 via-red-500 to-transparent origin-top"
            style={{ transform: 'translateX(-50%) scaleY(0)' }}
          />

          {/* Mobile Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-red-600 via-red-500 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => {
              const Icon = getIcon(exp.type);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`
                    timeline-item relative md:grid md:grid-cols-2 md:gap-8
                    ${isLeft ? '' : 'md:direction-rtl'}
                  `}
                >
                  {/* Content */}
                  <div
                    className={`
                      ml-12 md:ml-0
                      ${isLeft ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}
                    `}
                  >
                    <div className="glass rounded-xl p-6 hover-lift inline-block w-full">
                      {/* Header */}
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-red-500 text-sm font-medium">{exp.period}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-medium text-white mb-1">{exp.title}</h3>
                      <p className="text-white/60 text-sm mb-3">
                        {exp.organization} • {exp.location}
                      </p>

                      {/* Description */}
                      <p className="text-white/50 text-sm mb-4">{exp.description}</p>

                      {/* Highlights */}
                      <ul className={`space-y-1 ${isLeft ? 'md:text-right' : ''}`}>
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className={`text-sm text-white/40 flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}
                          >
                            {!isLeft && <span className="w-1 h-1 bg-red-500 rounded-full" />}
                            {highlight}
                            {isLeft && <span className="w-1 h-1 bg-red-500 rounded-full" />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className={`
                      timeline-dot absolute left-4 md:left-1/2 top-6
                      w-4 h-4 bg-red-600 rounded-full border-4 border-black
                      md:-translate-x-1/2
                      shadow-lg shadow-red-600/50
                    `}
                  />

                  {/* Empty space for alternating layout */}
                  {!isLeft && <div className="hidden md:block md:col-start-1" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
