/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, AlertCircle, Award, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './components/Header';
import MascotViewer, { MascotViewerRef } from './components/MascotViewer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FireEmbersCanvas } from './components/FireEmbersCanvas';
import { AudioController } from './components/AudioController';
import { InteractiveSection } from './components/InteractiveSection';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { index: 0, label: '01 Heróis' },
  { index: 1, label: '02 Disciplina' },
  { index: 2, label: '03 Estrutura' },
  { index: 3, label: '04 Missão' },
];

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const mascotViewerRef = useRef<MascotViewerRef>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Active step state to reflect real-time scroll progress (0, 1, 2, 3)
  const [activeStep, setActiveStep] = useState(0);

  // References for the 4 moment text containers
  const moment1Ref = useRef<HTMLDivElement>(null);
  const moment2Ref = useRef<HTMLDivElement>(null);
  const moment3Ref = useRef<HTMLDivElement>(null);
  const moment4Ref = useRef<HTMLDivElement>(null);

  // Decorative scroll elements
  const goldLineRef = useRef<HTMLDivElement>(null);
  const indicatorCardsRef = useRef<HTMLDivElement>(null);

  // Navigation handlers for switching moments interactively
  const goToStep = (stepIndex: number) => {
    setActiveStep(stepIndex);
    const progresses = [0, 0.333, 0.666, 1.0];
    const targetProgress = progresses[stepIndex] ?? 0;

    // Animate the GSAP timeline directly for instant responsive feedback
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        progress: targetProgress,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    // Also sync the physical page scroll position smoothly
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const startY = rect.top + scrollTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const targetY = startY + (totalScroll * targetProgress);
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  const nextStep = () => {
    const next = (activeStep + 1) % 4;
    goToStep(next);
  };

  const prevStep = () => {
    const prev = (activeStep - 1 + 4) % 4;
    goToStep(prev);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Common clean initial state for texts
      gsap.set([moment2Ref.current, moment3Ref.current, moment4Ref.current], {
        opacity: 0,
        y: 0,
        filter: 'blur(10px)',
        pointerEvents: 'none',
      });
      gsap.set(goldLineRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // Mascot elements from forwarded ref
      const mascotContainer = mascotViewerRef.current?.container;
      const frontImg = mascotViewerRef.current?.frontImg;
      const profileImg = mascotViewerRef.current?.profileImg;
      const backImg = mascotViewerRef.current?.backImg;
      const glowBg = mascotViewerRef.current?.glowBg;

      if (!mascotContainer || !frontImg || !profileImg || !backImg || !glowBg) return;

      // ----------------------------------------------------------------------
      // DESKTOP & TABLET LAYOUT (>= 640px)
      // Strict Bilateral Choreography:
      // - Step 1: Mascot RIGHT (+38%) <-> Text 1 LEFT (0)
      // - Step 2: Mascot LEFT (-38%)  <-> Text 2 RIGHT (0)
      // - Step 3: Mascot RIGHT (+38%) <-> Text 3 LEFT (0)
      // - Step 4: Mascot LEFT (-38%)  <-> Text 4 RIGHT (0)
      // ----------------------------------------------------------------------
      // ----------------------------------------------------------------------
      // DESKTOP LAYOUT (>= 1024px) WITH FRONT-FACING FACE CLOSE-UP ZOOM
      // ----------------------------------------------------------------------
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            pin: pinSectionRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const step = p < 0.2 ? 0 : p < 0.52 ? 1 : p < 0.82 ? 2 : 3;
              setActiveStep(step);
            },
          },
        });
        timelineRef.current = tl;

        // Initial States
        gsap.set(mascotContainer, { xPercent: 38, yPercent: 0, scale: 1.05, transformOrigin: '50% 28%' });
        gsap.set(frontImg, { opacity: 1 });
        gsap.set(profileImg, { opacity: 0 });
        gsap.set(backImg, { opacity: 0 });
        gsap.set(moment1Ref.current, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
        gsap.set(moment2Ref.current, { opacity: 0, x: 60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(moment3Ref.current, { opacity: 0, x: -60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(moment4Ref.current, { opacity: 0, x: 60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(goldLineRef.current, { scaleX: 0 });

        // STEP 0 -> STEP 1 (Time 0 to 1.8)
        // Mascot moves Left (xPercent: -38) with profile view and face close-up zoom, text 2 on Right (right-0)
        tl.to(moment1Ref.current, {
          opacity: 0,
          x: -60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 0)
          .to(frontImg, { opacity: 0, duration: 0.9 }, 0)
          .to(profileImg, { opacity: 1, duration: 0.9 }, 0)
          // Moving mascot to left (xPercent: -38) at standard scale 1.05
          .to(mascotContainer, {
            xPercent: -38,
            scale: 1.05,
            transformOrigin: '50% 28%',
            duration: 1.4,
            ease: 'power2.inOut',
          }, 0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.35) 0%, rgba(245, 158, 11, 0.20) 40%, rgba(0, 0, 0, 0) 72%)',
            scale: 1.3,
            duration: 1.4,
          }, 0)
          .to(moment2Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 0.6)
          .to(goldLineRef.current, {
            scaleX: 1,
            duration: 0.7,
            ease: 'power1.inOut',
          }, 1.1);

        // STEP 1 -> STEP 2
        tl.to(moment2Ref.current, {
          opacity: 0,
          x: 60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 2.0)
          .to(profileImg, { opacity: 0, duration: 0.9 }, 2.0)
          .to(backImg, { opacity: 1, duration: 0.9 }, 2.0)
          .to(mascotContainer, {
            xPercent: 38,
            scale: 1.05,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 2.0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.28) 0%, rgba(59, 130, 246, 0.22) 40%, rgba(0, 0, 0, 0) 72%)',
            scale: 1.15,
            duration: 1.4,
          }, 2.0)
          .to(moment3Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 2.6);

        // STEP 2 -> STEP 3
        tl.to(moment3Ref.current, {
          opacity: 0,
          x: -60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 4.0)
          .to(backImg, { opacity: 0, duration: 0.9 }, 4.0)
          .to(frontImg, { opacity: 1, duration: 0.9 }, 4.0)
          .to(mascotContainer, {
            xPercent: -38,
            scale: 1.05,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 4.0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.40) 0%, rgba(245, 158, 11, 0.25) 45%, rgba(0, 0, 0, 0) 75%)',
            scale: 1.25,
            duration: 1.4,
          }, 4.0)
          .to(moment4Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 4.6);
      });

      // ----------------------------------------------------------------------
      // TABLET LAYOUT (640px to 1023px)
      // ----------------------------------------------------------------------
      mm.add('(min-width: 640px) and (max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            pin: pinSectionRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const step = p < 0.2 ? 0 : p < 0.52 ? 1 : p < 0.82 ? 2 : 3;
              setActiveStep(step);
            },
          },
        });
        timelineRef.current = tl;

        // Initial States
        gsap.set(mascotContainer, { xPercent: 38, yPercent: 0, scale: 1.05 });
        gsap.set(frontImg, { opacity: 1 });
        gsap.set(profileImg, { opacity: 0 });
        gsap.set(backImg, { opacity: 0 });
        gsap.set(moment1Ref.current, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
        gsap.set(moment2Ref.current, { opacity: 0, x: 60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(moment3Ref.current, { opacity: 0, x: -60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(moment4Ref.current, { opacity: 0, x: 60, y: 0, filter: 'blur(12px)', pointerEvents: 'none' });
        gsap.set(goldLineRef.current, { scaleX: 0 });

        // STEP 0 -> STEP 1
        tl.to(moment1Ref.current, {
          opacity: 0,
          x: -60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 0)
          .to(frontImg, { opacity: 0, duration: 0.9 }, 0)
          .to(profileImg, { opacity: 1, duration: 0.9 }, 0)
          .to(mascotContainer, {
            xPercent: -38,
            scale: 1.05,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.35) 0%, rgba(245, 158, 11, 0.20) 40%, rgba(0, 0, 0, 0) 72%)',
            scale: 1.2,
            duration: 1.4,
          }, 0)
          .to(moment2Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 0.6)
          .to(goldLineRef.current, {
            scaleX: 1,
            duration: 0.7,
            ease: 'power1.inOut',
          }, 1.1);

        // STEP 1 -> STEP 2
        tl.to(moment2Ref.current, {
          opacity: 0,
          x: 60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 2.0)
          .to(profileImg, { opacity: 0, duration: 0.9 }, 2.0)
          .to(backImg, { opacity: 1, duration: 0.9 }, 2.0)
          .to(mascotContainer, {
            xPercent: 38,
            scale: 1.05,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 2.0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.28) 0%, rgba(59, 130, 246, 0.22) 40%, rgba(0, 0, 0, 0) 72%)',
            scale: 1.15,
            duration: 1.4,
          }, 2.0)
          .to(moment3Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 2.6);

        // STEP 2 -> STEP 3
        tl.to(moment3Ref.current, {
          opacity: 0,
          x: -60,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 4.0)
          .to(backImg, { opacity: 0, duration: 0.9 }, 4.0)
          .to(frontImg, { opacity: 1, duration: 0.9 }, 4.0)
          .to(mascotContainer, {
            xPercent: -38,
            scale: 1.05,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 4.0)
          .to(glowBg, {
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.40) 0%, rgba(245, 158, 11, 0.25) 45%, rgba(0, 0, 0, 0) 75%)',
            scale: 1.25,
            duration: 1.4,
          }, 4.0)
          .to(moment4Ref.current, {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 4.6);
      });

      // ----------------------------------------------------------------------
      // COMPACT MOBILE & TABLET LAYOUT (< 1024px)
      // Clean bottom-stacked card positioning with vertical fade/slide animations,
      // ensuring zero visual overlapping with the central mascot.
      // ----------------------------------------------------------------------
      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            pin: pinSectionRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const step = p < 0.2 ? 0 : p < 0.52 ? 1 : p < 0.82 ? 2 : 3;
              setActiveStep(step);
            },
          },
        });
        timelineRef.current = tl;

        // Initial States for Mobile/Tablet - Mascot centered, text at bottom
        gsap.set(mascotContainer, { xPercent: 0, yPercent: -12, scale: 1.05 });
        gsap.set(frontImg, { opacity: 1 });
        gsap.set(profileImg, { opacity: 0 });
        gsap.set(backImg, { opacity: 0 });
        gsap.set(moment1Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
        gsap.set(moment2Ref.current, { opacity: 0, y: 25, filter: 'blur(8px)', pointerEvents: 'none' });
        gsap.set(moment3Ref.current, { opacity: 0, y: 25, filter: 'blur(8px)', pointerEvents: 'none' });
        gsap.set(moment4Ref.current, { opacity: 0, y: 25, filter: 'blur(8px)', pointerEvents: 'none' });
        gsap.set(goldLineRef.current, { scaleX: 0 });

        // STEP 0 -> STEP 1
        tl.to(moment1Ref.current, {
          opacity: 0,
          y: -25,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 0)
          .to(frontImg, { opacity: 0, duration: 0.9 }, 0)
          .to(profileImg, { opacity: 1, duration: 0.9 }, 0)
          // Move mascot left on scroll for mobile
          .to(mascotContainer, {
            xPercent: -28,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 0)
          .to(moment2Ref.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 0.6)
          .to(goldLineRef.current, {
            scaleX: 1,
            duration: 0.7,
          }, 1.1);

        // STEP 1 -> STEP 2
        tl.to(moment2Ref.current, {
          opacity: 0,
          y: -25,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 2.0)
          .to(profileImg, { opacity: 0, duration: 0.9 }, 2.0)
          .to(backImg, { opacity: 1, duration: 0.9 }, 2.0)
          // Move mascot right on scroll for mobile
          .to(mascotContainer, {
            xPercent: 28,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 2.0)
          .to(moment3Ref.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 2.6);

        // STEP 2 -> STEP 3
        tl.to(moment3Ref.current, {
          opacity: 0,
          y: -25,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          duration: 0.9,
          ease: 'power2.in',
        }, 4.0)
          .to(backImg, { opacity: 0, duration: 0.9 }, 4.0)
          .to(frontImg, { opacity: 1, duration: 0.9 }, 4.0)
          // Move mascot left on scroll for mobile
          .to(mascotContainer, {
            xPercent: -28,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 4.0)
          .to(moment4Ref.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power2.out',
          }, 4.6);
      });

    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-black font-sans overflow-x-hidden min-h-screen select-none">
      <Header />
      <AudioController activeStep={activeStep} />

      {/* 280vh Scroll Timeline Wrapper */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[280vh] bg-black"
        id="hero-scroll-container"
      >
        {/* Full-screen Sticky Container */}
        <div
          ref={pinSectionRef}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
        >
          <FireEmbersCanvas />

          {/* FULL SCREEN HERO MASCOT (Dominates the entire viewport) */}
          <MascotViewer ref={mascotViewerRef} />

          {/* Stage Overlays */}
          <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10 lg:px-12 h-full flex flex-col justify-center z-20 pointer-events-none">
            
            {/* Stage Container with vertical centering */}
            <div className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] max-h-[calc(100vh-170px)] flex items-center">
              
              {/* MOMENT 1: IMPACTO INICIAL */}
              <div
                ref={moment1Ref}
                className="absolute bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto w-[94%] sm:w-[85%] lg:absolute lg:bottom-auto lg:inset-x-auto lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[42%] lg:max-w-[480px] flex flex-col justify-center text-left pointer-events-auto lg:mr-auto will-change-[transform,opacity,filter]"
              >
                <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl glass-card-3d glass-card-red glass-sheen max-h-[calc(100vh-210px)] overflow-y-auto sm:overflow-visible">
                  <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 rounded-full border border-red-500/30 bg-red-950/40 text-red-400 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold w-fit">
                    <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-red-500" />
                    ASSOCIAÇÃO BCB NORTE
                  </div>
                  
                  <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.08] mb-2 sm:mb-4">
                    FORMANDO <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-500">
                      OS HERÓIS
                    </span> <br />
                    DO AMANHÃ
                  </h1>

                  <p className="text-[11px] sm:text-sm text-white/80 font-normal tracking-wide mb-3.5 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Disciplina, liderança e valores para a vida toda. Preparando jovens para os desafios do futuro através da cidadania e proteção civil.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
                    <a
                      href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20inscrever%20um%20aluno%20no%20Bombeiro%20Mirim%20BCB%20Norte!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl glass-btn-primary text-white font-mono text-[9px] sm:text-[11px] tracking-widest font-semibold uppercase shadow-xl transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                    >
                      INSCREVER BOMBEIRO MIRIM
                    </a>
                    <a
                      href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20ser%20um%20apoiador%20da%20Associação%20BCB%20Norte!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl glass-btn-amber text-amber-300 font-mono text-[9px] sm:text-[11px] tracking-widest font-semibold uppercase transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                    >
                      SEJA UM APOIADOR
                    </a>
                  </div>
                </div>
              </div>

              {/* MOMENT 2: AÇÃO */}
              <div
                ref={moment2Ref}
                className="absolute bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto w-[94%] sm:w-[85%] lg:absolute lg:bottom-auto lg:inset-x-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[42%] lg:max-w-[480px] flex flex-col justify-center text-left pointer-events-auto lg:ml-auto will-change-[transform,opacity,filter]"
              >
                <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl glass-card-3d glass-card-gold glass-sheen max-h-[calc(100vh-210px)] overflow-y-auto sm:overflow-visible">
                  <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold w-fit">
                    <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500 animate-spin-slow" />
                    PREPARO DE IMPACTO
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-3">
                    DISCIPLINA <br />
                    <span className="text-red-500">&amp;</span> PROTEÇÃO CIVIL
                  </h2>

                  {/* Animated Gold Line */}
                  <div
                    ref={goldLineRef}
                    className="w-24 sm:w-44 h-[3px] bg-gradient-to-r from-amber-500 to-red-500 mb-2 sm:mb-4 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  />

                  <p className="text-[11px] sm:text-sm text-white/80 font-normal tracking-wide mb-3.5 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Aprendizado técnico, prevenção, noções de primeiros socorros, salvamento básico e um compromisso inegociável com o respeito ao próximo.
                  </p>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                    <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                      <div className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-black bg-red-600 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">B</div>
                      <div className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-black bg-amber-600 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">C</div>
                      <div className="inline-block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-black bg-blue-600 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">B</div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/70 tracking-wider truncate">Treinamento cívico-militar contínuo</span>
                  </div>
                </div>
              </div>

              {/* MOMENT 3: ESTRUTURA */}
              <div
                ref={moment3Ref}
                className="absolute bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto w-[94%] sm:w-[85%] lg:absolute lg:bottom-auto lg:inset-x-auto lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[42%] lg:max-w-[480px] flex flex-col justify-center text-left pointer-events-auto lg:mr-auto will-change-[transform,opacity,filter]"
              >
                <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl glass-card-3d glass-sheen max-h-[calc(100vh-210px)] overflow-y-auto sm:overflow-visible">
                  <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-400 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold w-fit">
                    <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-400" />
                    MUDANÇA DE PERSPECTIVA
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-4">
                    UMA ESTRUTURA <br />
                    DE IMPACTO
                  </h2>

                  {/* Indicator Cards */}
                  <div
                    ref={indicatorCardsRef}
                    className="grid grid-cols-3 gap-1 sm:gap-2 w-full"
                  >
                    <div className="p-1.5 sm:p-2.5 md:p-3 rounded-xl glass-btn flex flex-col gap-0.5 shadow-lg">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                      <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold tracking-wider text-white uppercase truncate">FORMAÇÃO</h4>
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] text-white/70 leading-tight">Cidadania viva.</p>
                    </div>
                    
                    <div className="p-1.5 sm:p-2.5 md:p-3 rounded-xl glass-btn flex flex-col gap-0.5 shadow-lg">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                      <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold tracking-wider text-white uppercase truncate">DISCIPLINA</h4>
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] text-white/70 leading-tight">Valores reais.</p>
                    </div>

                    <div className="p-1.5 sm:p-2.5 md:p-3 rounded-xl glass-btn flex flex-col gap-0.5 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                      <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-mono font-bold tracking-wider text-white uppercase truncate">FUTURO</h4>
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] text-white/70 leading-tight">Oportunidade.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOMENT 4: MISSÃO */}
              <div
                ref={moment4Ref}
                className="absolute bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto w-[94%] sm:w-[85%] lg:absolute lg:bottom-auto lg:inset-x-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[42%] lg:max-w-[480px] flex flex-col justify-center text-left pointer-events-auto lg:ml-auto will-change-[transform,opacity,filter]"
              >
                <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl glass-card-3d glass-card-red glass-sheen max-h-[calc(100vh-210px)] overflow-y-auto sm:overflow-visible">
                  <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 rounded-full border border-red-500/30 bg-red-950/40 text-red-400 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold w-fit">
                    <AlertCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-red-500 animate-pulse" />
                    JUNTE-SE À CAUSA
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2 sm:mb-3">
                    FAÇA PARTE <br />
                    DESSA MISSÃO
                  </h2>

                  <p className="text-[11px] sm:text-sm text-white/80 font-normal tracking-wide mb-3.5 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Ajude a construir uma geração forte, preparada para servir, proteger e transformar a sociedade de forma responsável e acolhedora.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
                    <a
                      href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20fazer%20parte%20da%20missão%20do%20Bombeiro%20Mirim%20BCB%20Norte!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl glass-btn-primary text-white font-mono text-[9px] sm:text-[11px] tracking-widest font-semibold uppercase shadow-xl transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                    >
                      FAÇA PARTE
                    </a>
                    <a
                      href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20conhecer%20mais%20sobre%20a%20Associação%20BCB%20Norte!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl glass-btn-amber text-amber-300 font-mono text-[9px] sm:text-[11px] tracking-widest font-semibold uppercase transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                    >
                      CONHEÇA A BCB NORTE
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ELEGANT INTERACTIVE HUD STEP CONTROLLER (Liquid Glass Bar & Buttons) */}
          <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto w-[94vw] sm:w-auto max-w-[96vw]">
            {/* Step Status Chip (Glass Bar) */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-bar text-[9px] sm:text-xs font-mono text-white/90 shadow-xl">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="text-white/70 font-medium whitespace-nowrap">Etapa {activeStep + 1} de 4</span>
              <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
              <span className="text-amber-400 font-semibold truncate max-w-[140px] sm:max-w-none">{STEPS[activeStep]?.label.substring(3)}</span>
            </div>

            {/* Pill Steps Navigation (Liquid Glass Bar) */}
            <div className="flex items-center justify-between sm:justify-center w-full sm:w-auto gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl glass-bar shadow-2xl">
              <button
                onClick={prevStep}
                title="Etapa anterior"
                className="p-1.5 sm:p-2 rounded-xl glass-btn text-white/80 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center shrink-0"
                aria-label="Etapa anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
                {STEPS.map((step) => {
                  const isActive = activeStep === step.index;
                  return (
                    <button
                      key={step.index}
                      onClick={() => goToStep(step.index)}
                      className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-xl font-mono text-[9px] sm:text-[11px] font-semibold transition-all duration-300 cursor-pointer min-h-[30px] sm:min-h-[32px] flex items-center justify-center whitespace-nowrap ${
                        isActive
                          ? 'glass-btn-primary text-white scale-105'
                          : 'glass-btn text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="hidden sm:inline">{step.label}</span>
                      <span className="inline sm:hidden">{isActive ? step.label : step.label.slice(0, 2)}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextStep}
                title="Próxima etapa"
                className="p-1.5 sm:p-2 rounded-xl glass-btn text-white/80 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center shrink-0"
                aria-label="Próxima etapa"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <OfflineIndicator />
        </div>
      </div>

      <InteractiveSection />
    </div>
  );
}

