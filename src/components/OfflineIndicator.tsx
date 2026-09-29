/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-neutral-900/95 border border-amber-500/40 px-3.5 py-2 text-xs font-mono text-amber-400 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2 duration-300">
      <WifiOff className="w-4 h-4 text-amber-500 animate-pulse" />
      <span>Modo Offline — Conteúdo em cache ativo.</span>
    </div>
  );
};
