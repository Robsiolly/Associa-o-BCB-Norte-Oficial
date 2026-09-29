/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Award, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import { FireEmbersCanvas } from '../components/FireEmbersCanvas';

export function DisciplinaPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <FireEmbersCanvas />
      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-xs tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            VOLTAR AO INÍCIO
          </Link>
        </div>

        <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-zinc-950/90 backdrop-blur-2xl border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.15)]">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/40 text-red-400 font-mono text-xs tracking-[0.25em] font-semibold">
            <Shield className="w-4 h-4 text-red-500" />
            SEÇÃO EXCLUSIVA • DISCIPLINA
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            DISCIPLINA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-500">
              &amp; ORDEM UNIDA
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-8">
            A disciplina é o alicerce de todo cidadão exemplar. No Bombeiro Mirim BCB Norte, cultivamos a hierarquia, o respeito mútuo, a pontualidade e o civismo através de instruções teóricas e práticas de ordem unida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Valores Cívicos</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Respeito aos símbolos nacionais, amor à pátria, ética profissional e dedicação à comunidade.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Postura e Liderança</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Desenvolvimento de autoconfiança, postura firme diante de desafios e capacidade de liderar com empatia.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 to-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-mono font-bold text-amber-400 text-sm mb-1 uppercase tracking-wider">Quer inscrever um aluno?</h4>
              <p className="text-xs text-white/70">Entre em contato via WhatsApp e garanta a vaga na próxima turma.</p>
            </div>
            <a
              href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20Disciplina%20no%20Bombeiro%20Mirim%20BCB%20Norte!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-red-600/30 transition-all whitespace-nowrap"
            >
              FALAR NO WHATSAPP
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
