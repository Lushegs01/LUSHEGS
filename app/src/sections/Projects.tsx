import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filters = ['All', 'Web', 'Mobile', 'SaaS', 'E-commerce'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Aero Sound Pro',
      description: 'A premium e-commerce platform for high-end audio equipment with immersive product experiences and seamless checkout flow.',
      image: '/project-ecommerce.jpg',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      category: 'E-commerce',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Analytics Dashboard',
      description: 'Real-time SaaS analytics platform with advanced data visualization, custom reports, and team collaboration features.',
      image: '/project-saas.jpg',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'D3.js'],
      category: 'SaaS',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'FitTrack Pro',
      description: 'Mobile-first fitness tracking application with workout plans, progress tracking, and social features.',
      image: '/project-mobile.jpg',
      tags: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
      category: 'Mobile',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Creative Portfolio',
      description: 'Award-winning portfolio website for a digital agency featuring bold animations and immersive storytelling.',
      image: '/project-portfolio.jpg',
      tags: ['GSAP', 'Three.js', 'WebGL', 'Vue.js'],
      category: 'Web',
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Animate grid on filter change
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-red-500 text-sm font-medium uppercase tracking-widest mb-4 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
              SELECTED
              <br />
              <span className="text-gradient-red">WORK</span>
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === filter
                    ? 'bg-red-600 text-white'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl glass hover-lift">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Hover Content */}
                  <div className={`
                    absolute inset-0 flex flex-col justify-end p-6
                    transition-all duration-500
                    ${hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Links */}
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-2 px-4 py-2 glass hover:bg-white/10 text-white text-sm font-medium rounded-full transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-medium text-white group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className={`
                      w-5 h-5 text-white/50 transition-all duration-300
                      ${hoveredProject === project.id ? 'text-red-500 translate-x-1 -translate-y-1' : ''}
                    `} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs text-white/60 bg-white/5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 hover-lift"
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
