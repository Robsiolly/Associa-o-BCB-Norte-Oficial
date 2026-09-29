/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Video, Shield, Play, FolderOpen, Calendar, MapPin, Sparkles, X, ArrowLeft } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'treinamento' | 'viatura' | 'formatura' | 'geral';
  type: 'image' | 'video';
  url: string;
  date: string;
  location: string;
  description: string;
}

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'treinamento' | 'viatura' | 'formatura' | 'geral'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Aqui você (dono do site) adiciona as fotos e vídeos reais para os visitantes visualizarem.
  const [items] = useState<GalleryItem[]>([
    // Exemplo pronto para você descomentar e testar ou adicionar suas mídias:
    /*
    {
      id: '1',
      title: 'Treinamento Tático Matinal',
      category: 'treinamento',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
      date: '28 de Setembro, 2026',
      location: 'Base BCB Norte, SP',
      description: 'Instrução de ordem unida, civismo e primeiros socorros com a turma do Bombeiro Mirim.'
    }
    */
  ]);

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500 selection:text-black font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/85 hover:text-white font-mono text-xs tracking-wider transition-all mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR À PÁGINA PRINCIPAL</span>
        </Link>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>SUBPÁGINA EXTRA • ACERVO DE MÍDIAS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight uppercase">
              GALERIA DE <span className="text-amber-500">FOTOS & VÍDEOS</span>
            </h1>
            <p className="text-white/60 font-mono text-xs sm:text-sm mt-3 max-w-2xl tracking-wide">
              Explore os registros oficiais de treinamentos, formaturas, viaturas e atuações do Bombeiro Mirim BCB Norte.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'TODOS' },
              { id: 'treinamento', label: 'TREINAMENTOS' },
              { id: 'viatura', label: 'VIATURAS' },
              { id: 'formatura', label: 'FORMATURAS' },
              { id: 'geral', label: 'GERAL' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl transition-all duration-300 font-bold tracking-wider uppercase text-[10px] sm:text-xs cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 rounded-3xl border border-dashed border-white/15 bg-zinc-950/40 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-mono font-bold tracking-wider uppercase text-white mb-2">
              NENHUM REGISTRO PUBLICADO NESTA CATEGORIA
            </h3>
            <p className="text-white/50 font-mono text-xs sm:text-sm max-w-md leading-relaxed">
              As fotos e vídeos adicionados por você nesta página extra aparecerão aqui automaticamente para os visitantes visualizarem.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 hover:border-amber-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]"
              >
                <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-10">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  )}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold z-10">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-mono font-bold text-sm text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/60 font-mono text-xs line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500/70" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500/70" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-zinc-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">
                {selectedItem.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wide text-white mb-3">
                {selectedItem.title}
              </h3>
              <p className="text-white/70 font-mono text-xs sm:text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>
              <div className="flex items-center gap-6 text-xs font-mono text-white/50 pt-4 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {selectedItem.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {selectedItem.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
