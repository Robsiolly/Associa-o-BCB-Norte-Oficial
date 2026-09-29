/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Clock, Menu, X, Award, Smartphone, Home } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { PWAInstallButton } from './PWAInstallButton';

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

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-xl border-b border-white/15 transition-all duration-300">
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

        {/* Instalar App button (Desktop/Tablet row) */}
        <div className="hidden sm:flex ml-2 sm:ml-4 items-center shrink-0">
          <PWAInstallButton />
        </div>

        {/* Navigation Subpages Links (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-[10px] lg:text-[11px] font-mono tracking-[0.15em] text-white/80 shrink-0">
          <Link
            to="/"
            className={`px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10 ${location.pathname === '/' ? 'text-white font-bold bg-white/10' : 'text-white/70'}`}
          >
            INÍCIO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/disciplina"
            className={`px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10 ${location.pathname === '/disciplina' ? 'text-red-400 font-bold bg-red-950/30 border border-red-500/30' : 'text-white/70'}`}
          >
            DISCIPLINA
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/protecao"
            className={`px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10 ${location.pathname === '/protecao' ? 'text-amber-400 font-bold bg-amber-950/30 border border-amber-500/30' : 'text-white/70'}`}
          >
            PROTEÇÃO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/formacao"
            className={`px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10 ${location.pathname === '/formacao' ? 'text-blue-400 font-bold bg-blue-950/30 border border-blue-500/30' : 'text-white/70'}`}
          >
            FORMAÇÃO
          </Link>
          <span className="text-amber-500/30">•</span>
          <Link
            to="/galeria"
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shadow-md ${location.pathname === '/galeria' ? 'bg-amber-500 text-black shadow-amber-500/30' : 'bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30'}`}
          >
            GALERIA
          </Link>
        </nav>

        {/* Header CTA Buttons and Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Active tactical QAP Clock in Header */}
          {time && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/15 bg-amber-500/5 text-amber-400 font-mono text-[10px] tracking-widest uppercase font-bold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
              QAP • {time}
            </div>
          )}

          <a
            href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20contribuir%20com%20o%20Bombeiro%20Mirim%20BCB%20Norte!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex relative overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] font-medium transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>CONTRIBUIR</span>
          </a>

          {/* Tactical Hamburger Button */}
          <button
            onClick={() => {
              console.log('Hamburger clicked, opening menu');
              setIsMenuOpen(true);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-amber-500 bg-amber-500/10 hover:bg-amber-500/30 text-amber-400 transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)] z-50 relative"
            aria-label="Abrir Menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile / Slide-over Menu Drawer (Guaranteed z-[99999] overlay) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99999] overflow-y-auto">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/9oid bg-black/90 backdrop-blur-md transition-opacity"
          />

          {/* Slide-over Panel Container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-[380px] bg-zinc-950 border-l border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] relative z-10 overflow-y-auto min-h-screen">
              
              <div className="flex flex-col gap-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 p-0.5">
                      <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                        <img src={logoImg} alt="BCB" className="w-full h-full object-cover rounded-[10px]" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest uppercase">MENU TÁTICO</span>
                      <span className="font-mono text-base font-black text-white tracking-wider">BCB NORTE</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-11 h-11 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Fechar Menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Vertical Subpage Links in Mobile Menu */}
                <nav className="flex flex-col gap-3">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-xl bg-white/5 border border-white/15 text-xs font-mono font-bold tracking-[0.2em] text-white hover:bg-white/15 transition-all flex items-center gap-3"
                  >
                    <Home className="w-5 h-5 text-amber-400" />
                    PÁGINA INÍCIO
                  </Link>

                  <Link
                    to="/disciplina"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-xl bg-red-950/50 border border-red-500/50 text-xs font-mono font-bold tracking-[0.2em] text-red-300 hover:bg-red-900/50 transition-all flex items-center gap-3 shadow-md"
                  >
                    <Shield className="w-5 h-5 text-red-500" />
                    DISCIPLINA &amp; ORDEM
                  </Link>

                  <Link
                    to="/protecao"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-xl bg-amber-950/50 border border-amber-500/50 text-xs font-mono font-bold tracking-[0.2em] text-amber-300 hover:bg-amber-900/50 transition-all flex items-center gap-3 shadow-md"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    PROTEÇÃO CIVIL
                  </Link>

                  <Link
                    to="/formacao"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-xl bg-blue-950/50 border border-blue-500/50 text-xs font-mono font-bold tracking-[0.2em] text-blue-300 hover:bg-blue-900/50 transition-all flex items-center gap-3 shadow-md"
                  >
                    <Award className="w-5 h-5 text-blue-400" />
                    FORMAÇÃO INTEGRAL
                  </Link>

                  <Link
                    to="/galeria"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-xl bg-amber-500/30 border border-amber-500/70 text-xs font-mono font-bold tracking-[0.2em] text-amber-200 hover:bg-amber-500/40 transition-all flex items-center gap-3 shadow-xl shadow-amber-500/25"
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                    GALERIA DE FOTOS &amp; VÍDEOS
                  </Link>
                </nav>

                {/* Tactical Status Section in menu */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-white/15 font-mono">
                  <span className="text-[10px] text-white/50 tracking-widest font-semibold uppercase px-1">STATUS TÁTICO</span>
                  
                  {/* QAP Clock */}
                  {time && (
                    <div className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs tracking-widest font-bold">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                        QAP ATIVO
                      </span>
                      <span>{time}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      ORG. ATIVA
                    </span>
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer CTA */}
              <div className="pt-6 border-t border-white/15 flex flex-col gap-3 mt-6">
                <a
                  href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20contribuir%20com%20o%20Bombeiro%20Mirim%20BCB%20Norte!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
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
