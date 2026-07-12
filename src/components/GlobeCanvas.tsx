import { useEffect, useRef } from 'react';

/**
 * Animated 3D-style globe rendered on canvas with latitude/longitude grid,
 * rotating wireframe dots, orbiting satellite, and connection arcs.
 */
export default function GlobeCanvas({ size = 420 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.32;

    let angle = 0;

    // Generate dot points on sphere surface
    const points: { lat: number; lon: number }[] = [];
    const numLat = 14;
    const numLon = 24;
    for (let i = 0; i < numLat; i++) {
      const lat = (i / (numLat - 1)) * Math.PI - Math.PI / 2;
      for (let j = 0; j < numLon; j++) {
        const lon = (j / numLon) * Math.PI * 2;
        points.push({ lat, lon });
      }
    }

    // Connection arcs between random points
    const arcs: { p1: number; p2: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < 5; i++) {
      arcs.push({
        p1: Math.floor(Math.random() * points.length),
        p2: Math.floor(Math.random() * points.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    const project = (lat: number, lon: number, a: number) => {
      const x = Math.cos(lat) * Math.sin(lon + a);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon + a);
      return {
        x: cx + x * radius,
        y: cy - y * radius,
        z,
        visible: z > -0.2,
        depth: (z + 1) / 2,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.6);
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      glowGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
      glowGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Sphere fill
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.3, 0,
        cx, cy, radius
      );
      sphereGrad.addColorStop(0, 'rgba(13, 30, 53, 0.8)');
      sphereGrad.addColorStop(0.7, 'rgba(6, 13, 31, 0.9)');
      sphereGrad.addColorStop(1, 'rgba(2, 8, 18, 0.95)');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      for (let i = 1; i < numLat - 1; i++) {
        const lat = (i / (numLat - 1)) * Math.PI - Math.PI / 2;
        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= 60; j++) {
          const lon = (j / 60) * Math.PI * 2;
          const p = project(lat, lon, angle);
          if (p.visible) {
            const alpha = p.depth * 0.15;
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let j = 0; j < numLon; j += 2) {
        const lon = (j / numLon) * Math.PI * 2;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= 40; i++) {
          const lat = (i / 40) * Math.PI - Math.PI / 2;
          const p = project(lat, lon, angle);
          if (p.visible) {
            const alpha = p.depth * 0.12;
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Surface dots
      points.forEach((pt) => {
        const p = project(pt.lat, pt.lon, angle);
        if (p.visible) {
          const alpha = p.depth * 0.7;
          const dotSize = p.depth * 1.5 + 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.fill();
        }
      });

      // Connection arcs
      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.p1 = Math.floor(Math.random() * points.length);
          arc.p2 = Math.floor(Math.random() * points.length);
        }
        const p1 = project(points[arc.p1].lat, points[arc.p1].lon, angle);
        const p2 = project(points[arc.p2].lat, points[arc.p2].lon, angle);
        if (p1.visible && p2.visible) {
          // Arc control point (lifted above surface)
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const lift = dist * 0.3;
          const ctrlX = midX;
          const ctrlY = midY - lift;

          const t = arc.progress;
          // Quadratic bezier
          const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * ctrlX + t * t * p2.x;
          const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * ctrlY + t * t * p2.y;

          // Draw arc trail
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          for (let s = 0; s <= t; s += 0.02) {
            const sx = (1 - s) * (1 - s) * p1.x + 2 * (1 - s) * s * ctrlX + s * s * p2.x;
            const sy = (1 - s) * (1 - s) * p1.y + 2 * (1 - s) * s * ctrlY + s * s * p2.y;
            ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.4 * (1 - t)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Moving dot
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#22d3ee';
          ctx.shadowColor = '#22d3ee';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Endpoint dots
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
          ctx.fill();
        }
      });

      // Orbiting satellite
      const satAngle = angle * 2.5;
      const satX = cx + Math.cos(satAngle) * (radius * 1.35);
      const satY = cy + Math.sin(satAngle) * (radius * 1.35) * 0.4;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#60a5fa';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbit ring (elliptical)
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.35, radius * 1.35 * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tick marks on outer ring
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2 + angle * 0.3;
        const r1 = radius * 1.08;
        const r2 = radius * 1.12;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        ctx.strokeStyle = i % 9 === 0 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = i % 9 === 0 ? 1.5 : 0.5;
        ctx.stroke();
      }

      angle += 0.003;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return <canvas ref={canvasRef} className="block" />;
}
