/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Share2, X, Smartphone, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide install prompt
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-[9px] sm:text-[10px] tracking-[0.15em] font-semibold transition-all duration-300 shadow-md shadow-red-600/20 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
        title="Instalar aplicativo no seu celular ou computador"
      >
        <Download className="w-3.5 h-3.5" />
        <span>INSTALAR APP</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported natively by Apple WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          title="Como instalar no iPhone ou iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>INSTALAR APP</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-amber-500/30 p-6 shadow-2xl relative text-left">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Instalar no iPhone / iPad
                  </h3>
                  <p className="text-xs text-white/50 font-mono">BCB Norte PWA</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/60 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    No Safari do seu iPhone, toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta para cima <Share2 className="w-3.5 h-3.5 inline text-amber-400 -mt-1" /> na barra inferior).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/60 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/60 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    Toque em <strong>"Adicionar"</strong> no canto superior direito para confirmar.
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] text-amber-400/80 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>O ícone oficial do BCB Norte aparecerá na sua tela de aplicativos.</span>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-xs font-mono tracking-wider font-semibold text-white transition-colors"
              >
                ENTENDI
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback if not iOS and beforeinstallprompt not fired yet: show a discrete install guide button
  return (
    <button
      onClick={() => {
        alert(
          'Para instalar este app no seu dispositivo:\n\n• No Android/Chrome: Toque nos três pontinhos (⋮) e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".\n• No iPhone/Safari: Toque no ícone de Compartilhar e em "Adicionar à Tela de Início".'
        );
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-[9px] sm:text-[10px] tracking-[0.15em] font-medium transition-all duration-300 whitespace-nowrap"
      title="Instalar aplicativo"
    >
      <Download className="w-3.5 h-3.5 text-amber-400" />
      <span>INSTALAR APP</span>
    </button>
  );
};
