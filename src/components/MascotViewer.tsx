/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import mascotFront from '../assets/images/mascot_final_front.png';
import mascotProfile from '../assets/images/mascot_final_side.png';
import mascotSalute from '../assets/images/mascot_final_salute.png';

// Standardized 600x800 transparent PNG cutouts without background
const MASCOT_IMAGES = {
  front: mascotFront,
  profile: mascotProfile,
  salute: mascotSalute,
};

export interface MascotViewerRef {
  container: HTMLDivElement | null;
  frontImg: HTMLImageElement | null;
  profileImg: HTMLImageElement | null;
  saluteImg: HTMLImageElement | null;
  backImg: HTMLImageElement | null; // Alias for animation timeline
  glowBg: HTMLDivElement | null;
}

export const MascotViewer = forwardRef<MascotViewerRef, {}>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);
  const profileRef = useRef<HTMLImageElement>(null);
  const saluteRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get container() {
      return containerRef.current;
    },
    get frontImg() {
      return frontRef.current;
    },
    get profileImg() {
      return profileRef.current;
    },
    get saluteImg() {
      return saluteRef.current;
    },
    get backImg() {
      return saluteRef.current; // Alias so existing timelines continue to work seamlessly
    },
    get glowBg() {
      return glowRef.current;
    },
  }));

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize coordinates to [-1, 1]
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      // Subtle target translation (max 18px horizontal, 12px vertical)
      targetX = nx * 18;
      targetY = ny * 12;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      // Clamp values for safety
      const clampedGamma = Math.max(-30, Math.min(30, gamma));
      const clampedBeta = Math.max(15, Math.min(75, beta)) - 45; // Center around 45 deg tilt

      // Normalize and scale to target values
      targetX = (clampedGamma / 30) * 20;
      targetY = (clampedBeta / 30) * 15;
    };

    const updateParallax = () => {
      // Lerp (Linear Interpolation) for fluid smooth ease-out movement
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (innerContainerRef.current) {
        // Subtle 3D tilting + translation for premium feel
        const rotateY = currentX * 0.4;
        const rotateX = -currentY * 0.4;
        innerContainerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }

      if (glowRef.current) {
        // Glow moves in opposite direction to create real depth
        glowRef.current.style.transform = `translate3d(${-currentX * 1.8}px, ${-currentY * 1.8}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Start animation loop
    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-10 sm:top-16 md:top-20 bottom-8 sm:bottom-0 left-0 right-0 flex items-center justify-center will-change-transform z-10 pointer-events-none select-none"
      style={{ perspective: 1200 }}
    >
      {/* Cinematic Red & Gold Volumetric Glow behind the mascot (pure optical ambient lighting) */}
      <div
        ref={glowRef}
        className="absolute w-[95vw] h-[90vh] sm:w-[85vw] sm:h-[85vh] max-w-[1100px] max-h-[1100px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.32)_0%,rgba(245,158,11,0.18)_40%,rgba(0,0,0,0)_70%)] blur-[80px] sm:blur-[100px] pointer-events-none -z-10 mix-blend-screen transition-all duration-1000"
      />

      {/* Transparent Mascot Stack - High-impact, heroic size on mobile and desktop */}
      <div
        ref={innerContainerRef}
        className="relative w-full max-w-[440px] sm:max-w-[500px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-[680px] h-[72vh] sm:h-[74vh] md:h-[78vh] lg:h-[82vh] flex items-center justify-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT VIEW */}
        <img
          ref={frontRef}
          src={MASCOT_IMAGES.front}
          alt="Bombeiro Mirim - Vista Frontal"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain object-center will-change-[opacity,transform] select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          style={{ opacity: 1 }}
        />

        {/* PROFILE VIEW */}
        <img
          ref={profileRef}
          src={MASCOT_IMAGES.profile}
          alt="Bombeiro Mirim - Vista de Perfil"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain object-center will-change-[opacity,transform] select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          style={{ opacity: 0 }}
        />

        {/* HEROIC 3/4 SALUTE VIEW */}
        <img
          ref={saluteRef}
          src={MASCOT_IMAGES.salute}
          alt="Bombeiro Mirim - Saudação Heroica"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain object-center will-change-[opacity,transform] select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
});

MascotViewer.displayName = 'MascotViewer';
export default MascotViewer;
