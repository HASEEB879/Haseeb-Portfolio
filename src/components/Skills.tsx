import { useEffect, useRef, useState } from 'react';
import {
  Layers, Code2, Monitor, Satellite, Map, Grid3x3, Box, Image, Mountain,
  MousePointerClick, Crosshair, FileImage, Compass, ScanLine, Database,
  Globe2, Cpu, Palette, FileCode, Languages,
} from 'lucide-react';

const gisSkills = [
  { name: 'Spatial Analysis', level: 85, icon: Grid3x3 },
  { name: 'Raster Analysis', level: 80, icon: Layers },
  { name: 'Vector Analysis', level: 82, icon: Box },
  { name: 'Digitization', level: 78, icon: MousePointerClick },
  { name: 'Georeferencing', level: 84, icon: Crosshair },
  { name: 'Image Classification', level: 75, icon: ScanLine },
  { name: 'DEM Analysis', level: 72, icon: Mountain },
  { name: 'Satellite Image Processing', level: 78, icon: Satellite },
  { name: 'Map Layout Design', level: 88, icon: FileImage },
  { name: 'Cartography', level: 86, icon: Map },
  { name: 'GIS Mapping', level: 85, icon: Globe2 },
  { name: 'Remote Sensing', level: 82, icon: Satellite },
  { name: 'GPS Data Handling', level: 80, icon: Compass },
];

const softwareSkills = [
  { name: 'ArcGIS Desktop', level: 88, icon: Map, color: '#06b6d4' },
  { name: 'ArcMap', level: 85, icon: Map, color: '#0891b2' },
  { name: 'QGIS', level: 82, icon: Globe2, color: '#22d3ee' },
  { name: 'ERDAS Imagine', level: 70, icon: Satellite, color: '#3b82f6' },
  { name: 'Google Earth Pro', level: 90, icon: Globe2, color: '#60a5fa' },
  { name: 'Microsoft Office', level: 92, icon: FileImage, color: '#818cf8' },
  { name: 'Canva', level: 85, icon: Palette, color: '#a78bfa' },
];

const programmingSkills = [
  { name: 'Python', level: 45, icon: Code2 },
  { name: 'HTML', level: 55, icon: FileCode },
  { name: 'CSS', level: 50, icon: FileCode },
  { name: 'C++', level: 40, icon: Cpu },
];

const researchInterests = [
  { name: 'Remote Sensing', icon: Satellite },
  { name: 'Cartography', icon: Map },
  { name: 'Spatial Analysis', icon: Grid3x3 },
  { name: 'Satellite Image Processing', icon: ScanLine },
  { name: 'Flood Assessment', icon: Layers },
  { name: 'Urban Expansion', icon: Box },
  { name: 'LULC', icon: Grid3x3 },
  { name: 'NDVI', icon: Mountain },
  { name: 'NDBI', icon: Box },
  { name: 'LST', icon: Cpu },
  { name: 'Urban Heat Island', icon: Image },
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

function SkillBar({ name, level, icon: Icon, delay, visible }: {
  name: string; level: number; icon: any; delay: number; visible: boolean;
}) {
  return (
    <div
      className={`reveal delay-${delay} ${visible ? 'visible' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-cyan-400/70" />
          <span className="text-sm text-slate-200">{name}</span>
        </div>
        <span className="text-xs font-mono text-cyan-400/80">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`skill-bar-fill ${visible ? 'animate' : ''} h-full rounded-full`}
          style={{
            '--target-width': `${level}%`,
            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
            boxShadow: '0 0 8px rgba(6,182,212,0.4)',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>();
  const { ref: gisRef, visible: gisVisible } = useReveal<HTMLDivElement>();
  const { ref: softRef, visible: softVisible } = useReveal<HTMLDivElement>();
  const { ref: progRef, visible: progVisible } = useReveal<HTMLDivElement>();
  const { ref: resRef, visible: resVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">SKILLS &amp; EXPERTISE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit spanning geospatial analysis, remote sensing, cartography, and programming.
          </p>
        </div>

        {/* GIS Technical Skills */}
        <div ref={gisRef} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
              <Globe2 className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">GIS &amp; Technical Skills</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {gisSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
                delay={Math.min((i % 2) * 100 + 100, 800)}
                visible={gisVisible}
              />
            ))}
          </div>
        </div>

        {/* Software + Programming */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Software */}
          <div ref={softRef}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
                <Monitor className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Software Proficiency</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {softwareSkills.map((sw, i) => (
                <div
                  key={sw.name}
                  className={`glass rounded-2xl p-4 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group reveal-scale delay-${Math.min((i + 1) * 100, 800)} ${softVisible ? 'visible' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${sw.color}15`, border: `1px solid ${sw.color}30` }}
                    >
                      <sw.icon className="w-5 h-5" style={{ color: sw.color }} />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{sw.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill ${softVisible ? 'animate' : ''} h-full rounded-full`}
                        style={{
                          '--target-width': `${sw.level}%`,
                          background: `linear-gradient(90deg, ${sw.color}, ${sw.color}aa)`,
                        } as React.CSSProperties}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{sw.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programming */}
          <div ref={progRef}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Programming Skills</h3>
            </div>
            <div className="flex flex-col gap-5">
              {programmingSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  delay={Math.min((i + 1) * 100, 800)}
                  visible={progVisible}
                />
              ))}
            </div>

            {/* Note */}
            <div className="glass-light rounded-xl p-4 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 tracking-wider">LEARNING PATH</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Actively expanding programming skills to integrate automation and machine learning
                with geospatial workflows. Focusing on Python libraries like GDAL, Rasterio, and GeoPandas.
              </p>
            </div>
          </div>
        </div>

        {/* Research interests */}
        <div ref={resRef}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/20">
              <Satellite className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Research Interests</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {researchInterests.map((item, i) => (
              <div
                key={item.name}
                className={`tag-chip rounded-full px-4 py-2 flex items-center gap-2 cursor-default reveal-scale delay-${Math.min((i % 6) * 100 + 100, 800)} ${resVisible ? 'visible' : ''}`}
              >
                <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-sm text-slate-200">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
