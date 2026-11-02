/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, HeartPulse, Flame, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import { FireEmbersCanvas } from '../components/FireEmbersCanvas';

export function ProtecaoPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-amber-600 selection:text-white">
      <FireEmbersCanvas />
      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-btn text-white font-mono text-xs tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            VOLTAR AO INÍCIO
          </Link>
        </div>

        <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-zinc-950/90 backdrop-blur-2xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 font-mono text-xs tracking-[0.25em] font-semibold">
            <Flame className="w-4 h-4 text-amber-500" />
            SEÇÃO EXCLUSIVA • PROTEÇÃO
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            PROTEÇÃO CIVIL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-500">
              &amp; PRIMEIROS SOCORROS
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-8">
            Prevenção de acidentes, noções fundamentais de salvamento básico, combate a princípios de incêndio doméstico e atendimento pré-hospitalar inicial. Nossos jovens aprendem a agir com calma e segurança em situações críticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Primeiros Socorros</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Técnicas de atendimento inicial, desobstrução de vias aéreas, manobras de RCP e suporte básico de vida.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Prevenção e Alerta</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Identificação de riscos residenciais, uso correto de extintores e acionamento consciente de órgãos de emergência (193/190).
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-bar flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-mono font-bold text-amber-400 text-sm mb-1 uppercase tracking-wider">Conheça nosso projeto</h4>
              <p className="text-xs text-white/70">Tire suas dúvidas ou agende uma visita com nossa coordenação.</p>
            </div>
            <a
              href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20Proteção%20Civil%20no%20Bombeiro%20Mirim%20BCB%20Norte!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl glass-btn-primary text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg transition-all whitespace-nowrap cursor-pointer"
            >
              FALAR NO WHATSAPP
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
