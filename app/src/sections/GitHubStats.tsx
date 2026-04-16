import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, GitCommit, GitBranch, Star, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GitHubStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [contributionCount, setContributionCount] = useState(0);

  // Simulated GitHub stats
  const githubStats = {
    contributions: 1247,
    repositories: 48,
    stars: 342,
    followers: 523,
    pullRequests: 156,
    issues: 89,
  };

  const languages = [
    { name: 'TypeScript', percentage: 45, color: '#3178c6' },
    { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
    { name: 'Python', percentage: 15, color: '#3776ab' },
    { name: 'CSS', percentage: 10, color: '#1572b6' },
    { name: 'Other', percentage: 5, color: '#999999' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stat cards
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate contribution counter
      gsap.to(
        { value: 0 },
        {
          value: githubStats.contributions,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function() {
            setContributionCount(Math.floor(this.targets()[0].value));
          },
        }
      );

      // Animate language bars
      const langBars = sectionRef.current?.querySelectorAll('.lang-bar');
      langBars?.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statCards = [
    { icon: GitCommit, label: 'Contributions', value: contributionCount.toLocaleString() },
    { icon: GitBranch, label: 'Repositories', value: githubStats.repositories },
    { icon: Star, label: 'Total Stars', value: githubStats.stars },
    { icon: Users, label: 'Followers', value: githubStats.followers },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-500 text-sm font-medium uppercase tracking-widest mb-4 block">
            Open Source
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            GITHUB
            <span className="text-gradient-red"> STATS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Active contributor to the open-source community. Check out my latest
            projects and contributions.
          </p>
        </div>

        {/* GitHub Profile Link */}
        <div className="flex justify-center mb-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 glass rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <Github className="w-6 h-6 text-white" />
            <span className="text-white font-medium">@alexchendev</span>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full">
              Active
            </span>
          </a>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-red-600/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="font-display text-3xl md:text-4xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution Graph (Simulated) */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-medium">Contribution Activity</h3>
            <span className="text-sm text-white/50">Last 12 months</span>
          </div>

          {/* Simulated GitHub-style contribution grid */}
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 84 }).map((_, i) => {
              const intensity = Math.random();
              let bgClass = 'bg-white/5';
              if (intensity > 0.8) bgClass = 'bg-red-600';
              else if (intensity > 0.6) bgClass = 'bg-red-600/70';
              else if (intensity > 0.4) bgClass = 'bg-red-600/50';
              else if (intensity > 0.2) bgClass = 'bg-red-600/30';

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${bgClass} hover:scale-125 transition-transform`}
                  title={`${Math.floor(Math.random() * 10)} contributions`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/40">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white/5 rounded-sm" />
              <div className="w-3 h-3 bg-red-600/30 rounded-sm" />
              <div className="w-3 h-3 bg-red-600/50 rounded-sm" />
              <div className="w-3 h-3 bg-red-600/70 rounded-sm" />
              <div className="w-3 h-3 bg-red-600 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Language Stats */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-white font-medium mb-6">Top Languages</h3>

          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-white/70 text-sm">{lang.name}</span>
                  </div>
                  <span className="text-white/50 text-sm">{lang.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="lang-bar h-full rounded-full transition-all duration-1000"
                    style={{
                      backgroundColor: lang.color,
                      width: '0%',
                    }}
                    data-width={lang.percentage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: Award, title: 'Arctic Code Vault', desc: 'Contributed code to the 2020 GitHub Archive Program' },
            { icon: Star, title: 'Top Contributor', desc: 'Recognized in React ecosystem' },
            { icon: Users, title: 'Prolific Contributor', desc: '100+ pull requests merged' },
          ].map((achievement) => (
            <div
              key={achievement.title}
              className="glass rounded-xl p-4 flex items-start gap-4 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center flex-shrink-0">
                <achievement.icon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                <p className="text-white/50 text-xs mt-1">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
