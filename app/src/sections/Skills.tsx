import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Palette,
  Wrench,
  Layers,
  Globe,
  Server,
  Smartphone,
  GitBranch,
  Cloud,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: Code2,
      skills: [
        { name: 'React / Next.js', level: 95, icon: Layers },
        { name: 'TypeScript', level: 90, icon: Code2 },
        { name: 'Tailwind CSS', level: 95, icon: Palette },
        { name: 'GSAP / Framer Motion', level: 85, icon: Code2 },
        { name: 'Three.js / WebGL', level: 75, icon: Globe },
      ],
    },
    {
      title: 'Backend',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 90, icon: Server },
        { name: 'Python / Django', level: 80, icon: Code2 },
        { name: 'PostgreSQL', level: 85, icon: Database },
        { name: 'MongoDB', level: 80, icon: Database },
        { name: 'GraphQL', level: 75, icon: Code2 },
      ],
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      skills: [
        { name: 'React Native', level: 85, icon: Smartphone },
        { name: 'Flutter', level: 70, icon: Smartphone },
        { name: 'iOS / Swift', level: 65, icon: Smartphone },
        { name: 'Android / Kotlin', level: 60, icon: Smartphone },
      ],
    },
    {
      title: 'Tools',
      icon: Wrench,
      skills: [
        { name: 'Git / GitHub', level: 95, icon: GitBranch },
        { name: 'Docker', level: 80, icon: Cloud },
        { name: 'AWS / Vercel', level: 85, icon: Cloud },
        { name: 'Figma', level: 90, icon: Palette },
        { name: 'CI/CD', level: 80, icon: GitBranch },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars
      const skillBars = sectionRef.current?.querySelectorAll('.skill-progress');
      skillBars?.forEach((bar) => {
        const level = parseInt(bar.getAttribute('data-level') || '0');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate category cards
      gsap.fromTo(
        categoriesRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-500 text-sm font-medium uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            SKILLS &
            <span className="text-gradient-red"> TECHNOLOGIES</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit built over years of crafting digital experiences.
            Always learning, always evolving.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                ${activeCategory === index
                  ? 'bg-red-600 text-white'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <category.icon className="w-5 h-5" />
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={categoriesRef} className="grid md:grid-cols-2 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass rounded-xl p-6 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                    <skill.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-red-500 font-mono">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="skill-progress h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  data-level={skill.level}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Cloud */}
        <div className="mt-20">
          <h3 className="text-center text-white/60 text-sm uppercase tracking-widest mb-8">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
              'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git',
              'Figma', 'Tailwind', 'GraphQL', 'Redis', 'Kubernetes',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 glass rounded-full text-white/70 text-sm hover:bg-red-600/20 hover:text-red-500 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
