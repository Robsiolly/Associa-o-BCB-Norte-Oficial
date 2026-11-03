/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import { FireEmbersCanvas } from '../components/FireEmbersCanvas';

export function FormacaoPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white">
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

        <div className="p-6 sm:p-10 md:p-12 rounded-3xl glass-card-3d glass-sheen shadow-[0_0_50px_rgba(10,17,40,0.8)]">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-400 font-mono text-xs tracking-[0.25em] font-semibold">
            <BookOpen className="w-4 h-4 text-blue-400" />
            SEÇÃO EXCLUSIVA • FORMAÇÃO
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            FORMAÇÃO INTEGRAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-400 to-red-500">
              &amp; CIDADANIA
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-8">
            Nossa missão vai muito além do quartel. Oferecemos suporte educacional, orientação vocacional, palestras motivacionais e atividades culturais para que cada jovem realize seu potencial máximo na sociedade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl glass-bar">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Desenvolvimento Humano</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Estímulo ao pensamento crítico, inteligência emocional, trabalho em equipe e responsabilidade social.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-bar">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white mb-2">Parceria com a Família</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Integração ativa entre escola, família e corporação para garantir o acompanhamento exemplar do aluno.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-bar flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-mono font-bold text-blue-400 text-sm mb-1 uppercase tracking-wider">Faça parte da nossa missão</h4>
              <p className="text-xs text-white/70">Entre em contato agora mesmo e apoie a formação de novos líderes.</p>
            </div>
            <a
              href="https://wa.me/5511954001865?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20Formação%20no%20Bombeiro%20Mirim%20BCB%20Norte!"
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
