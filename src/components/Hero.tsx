import { useEffect, useRef, useState } from 'react';
import { Download, Mail, MapPin, ArrowDown, Sparkles, Satellite, Layers, Activity } from 'lucide-react';
import GlobeCanvas from './GlobeCanvas';

const roles = [
  'GIS Analyst',
  'Remote Sensing Analyst',
  'Research Assistant',
  'Cartographer',
  'Spatial Data Scientist',
];

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.12), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.08), transparent 50%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px scanline" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light w-fit animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-xs text-slate-300 font-mono tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            {/* Name */}
            <div className="animate-slide-up">
              <p className="text-cyan-400/60 font-mono text-sm tracking-widest mb-2">HELLO, I&apos;M</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Muhammad</span>
                <br />
                <span className="gradient-text">Haseeb Zaman</span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 animate-slide-up delay-200">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-mono text-slate-200">
                {text}
                <span className="cursor-blink text-cyan-400">|</span>
              </span>
            </div>

            {/* Summary */}
            <p className="text-slate-400 text-base leading-relaxed max-w-xl animate-slide-up delay-300">
              Undergraduate student of Remote Sensing &amp; GIS transforming spatial data into
              meaningful insights through satellite imagery, cartography, and geospatial analysis.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-500 text-sm animate-slide-up delay-400">
              <MapPin className="w-4 h-4 text-cyan-400/60" />
              <span>Jhelum, Punjab, Pakistan</span>
              <span className="text-slate-700">•</span>
              <span>Currently in Rawalpindi</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up delay-500">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full btn-primary text-white text-sm font-semibold"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-full btn-secondary text-cyan-300 text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>View Projects</span>
              </a>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 animate-slide-up delay-700">
              {[
                { label: 'Projects', value: '7+' },
                { label: 'Certifications', value: '15+' },
                { label: 'Years Program', value: '4' },
              ].map((stat) => (
                <div key={stat.label} className="glass-light rounded-xl px-4 py-3 text-center">
                  <div className="text-2xl font-display font-bold gradient-text-warm">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Globe */}
          <div className="relative flex items-center justify-center animate-fade-in delay-300">
            <div className="relative">
              <GlobeCanvas size={typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : 420} />

              {/* Floating info chips */}
              <div className="absolute top-8 -left-4 glass rounded-xl px-3 py-2 float-label" style={{ animationDelay: '0s' }}>
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-xs text-white font-semibold">Satellite Active</div>
                    <div className="text-[10px] text-slate-500 font-mono">Landsat-9 • Sentinel-2</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 glass rounded-xl px-3 py-2 float-label" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-xs text-white font-semibold">5 Layers</div>
                    <div className="text-[10px] text-slate-500 font-mono">Vector + Raster</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 glass rounded-xl px-3 py-2 float-label" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-xs text-white font-semibold">Real-time</div>
                    <div className="text-[10px] text-slate-500 font-mono">Spatial Analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-xs text-slate-500 font-mono tracking-widest group-hover:text-cyan-400 transition-colors">SCROLL</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-1 group-hover:border-cyan-500/50 transition-colors">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
      </div>
    </section>
  );
}
