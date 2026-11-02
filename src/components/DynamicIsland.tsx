import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Volume2, VolumeX, CheckCircle } from 'lucide-react';

interface NotificationData {
  message: string;
  type: 'success' | 'info' | 'sound-on' | 'sound-off';
  duration?: number;
}

export const DynamicIsland = () => {
  const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Elegant entry welcome notification after 1.5s
    const entryTimeout = setTimeout(() => {
      triggerNotification({
        message: "Status: BCB Norte QAP (Operação Ativa)",
        type: 'info',
        duration: 4000
      });
    }, 1500);

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<NotificationData>;
      if (customEvent.detail) {
        triggerNotification(customEvent.detail);
      }
    };

    window.addEventListener('dynamic-island', handleCustomEvent);

    return () => {
      clearTimeout(entryTimeout);
      window.removeEventListener('dynamic-island', handleCustomEvent);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerNotification = (notif: NotificationData) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Set notification and expand the island with liquid motion
    setActiveNotification(notif);
    setIsExpanded(true);

    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      // Wait for collapse animation to finish before clearing
      setTimeout(() => setActiveNotification(null), 300);
    }, notif.duration || 3200);
  };

  const getIcon = () => {
    if (!activeNotification) return <Shield className="w-4 h-4 text-amber-500" />;
    switch (activeNotification.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'sound-on':
        return <Volume2 className="w-4 h-4 text-amber-400" />;
      case 'sound-off':
        return <VolumeX className="w-4 h-4 text-white/40" />;
      case 'info':
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex flex-col items-center">
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 320,
          damping: 24,
        }}
        style={{ borderRadius: '24px' }}
        className={`pointer-events-auto flex items-center justify-center glass-bar text-white select-none ${
          isExpanded 
            ? 'px-5 py-3.5 max-w-[340px] sm:max-w-[420px] w-auto h-auto' 
            : 'px-3 py-1.5 w-[140px] h-[34px]'
        }`}
      >
        <AnimatePresence mode="wait">
          {isExpanded && activeNotification ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -2 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex items-center gap-3.5"
            >
              <div className="p-1.5 rounded-full bg-white/5 border border-white/10 shrink-0">
                {getIcon()}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">SISTEMA BCB</span>
                <span className="text-xs font-medium text-white/95 tracking-wide leading-tight mt-0.5 whitespace-nowrap">
                  {activeNotification.message}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center gap-2 h-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.15em] font-black text-amber-500 leading-none flex items-center">
                QAP
              </span>
              <span className="text-white/30 font-mono text-[8px] leading-none flex items-center select-none">|</span>
              <span className="font-mono text-[10px] text-white/80 tracking-[0.15em] uppercase font-bold leading-none flex items-center">
                BCB
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
