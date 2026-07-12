import { useEffect, useRef, useState } from 'react';
import {
  Layers, Mountain, Thermometer, Waves, ScanLine, Map, Box,
  ExternalLink, X, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tools: string[];
  image?: string;
  icon: any;
  tags: string[];
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Land Use Land Cover Mapping',
    category: 'LULC',
    description: 'Supervised classification of land cover types using Sentinel-2 imagery for Jhelum district.',
    longDescription: 'Comprehensive LULC mapping project utilizing Landsat-8 and Sentinel-2 imagery to classify the Jhelum district into urban, agricultural, water, and barren land categories. Applied supervised classification with Maximum Likelihood algorithm achieving high overall accuracy. The analysis revealed significant urban expansion patterns and vegetation loss over the study period.',
    tools: ['ArcGIS', 'ERDAS Imagine', 'Landsat-8'],
    image: '/assets/images/projects/Jhelum_LULC.jpg',
    icon: Layers,
    tags: ['LULC', 'Classification', 'Remote Sensing'],
    metrics: [
      { label: 'Accuracy', value: '87%' },
      { label: 'Classes', value: '6' },
      { label: 'Area', value: '3,527 km²' },
    ],
  },
  {
    id: 2,
    title: 'NDVI Vegetation Analysis — Potohar Plateau',
    category: 'Remote Sensing',
    description: 'NDVI-based vegetation health mapping of Potohar Plateau using Sentinel-2 L2A imagery.',
    longDescription: 'Calculated the Normalized Difference Vegetation Index (NDVI) from Sentinel-2 L2A multispectral imagery (April 2026) to classify vegetation density across the Potohar Plateau. Five vegetation classes were derived — Dense Vegetation, Moderate Vegetation, Low Vegetation, Bare Land, and Water. The spatial distribution revealed that bare land dominates the central plateau while dense vegetation lines the river corridors. Analysis was conducted in QGIS using the raster calculator with NIR and Red band inputs.',
    tools: ['QGIS', 'Sentinel-2 L2A', 'Raster Calculator'],
    image: '/assets/images/projects/NDVI_Potohar.png',
    icon: Mountain,
    tags: ['NDVI', 'Vegetation', 'Potohar Plateau'],
    metrics: [
      { label: 'Data Source', value: 'Sentinel-2' },
      { label: 'Date', value: 'April 2026' },
      { label: 'Classes', value: '5' },
    ],
  },
  {
    id: 3,
    title: 'Land Surface Temperature Mapping',
    category: 'LST',
    description: 'Thermal infrared analysis to map land surface temperature distribution across Jhelum.',
    longDescription: 'Derived Land Surface Temperature from Landsat-8 TIRS thermal bands using the radiative transfer equation method. The project mapped temperature distribution across Jhelum district, identifying urban heat patterns and correlations with land cover types. Results showed urban areas averaging 4-6°C higher than surrounding rural areas, confirming the urban heat island effect.',
    tools: ['ArcGIS', 'Landsat-8 TIRS', 'ERDAS Imagine'],
    image: '/assets/images/projects/Jhelum_LST.png',
    icon: Thermometer,
    tags: ['LST', 'Thermal', 'Temperature'],
    metrics: [
      { label: 'Temp Range', value: '22–45°C' },
      { label: 'Urban-Rural Δ', value: '4–6°C' },
      { label: 'Thermal Band', value: 'Band 10' },
    ],
  },
  {
    id: 4,
    title: 'Urban Heat Island — Faisalabad Division',
    category: 'LST',
    description: 'UHI stack profile mapping of Faisalabad Division using Landsat-8 thermal remote sensing.',
    longDescription: 'Comprehensive Urban Heat Island (UHI) analysis of Faisalabad Division using Landsat 8 OLI/TIRS imagery. Land Surface Temperature (LST) and LULC data were combined to produce a UHI intensity map revealing temperature gradients from 10°C (vegetation/rural) to 32°C (dense urban cores). A UHI stack profile chart was generated for over 120,000 pixels, showing clear temperature spikes at built-up surfaces. Analysis conducted in ArcMap 10.8 with WGS 84 / UTM Zone 43N projection.',
    tools: ['ArcMap 10.8', 'Landsat-8 OLI/TIRS', 'Spatial Analysis'],
    image: '/assets/images/projects/UHI_Faisalabad.png',
    icon: Thermometer,
    tags: ['UHI', 'Faisalabad', 'Thermal Remote Sensing'],
    metrics: [
      { label: 'Temp Range', value: '10–32°C' },
      { label: 'Pixels Analyzed', value: '120,000+' },
      { label: 'Date', value: '20/05/2026' },
    ],
  },
  {
    id: 5,
    title: 'Flood Assessment',
    category: 'Disaster',
    description: 'Flood inundation mapping and damage assessment using multi-source satellite data.',
    longDescription: 'Post-flood analysis using Sentinel-1 SAR imagery and optical data to map inundation extent and assess damage in affected regions. Applied thresholding techniques on backscatter values to delineate flood boundaries. The analysis supported disaster response planning and identified vulnerable infrastructure and agricultural areas at risk.',
    tools: ['QGIS', 'Sentinel-1 SAR', 'Google Earth Engine'],
    image: '/assets/images/projects/Flood_Assessment.png',
    icon: Waves,
    tags: ['Flood', 'SAR', 'Disaster Management'],
    metrics: [
      { label: 'Inundated Area', value: '450 km²' },
      { label: 'Affected Zones', value: '18' },
      { label: 'Data Source', value: 'SAR + Optical' },
    ],
  },
  {
    id: 6,
    title: 'Image Classification — Chakwal LULC',
    category: 'Remote Sensing',
    description: 'Supervised and unsupervised classification of multispectral imagery for Chakwal district.',
    longDescription: 'Implemented both supervised (Maximum Likelihood, SVM) and unsupervised (K-Means, ISODATA) classification methods on multispectral satellite imagery for Chakwal district. Evaluated accuracy with confusion matrices and Kappa statistics. The project demonstrated the differences between classification approaches and validated results with ground reference data.',
    tools: ['ArcGIS', 'ERDAS Imagine', 'QGIS'],
    image: '/assets/images/projects/Chakwal_LULC.png',
    icon: ScanLine,
    tags: ['Classification', 'Chakwal', 'LULC'],
    metrics: [
      { label: 'Methods', value: '4' },
      { label: 'Kappa', value: '0.84' },
      { label: 'Overall Accuracy', value: '87%' },
    ],
  },
  {
    id: 7,
    title: 'Pakistan Political Map (3D)',
    category: 'Cartography',
    description: '3D visualization of Pakistan political and administrative boundaries with elevation data.',
    longDescription: 'Created a 3D political map of Pakistan combining administrative boundaries with DEM elevation data. The map features province boundaries, labeled major cities, and terrain relief shading. Designed with professional cartographic standards — including proper layout, scale bar, north arrow, and legend — for educational and presentation purposes.',
    tools: ['ArcGIS Pro', 'ArcScene', 'DEM'],
    image: '/assets/images/projects/PAKISTAN_MAP_BY_HASEEB.png',
    icon: Box,
    tags: ['3D', 'Pakistan', 'Cartography'],
    metrics: [
      { label: 'Provinces', value: '7' },
      { label: 'Cities', value: '50+' },
      { label: 'Dimension', value: '3D' },
    ],
  },
];

const categories = ['All', 'LULC', 'Remote Sensing', 'LST', 'Disaster', 'Cartography'];

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

function TiltCard({ project, onClick, index, visible }: {
  project: Project; onClick: () => void; index: number; visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className={`reveal-scale delay-${Math.min((index % 3) * 100 + 100, 600)} ${visible ? 'visible' : ''}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        className="project-card tilt-card glass rounded-2xl overflow-hidden cursor-pointer group h-full"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Image / Icon area */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="project-img w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center dot-pattern">
              <project.icon className="w-16 h-16 text-cyan-500/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-[10px] font-mono tracking-wider text-cyan-300">
            {project.category}
          </div>

          {/* Hover overlay */}
          <div className="project-overlay absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
            <div className="px-4 py-2 rounded-full glass text-xs text-white flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
              <project.icon className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
              {project.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onNav }: {
  project: Project; onClose: () => void; onNav: (dir: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl bg-gradient-to-br from-navy-800 to-navy-900">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <project.icon className="w-20 h-20 text-cyan-500/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={() => onNav(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-cyan-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNav(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-cyan-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Category */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs font-mono tracking-wider text-cyan-300">
            {project.category}
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <project.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">{project.title}</h2>
          </div>

          <p className="text-slate-300 leading-relaxed mb-6">{project.longDescription}</p>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map((m) => (
                <div key={m.label} className="glass-light rounded-xl p-3 text-center">
                  <div className="text-lg font-display font-bold gradient-text-warm">{m.value}</div>
                  <div className="text-[10px] text-slate-500 tracking-wide mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          <div className="mb-4">
            <h4 className="text-xs font-mono text-cyan-400/80 tracking-wider mb-2">TOOLS &amp; TECHNOLOGIES</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="tag-chip rounded-full px-3 py-1 text-xs text-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>();
  const { ref: gridRef, visible: gridVisible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const navigate = (dir: number) => {
    if (selected === null) return;
    const idx = filtered.findIndex((p) => p.id === selected);
    const next = (idx + dir + filtered.length) % filtered.length;
    setSelected(filtered[next].id);
  };

  const selectedProject = filtered.find((p) => p.id === selected) || projects.find((p) => p.id === selected);

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400">ACADEMIC PROJECTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Geospatial <span className="gradient-text">Project Gallery</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A showcase of academic projects spanning remote sensing, cartography, spatial analysis, and disaster management.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'btn-primary text-white'
                  : 'glass-light text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <TiltCard
              key={project.id}
              project={project}
              index={i}
              visible={gridVisible}
              onClick={() => setSelected(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelected(null)}
          onNav={navigate}
        />
      )}
    </section>
  );
}
