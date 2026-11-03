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
    let isGyroActive = false;
    let baseGamma: number | null = null;
    let baseBeta: number | null = null;
    let startTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      // If smartphone gyroscope is active, do not allow synthetic mouse events to override it
      if (isGyroActive) return;

      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;

      targetX = nx * 28;
      targetY = ny * 20;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta === null || gamma === null || beta === undefined || gamma === undefined) return;

      // Mark gyro as active so synthetic mouse events don't override smartphone tilt
      isGyroActive = true;

      // Auto-calibrate to the user's natural resting holding angle on the first event
      if (baseGamma === null || baseBeta === null) {
        baseGamma = gamma;
        baseBeta = beta;
      } else {
        // Ultra-slow adaptive drift to smoothly re-center if the user changes sitting posture
        baseGamma += (gamma - baseGamma) * 0.003;
        baseBeta += (beta - baseBeta) * 0.003;
      }

      // Calculate tilt relative to the user's holding angle
      const deltaGamma = gamma - baseGamma;
      const deltaBeta = beta - baseBeta;

      // Clamp tilt delta to a comfortable, expressive range (±35 degrees of hand movement)
      const clampedGamma = Math.max(-35, Math.min(35, deltaGamma));
      const clampedBeta = Math.max(-35, Math.min(35, deltaBeta));

      // Translate phone angle into responsive 3D mascot displacement
      targetX = (clampedGamma / 35) * 38;
      targetY = (clampedBeta / 35) * 28;
    };

    // On iOS Safari 13+, DeviceOrientation requires user permission via user gesture
    const requestIosGyroPermission = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
            }
          })
          .catch(() => {
            // Handled silently
          });
      }
    };

    const updateParallax = (now: number) => {
      // Subtle organic breathing oscillation when resting
      const elapsed = (now - startTime) * 0.0018;
      const idleFloatX = Math.sin(elapsed * 0.8) * 2.5;
      const idleFloatY = Math.cos(elapsed * 1.1) * 3.0;

      // Lerp for smooth 60fps/120fps motion response
      currentX += (targetX + idleFloatX - currentX) * 0.09;
      currentY += (targetY + idleFloatY - currentY) * 0.09;

      if (innerContainerRef.current) {
        // 3D holographic tilt + translation following the phone's physical angle
        const rotateY = currentX * 0.6;
        const rotateX = -currentY * 0.55;
        innerContainerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }

      if (glowRef.current) {
        // Volumetric optical glow shifts inversely for holographic depth
        glowRef.current.style.transform = `translate3d(${-currentX * 1.5}px, ${-currentY * 1.5}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    // Listen to mouse for desktop
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Automatic immediate orientation listening for Android, Chrome, and all standard mobile browsers
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    window.addEventListener('deviceorientationabsolute', handleDeviceOrientation as any, { passive: true });

    // iOS user gesture listeners to unlock gyro permission seamlessly on first tap/scroll
    window.addEventListener('touchstart', requestIosGyroPermission, { once: true, passive: true });
    window.addEventListener('pointerdown', requestIosGyroPermission, { once: true, passive: true });
    window.addEventListener('click', requestIosGyroPermission, { once: true });

    // Start animation loop
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('deviceorientationabsolute', handleDeviceOrientation as any);
      window.removeEventListener('touchstart', requestIosGyroPermission);
      window.removeEventListener('pointerdown', requestIosGyroPermission);
      window.removeEventListener('click', requestIosGyroPermission);
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
