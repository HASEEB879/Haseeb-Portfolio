import { useEffect, useState, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const phases = [
    'Initializing GIS Engine...',
    'Loading Spatial Data...',
    'Rendering Map Layers...',
    'Processing Satellite Imagery...',
    'Calibrating Coordinates...',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ['#06b6d4', '#3b82f6', '#22d3ee', '#60a5fa'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
      setProgress(Math.floor(current));
      setPhase(Math.floor((current / 100) * phases.length));
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020812] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
        {/* Logo */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 40px rgba(6,182,212,0.5)' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              <path d="M4.93 4.93l14.14 14.14" strokeDasharray="2 2" />
              <path d="M4.93 19.07L19.07 4.93" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold gradient-text tracking-widest uppercase">
            Muhammad Haseeb Zaman
          </h1>
          <p className="text-cyan-500/60 text-sm font-mono tracking-wider mt-1">
            GIS &amp; Remote Sensing Analyst
          </p>
        </div>

        {/* Phase text */}
        <p className="text-slate-400 text-sm font-mono text-center min-h-[20px]">
          {phases[Math.min(phase, phases.length - 1)]}
          <span className="cursor-blink ml-1">_</span>
        </p>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-500/60 text-xs font-mono">SYSTEM BOOT</span>
            <span className="text-cyan-400 text-xs font-mono font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                boxShadow: '0 0 10px rgba(6,182,212,0.8)',
              }}
            />
          </div>
          {/* Segmented indicators */}
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-0.5 rounded-full transition-all duration-200"
                style={{
                  background: i < Math.floor(progress / 5)
                    ? 'rgba(6,182,212,0.8)'
                    : 'rgba(255,255,255,0.05)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Coordinates */}
        <div className="flex gap-6 text-xs font-mono text-slate-600">
          <span>33.5651° N</span>
          <span>73.0169° E</span>
          <span>RAWALPINDI, PK</span>
        </div>
      </div>
    </div>
  );
}
