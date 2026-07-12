import { useEffect, useRef, useState } from 'react';
import {
  Award, GraduationCap, BadgeCheck, ExternalLink, Mail, Phone, Linkedin, MapPin,
  Send, Download, ArrowUp, Globe2, Github, Heart,
} from 'lucide-react';

const certifications = [
  {
    title: 'Coursera Certificates',
    count: '10+',
    desc: 'Specializations in GIS, Remote Sensing, and spatial analysis from leading universities.',
    icon: GraduationCap,
    color: '#06b6d4',
  },
  {
    title: 'Esri Academy Certificates',
    count: '5+',
    desc: 'Professional training in ArcGIS Pro, spatial analysis, and cartography from Esri.',
    icon: BadgeCheck,
    color: '#3b82f6',
  },
  {
    title: 'Remote Sensing Fundamentals',
    count: '3',
    desc: 'Core concepts of satellite image processing and spectral analysis.',
    icon: Award,
    color: '#22d3ee',
  },
  {
    title: 'Cartography & Map Design',
    count: '2',
    desc: 'Principles of map design, symbology, and visual communication.',
    icon: Award,
    color: '#60a5fa',
  },
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
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function Certifications() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="certifications" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-cyan-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">CERTIFICATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Professional <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications and online courses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className={`glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-2 group reveal-scale delay-${Math.min((i + 1) * 100, 800)} ${visible ? 'visible' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                >
                  <cert.icon className="w-6 h-6" style={{ color: cert.color }} />
                </div>
                <span
                  className="text-3xl font-display font-bold"
                  style={{ color: cert.color }}
                >
                  {cert.count}
                </span>
              </div>
              <h3 className="text-sm font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>

        {/* Resume download banner */}
        <div className="mt-12 glass rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h3 className="font-display text-xl font-bold text-white mb-2">Want a closer look?</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Download my complete resume with detailed academic background, skills, and project experience.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary text-white text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const contactInfo = [
    {
      label: 'LinkedIn',
      value: 'haseeb-zaman',
      href: 'https://www.linkedin.com/in/haseeb-zaman-b24257371',
      icon: Linkedin,
      color: '#0a66c2',
    },
    {
      label: 'Email',
      value: 'haseeb273352@gmail.com',
      href: 'mailto:haseeb273352@gmail.com',
      icon: Mail,
      color: '#06b6d4',
    },
    {
      label: 'Phone',
      value: '0313 5683248',
      href: 'tel:+923135683248',
      icon: Phone,
      color: '#3b82f6',
    },
    {
      label: 'Location',
      value: 'Jhelum / Rawalpindi, Pakistan',
      href: '#',
      icon: MapPin,
      color: '#22d3ee',
    },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-15" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">GET IN TOUCH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Open to GIS analyst roles, research assistantships, internships, and collaboration opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((info, i) => (
              <a
                key={info.label}
                href={info.href}
                target={info.label === 'LinkedIn' ? '_blank' : undefined}
                rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                className={`glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group reveal-left delay-${Math.min((i + 1) * 100, 800)} ${visible ? 'visible' : ''}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                >
                  <info.icon className="w-5 h-5" style={{ color: info.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 font-mono tracking-wider mb-0.5">{info.label.toUpperCase()}</div>
                  <div className="text-sm text-white font-medium truncate">{info.value}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className={`glass rounded-2xl p-6 lg:p-8 reveal-right ${visible ? 'visible' : ''}`}>
            <h3 className="font-display text-lg font-bold text-white mb-6">Send a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const subject = encodeURIComponent(`Portfolio Contact from ${data.get('name')}`);
                const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);
                window.location.href = `mailto:haseeb273352@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="text-xs text-slate-400 font-mono tracking-wider mb-1.5 block">NAME</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono tracking-wider mb-1.5 block">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono tracking-wider mb-1.5 block">MESSAGE</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-primary text-white text-sm font-semibold mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative py-12 border-t border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white">Muhammad Haseeb Zaman</span>
                <span className="block text-[10px] text-cyan-400/60 font-mono tracking-widest -mt-0.5">GIS ANALYST</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              BS Remote Sensing &amp; GIS student passionate about spatial analysis, satellite imagery,
              and cartography. Open to opportunities in GIS and remote sensing.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-cyan-400/80 tracking-wider mb-3">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Certifications', href: '#certifications' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono text-cyan-400/80 tracking-wider mb-3">CONNECT</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/haseeb-zaman-b24257371"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a
                href="mailto:haseeb273352@gmail.com"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> haseeb273352@gmail.com
              </a>
              <a
                href="tel:+923135683248"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> 0313 5683248
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            © {new Date().getFullYear()} Muhammad Haseeb Zaman. Made with
            <Heart className="w-3 h-3 text-cyan-400/60" fill="currentColor" />
            and GIS passion.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-mono">33.5651° N, 73.0169° E</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full btn-primary text-white flex items-center justify-center z-40 animate-fade-in glow-cyan"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
