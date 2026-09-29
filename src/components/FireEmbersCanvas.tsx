import { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  decay: number;
  hue: number;
  wobble: number;
  wobbleSpeed: number;
}

export const FireEmbersCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize by turning off alpha context since we draw background
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    let embers: Ember[] = [];
    // Lower count (40) for flawless silky-smooth 60fps/120fps performance
    const maxEmbers = 40;

    const createEmber = (yOrigin = height): Ember => {
      const size = Math.random() * 2.2 + 0.5;
      return {
        x: Math.random() * width,
        y: yOrigin + Math.random() * 20,
        size,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -(Math.random() * 1.2 + 0.5),
        alpha: Math.random() * 0.45 + 0.25,
        decay: Math.random() * 0.0025 + 0.0012,
        hue: Math.random() > 0.45 ? 20 : 12, // Golden-orange (20) to crimson (12)
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
      };
    };

    // Populate initially
    for (let i = 0; i < maxEmbers; i++) {
      embers.push(createEmber(Math.random() * height));
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
        // Re-populate on resize to avoid out of bounds
        embers = [];
        for (let i = 0; i < maxEmbers; i++) {
          embers.push(createEmber(Math.random() * height));
        }
      }
    });

    resizeObserver.observe(canvas.parentElement || document.body);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // 1. Draw solid black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse coordinates
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // 2. Draw cinematic ambient backlights (one draw call using radial gradients)
      // Bottom-center crimson light
      const redGrad = ctx.createRadialGradient(
        width * 0.5, height, 0,
        width * 0.5, height, Math.max(width, height) * 0.65
      );
      redGrad.addColorStop(0, 'rgba(214, 40, 40, 0.14)');
      redGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = redGrad;
      ctx.fillRect(0, 0, width, height);

      // Center-right gold light
      const goldGrad = ctx.createRadialGradient(
        width * 0.65, height * 0.45, 0,
        width * 0.65, height * 0.45, Math.max(width, height) * 0.5
      );
      goldGrad.addColorStop(0, 'rgba(245, 158, 11, 0.09)');
      goldGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Render and update embers
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];

        // Apply physics
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.18;
        p.y += p.speedY;
        p.alpha -= p.decay;

        // Subtle wind/repulsion force near mouse
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (160 - dist) / 160;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.0;
          }
        }

        // Fast glow rendering (NEVER use shadowBlur - draw two nested overlapping transparent circles instead)
        const glowRadius = p.size * 2.8;
        const colorString = `hsla(${p.hue}, 95%, 55%, ${p.alpha})`;
        const outerGlowString = `hsla(${p.hue}, 95%, 45%, ${p.alpha * 0.35})`;

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGlowString;
        ctx.fill();

        // Core bright ember
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colorString;
        ctx.fill();

        // Recycle dead embers
        if (p.alpha <= 0 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          embers[i] = createEmber();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="fire-embers-background"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
