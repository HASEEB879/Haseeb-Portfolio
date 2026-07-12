import { useEffect, useRef, useState } from 'react';
import {
  GraduationCap, MapPin, Calendar, Target, User, BookOpen, Trophy, Globe,
} from 'lucide-react';

const education = [
  {
    period: '2025 — 2029',
    degree: 'BS Remote Sensing & GIS',
    institution: 'PMAS Arid Agriculture University Rawalpindi',
    department: 'IGEO (Institute of Geo-Information & Earth Observation)',
    detail: 'Bachelor of Science in Remote Sensing & Geographic Information Systems',
    status: 'active',
  },
  {
    period: '2023 — 2025',
    degree: 'Intermediate (ICS)',
    institution: 'Government College Jhelum',
    department: 'Computer Science Faculty',
    detail: 'I.C.S — Physics, Mathematics & Computer Science',
    status: 'done',
  },
  {
    period: '2021 — 2023',
    degree: 'Matriculation (Computer Science)',
    institution: 'Government High School Jhelum',
    department: 'Computer Science Group',
    detail: 'Completed with distinction in Computer Science & Sciences',
    status: 'done',
  },
];

const careerGoals = [
  { title: 'GIS Analyst', icon: Globe, desc: 'Spatial data analysis & map production' },
  { title: 'Remote Sensing Analyst', icon: Target, desc: 'Satellite image processing & interpretation' },
  { title: 'Research Assistant', icon: BookOpen, desc: 'Academic research in geospatial sciences' },
];

const stats = [
  { value: 10, suffix: '+', label: 'Academic Projects', icon: Trophy },
  { value: 15, suffix: '+', label: 'Certifications', icon: GraduationCap },
  { value: 4, suffix: '', label: 'Years Program', icon: BookOpen },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Counter({ value, decimal = false, suffix = '' }: { value: number; decimal?: boolean; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCount(value * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="counter-number">
      {decimal ? count.toFixed(2) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function About() {
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>();
  const { ref: timelineRef, visible: timelineVisible } = useReveal<HTMLDivElement>();
  const { ref: goalsRef, visible: goalsVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">ABOUT ME</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transforming <span className="gradient-text">Spatial Data</span> into Insights
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I am an undergraduate student of Remote Sensing and GIS with practical experience in
            geospatial analysis, satellite image processing, cartography, and thematic mapping.
            My work focuses on transforming spatial data into meaningful insights using ArcGIS,
            QGIS, and remote sensing techniques. I am passionate about environmental monitoring,
            urban planning, disaster management, and GIS research.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass rounded-2xl p-6 text-center reveal-scale delay-${(i + 1) * 100} ${headerVisible ? 'visible' : ''}`}
            >
              <stat.icon className="w-6 h-6 text-cyan-400/60 mx-auto mb-3" />
              <div className="text-3xl lg:text-4xl font-display font-bold gradient-text-warm mb-1">
                <Counter value={stat.value} decimal={stat.decimal} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Education timeline + Career goals */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div ref={timelineRef} className={`lg:col-span-2 reveal-left ${timelineVisible ? 'visible' : ''}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Education Timeline</h3>
            </div>

            <div className="relative pl-8 border-l border-slate-800">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className={`relative mb-8 last:mb-0 reveal-left delay-${(i + 1) * 200} ${timelineVisible ? 'visible' : ''}`}
                >
                  <div className="timeline-dot" />
                  <div className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 text-cyan-400/80 text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </div>
                      {edu.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 font-mono">
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-slate-300 mt-1">{edu.institution}</p>
                    <p className="text-xs text-slate-500 mt-1">{edu.department}</p>
                    <p className="text-xs text-cyan-400/60 mt-2 font-mono">{edu.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career goals */}
          <div ref={goalsRef} className={`reveal-right ${goalsVisible ? 'visible' : ''}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Career Goals</h3>
            </div>

            <div className="flex flex-col gap-4">
              {careerGoals.map((goal, i) => (
                <div
                  key={goal.title}
                  className={`glass rounded-2xl p-5 hover:border-cyan-500/30 transition-all group hover:-translate-y-1 reveal-right delay-${(i + 1) * 200} ${goalsVisible ? 'visible' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <goal.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white">{goal.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{goal.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Location card */}
              <div className="glass rounded-2xl p-5 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-slate-400 tracking-wider">LOCATION</span>
                </div>
                <p className="text-sm text-white">Jhelum, Punjab, Pakistan</p>
                <p className="text-xs text-slate-500 mt-1">Currently residing in Rawalpindi for studies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
