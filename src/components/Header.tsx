/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Clock, Menu, X, Award, Home } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Header() {
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock and freeze the background site completely when hamburger menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyTop = document.body.style.top;
      const originalBodyWidth = document.body.style.width;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.scrollTo(0, scrollY);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full glass-bar transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-4 group cursor-pointer shrink-0"
        >
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-600 via-amber-600 to-amber-500 p-0.5 shadow-[0_0_25px_rgba(220,38,38,0.3)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all duration-500">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
              <img 
                src={logoImg} 
                alt="Bombeiro Mirim BCB Norte" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] sm:text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              BOMBEIRO MIRIM
            </span>
            <span className="text-base sm:text-2xl font-black font-mono tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
              BCB NORTE
            </span>
          </div>
        </div>

        {/* Navigation Subpages Links (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-[10px] lg:text-[11px] font-mono tracking-[0.15em] text-white/80 shrink-0">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl transition-all ${location.pathname === '/' ? 'glass-btn text-white font-bold' : 'glass-btn text-white/70 hover:text-white'}`}
          >
            INÍCIO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/disciplina"
            className={`px-3 py-1.5 rounded-xl transition-all ${location.pathname === '/disciplina' ? 'glass-btn-amber text-red-400 font-bold' : 'glass-btn text-white/70 hover:text-red-400'}`}
          >
            DISCIPLINA
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/protecao"
            className={`px-3 py-1.5 rounded-xl transition-all ${location.pathname === '/protecao' ? 'glass-btn-amber text-amber-400 font-bold' : 'glass-btn text-white/70 hover:text-amber-400'}`}
          >
            PROTEÇÃO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/formacao"
            className={`px-3 py-1.5 rounded-xl transition-all ${location.pathname === '/formacao' ? 'glass-btn text-blue-400 font-bold border-blue-500/40' : 'glass-btn text-white/70 hover:text-blue-400'}`}
          >
            FORMAÇÃO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/galeria"
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${location.pathname === '/galeria' ? 'glass-btn-primary text-white' : 'glass-btn-amber text-amber-300'}`}
          >
            GALERIA
          </Link>
        </nav>

        {/* Header CTA Buttons and Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Active tactical QAP Clock in Header (Glass pill) */}
          {time && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-btn text-amber-400 font-mono text-[10px] tracking-widest uppercase font-bold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
              QAP • {time}
            </div>
          )}

          <a
            href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20contribuir%20com%20o%20Bombeiro%20Mirim%20BCB%20Norte!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex relative overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl glass-btn-amber text-amber-300 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] font-medium transition-all duration-300 items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>CONTRIBUIR</span>
          </a>

          {/* Tactical Hamburger Button (Liquid Glass) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-xl glass-btn-amber text-amber-400 transition-all duration-300 active:scale-95 cursor-pointer z-50 relative"
            aria-label="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile / Slide-over Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99999] overflow-hidden">
          {/* Backdrop - locked and frozen */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            onWheel={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity cursor-pointer"
            aria-label="Fechar menu"
          />

          {/* Slide-over Panel Container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-[360px] bg-zinc-950/95 backdrop-blur-2xl border-l border-white/20 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] relative z-10 overflow-y-auto min-h-screen">
              
              <div className="flex flex-col gap-5">
                {/* Drawer Header Bar with Glass Effect */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl glass-bar">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 p-0.5">
                      <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                        <img src={logoImg} alt="BCB" className="w-full h-full object-cover rounded-[10px]" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-red-500 font-bold tracking-widest uppercase">MENU TÁTICO</span>
                      <span className="font-mono text-sm font-black text-white tracking-wider">BCB NORTE</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-9 h-9 rounded-xl glass-btn flex items-center justify-center text-white cursor-pointer"
                    aria-label="Fechar Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Vertical Subpage Links in Mobile Menu (Glass Buttons) */}
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl glass-btn text-xs font-mono font-bold tracking-[0.15em] text-white flex items-center gap-2.5"
                  >
                    <Home className="w-4 h-4 text-amber-400" />
                    PÁGINA INÍCIO
                  </Link>

                  <Link
                    to="/disciplina"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl glass-btn-primary text-xs font-mono font-bold tracking-[0.15em] text-white flex items-center gap-2.5"
                  >
                    <Shield className="w-4 h-4 text-white" />
                    DISCIPLINA &amp; ORDEM
                  </Link>

                  <Link
                    to="/protecao"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl glass-btn-amber text-xs font-mono font-bold tracking-[0.15em] text-amber-300 flex items-center gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    PROTEÇÃO CIVIL
                  </Link>

                  <Link
                    to="/formacao"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl glass-btn text-xs font-mono font-bold tracking-[0.15em] text-blue-300 border-blue-500/40 flex items-center gap-2.5"
                  >
                    <Award className="w-4 h-4 text-blue-400" />
                    FORMAÇÃO INTEGRAL
                  </Link>

                  <Link
                    to="/galeria"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3.5 rounded-xl glass-btn-primary text-xs font-mono font-bold tracking-[0.15em] text-white flex items-center gap-2.5 shadow-lg"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    GALERIA DE FOTOS &amp; VÍDEOS
                  </Link>
                </nav>

                {/* Tactical Status Section in menu */}
                <div className="flex flex-col gap-2 pt-3 border-t border-white/15 font-mono">
                  <span className="text-[9px] text-white/50 tracking-widest font-semibold uppercase px-1">STATUS TÁTICO</span>
                  
                  {/* QAP Clock glass pill */}
                  {time && (
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl glass-btn text-amber-400 text-[11px] tracking-widest font-bold">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                        QAP ATIVO
                      </span>
                      <span>{time}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl glass-btn text-emerald-400 text-[11px] tracking-widest font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      ORG. ATIVA
                    </span>
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer CTA Bar & Button */}
              <div className="pt-4 border-t border-white/15 flex flex-col gap-3 mt-4">
                <a
                  href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20contribuir%20com%20o%20Bombeiro%20Mirim%20BCB%20Norte!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl glass-btn-primary text-white font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  CONTRIBUIR VIA WHATSAPP
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
