import { useEffect, useRef, useState } from 'react';

interface AudioControllerProps {
  activeStep: number;
}

export const AudioController = ({ activeStep }: AudioControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Audio Nodes
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Note frequency mappings for each moment
  // Extremely warm, low cinematic chord pads (filtered heavily for a deep drone feeling)
  const stepChords: { [key: number]: number[] } = {
    0: [65.41, 130.81, 196.00], // C2, C3, G3 (Open, warm fifth chord)
    1: [58.27, 116.54, 174.61], // B♭1, B♭2, F3 (Dramatic, minor third/peril vibe)
    2: [73.42, 146.83, 220.00], // D2, D3, A3 (Disciplined, structured stable tone)
    3: [65.41, 130.81, 261.63], // C2, C3, C4 (Triumphant octave resolution)
  };

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master Volume node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Deep lowpass filter to keep it extremely warm, comforting and sub-bass centered
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(95, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);
    filter.connect(masterGain);
    filterRef.current = filter;

    // Create 3 parallel detuned drone oscillators (perfect Moog-style fat cinematic drone)
    const freqs = stepChords[activeStep] || stepChords[0];
    const detunes = [-6, 0, 6]; // Subtle organic detune cents to create lush beating/texture
    const oscTypes: ('sine' | 'triangle')[] = ['triangle', 'sine', 'triangle'];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = oscTypes[idx % oscTypes.length];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detunes[idx % detunes.length], ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.04, ctx.currentTime); // very warm & soft

      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start();
      oscillatorsRef.current.push(osc);
      gainNodesRef.current.push(oscGain);
    });

    // Create a slow Low-Frequency Oscillator (LFO) to modulate the filter frequency for a breathing effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // Very slow breath cycle (~8 seconds)
    lfoGain.gain.setValueAtTime(15, ctx.currentTime); // Subtle modulation of filter by +/- 15 Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    lfoRef.current = lfo;

    // Fade in master volume softly over 3 seconds for a dramatic movie opening
    masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 3.0);
  };

  const handleToggle = () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Trilha Sonora Ativada (HQ)", type: 'sound-on' } }));
    } else {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
        setIsPlaying(true);
        masterGainRef.current?.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.2);
        window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Trilha Sonora Ativada (HQ)", type: 'sound-on' } }));
      } else if (isPlaying) {
        masterGainRef.current?.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        setTimeout(() => {
          if (audioCtxRef.current?.state === 'running' && masterGainRef.current?.gain.value === 0) {
            audioCtxRef.current.suspend();
          }
        }, 800);
        setIsPlaying(false);
        window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Trilha Sonora Silenciada", type: 'sound-off' } }));
      } else {
        ctx.resume();
        setIsPlaying(true);
        masterGainRef.current?.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.2);
        window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Trilha Sonora Ativada (HQ)", type: 'sound-on' } }));
      }
    }
  };

  // Play a gorgeous high-fidelity deep sub-bass crescendo rumble sound upon step transition
  const playStepTransitionClick = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running' || !isPlaying) return;

    const ctx = audioCtxRef.current;

    // Synthesize a soft low-frequency cinematic rumble to give weight to the transition
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    const subFilter = ctx.createBiquadFilter();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(45, ctx.currentTime); // Deep rumbling frequency
    subOsc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.8); // Smooth crescendo sweep

    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 0.15); // Fade in rumble
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2); // Smooth decay

    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(75, ctx.currentTime); // Clean sub-bass pass

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start();
    subOsc.stop(ctx.currentTime + 1.3);
  };

  // Smoothly morph chord frequencies based on activeStep changes
  useEffect(() => {
    if (!audioCtxRef.current || !isPlaying) return;

    const ctx = audioCtxRef.current;
    const freqs = stepChords[activeStep] || stepChords[0];

    // Ramp oscillator frequencies slowly and organically
    oscillatorsRef.current.forEach((osc, idx) => {
      if (freqs[idx]) {
        osc.frequency.exponentialRampToValueAtTime(freqs[idx], ctx.currentTime + 2.0);
      }
    });

    // Play the transition click sound
    playStepTransitionClick();
  }, [activeStep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-40 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 glass-btn rounded-full text-white/90 transition-all duration-300 shadow-lg group cursor-pointer"
      id="sound-control-button"
      title={isPlaying ? "Silenciar Trilha" : "Ativar Trilha Sonora"}
    >
      {/* Soundwave bars animating when sound is active */}
      <div className="flex items-end gap-0.5 h-3.5 pb-0.5 relative">
        <span className={`w-0.5 bg-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-1 h-3.5' : 'h-1.5 bg-white/30'}`} />
        <span className={`w-0.5 bg-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-2 h-2.5' : 'h-2 bg-white/30'}`} />
        <span className={`w-0.5 bg-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-3 h-3.5' : 'h-1.5 bg-white/30'}`} />
        <span className={`w-0.5 bg-amber-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-4 h-1.5' : 'h-2.5 bg-white/30'}`} />
      </div>
      
      <span className="absolute left-12 glass-bar text-[9px] sm:text-[10px] text-white/90 px-2.5 py-1 rounded-md font-mono tracking-widest uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-2xl">
        {isPlaying ? 'SILENCIAR • HQ' : 'TRILHA SONORA'}
      </span>
    </button>
  );
};
