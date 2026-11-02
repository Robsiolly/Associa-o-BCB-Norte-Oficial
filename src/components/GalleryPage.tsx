/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Calendar, 
  MapPin, 
  Sparkles, 
  X, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2,
  Shield,
  Award,
  Layers
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'treinamento' | 'formatura' | 'geral';
  categoryLabel: string;
  type: 'image';
  url: string;
  date: string;
  location: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Atendimento e Transporte em Prancha Rígida',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0024_0ca80915.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Instrução prática de primeiros socorros com foco em estabilização cervical, posicionamento dos socorristas e imobilização correta do paciente na prancha rígida com colares e tirantes.'
  },
  {
    id: '2',
    title: 'Aferição de Pressão Arterial e Sinais Vitais',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0026_677ddd20.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Capacitação prática em aferição de pressão arterial com esfigmomanômetro analógico e verificação precisa dos parâmetros hemodinâmicos da vítima.'
  },
  {
    id: '3',
    title: 'Ausculta com Estetoscópio e Diagnóstico Preliminar',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0022_8954e228.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Alunas desenvolvendo concentração auditiva na ausculta dos batimentos cardíacos, aprendendo a identificar os sons de Korotkoff na medição da pressão sistólica e diastólica.'
  },
  {
    id: '4',
    title: 'Condicionamento Físico e Agilidade na Quadra',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0023_a0da591b.jpg',
    date: '28 de Outubro, 2026',
    location: 'Complexo Esportivo Comunitário',
    description: 'Circuito de exercícios funcionais militares para resistência cardiorrespiratória, reflexo rápido e espírito esportivo do pelotão mirim.'
  },
  {
    id: '5',
    title: 'Ordem Unida e Formação Disciplinar',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0016_d9c34c16.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base Operacional BCB Norte',
    description: 'Alunos do projeto com o uniforme oficial vermelho, praticando os comandos fundamentais de postura, marcha e disciplina sob comando da equipe de instrutores.'
  },
  {
    id: '6',
    title: 'Apresentação e Formação do Pelotão',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0025_d4732f25.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base Operacional BCB Norte',
    description: 'Alinhamento por fileiras, respeito à hierarquia voluntária e concentração para início das instruções diárias da Associação de Bombeiros Civis.'
  },
  {
    id: '7',
    title: 'Subida Tática de Escadaria em Comunidade',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0019_6bd5699d.jpg',
    date: '28 de Outubro, 2026',
    location: 'Comunidade Zona Norte, SP',
    description: 'Exercício de marcha em aclive e superação de degraus nas vielas da comunidade, reforçando a prontidão física e o conhecimento do território de atuação.'
  },
  {
    id: '8',
    title: 'Marcha Comunitária Integrada',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0021_962aa2cc.jpg',
    date: '28 de Outubro, 2026',
    location: 'Zona Norte, SP',
    description: 'Deslocamento conjunto dos jovens alunos pelos logradouros, transmitindo civismo, disciplina e segurança cidadã a todos os moradores locais.'
  },
  {
    id: '9',
    title: 'Registro de Sinais Vitais em Ficha Médica',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0020_bc2c94ee.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Prática de anotação de prontuário, monitoramento cronometrado do pulso radial e interpretação segura dos níveis de pressão arterial.'
  },
  {
    id: '10',
    title: 'Equipe Voluntária da Fundação Paulistana',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0018_800c6850.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Equipe de apoio e voluntárias capacitadoras com coletes oficiais verdes da Fundação Paulistana, dedicadas ao acolhimento social das famílias e crianças.'
  },
  {
    id: '11',
    title: 'Alinhamento Pedagógico e Capacitação Docente',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0014_698cca27.jpg',
    date: '28 de Outubro, 2026',
    location: 'Sala de Instruções BCB Norte',
    description: 'Reunião de capacitação contínua com instrutoras voluntárias para padronização dos métodos educativos, éticos e preventivos do Bombeiro Mirim.'
  },
  {
    id: '12',
    title: 'Encontro com Pais e Responsáveis',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0012_b4e90754.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Assembleia com famílias dos alunos para acompanhamento escolar, alinhamento disciplinar e reforço dos valores de respeito no lar e na comunidade.'
  },
  {
    id: '13',
    title: 'União da Turma Mirim com Familiares',
    category: 'formatura',
    categoryLabel: 'Civismo & Formação',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0009_e3378a5d.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Celebração coletiva de avanços com alunos, mães, pais e equipe pedagógica reunidos em um ambiente caloroso e participativo.'
  },
  {
    id: '14',
    title: 'Demonstração de Triagem em Voluntária',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0007_f4a94fed.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Simulação real de atendimento a paciente sentada com manuseio correto do manguito, percurso da artéria braquial e insuflação controlada.'
  },
  {
    id: '15',
    title: 'Momento de Lanche e Convivência Comunitária',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0011_d45b05ea.jpg',
    date: '28 de Outubro, 2026',
    location: 'Espaço Comunitário BCB',
    description: 'Pausa fraterna com lanche e suco, promovendo hábitos saudáveis de nutrição, companheirismo e respeito mútuo entre os integrantes.'
  },
  {
    id: '16',
    title: 'Exercício Coletivo ao Ar Livre',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0017_ca49da35.jpg',
    date: '28 de Outubro, 2026',
    location: 'Quadra Poliesportiva',
    description: 'Formação em círculo dinâmico na quadra esportiva, combinando coordenação motora e desenvolvimento de liderança proativa entre os jovens.'
  },
  {
    id: '17',
    title: 'Recreação Educativa e Foco em Grupo',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0015_e62bde5a.jpg',
    date: '28 de Outubro, 2026',
    location: 'Quadra Poliesportiva',
    description: 'Dinâmicas cooperativas com bola desenvolvendo reflexo rápido, senso de cooperação e trabalho conjunto em prol do coletivo.'
  },
  {
    id: '18',
    title: 'Treinamento Funcional em Pista Externa',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0013_1f7d1457.jpg',
    date: '28 de Outubro, 2026',
    location: 'Área Esportiva Externa',
    description: 'Exercícios de flexibilidade e coordenação corporal em ambiente aberto, estimulando a autoconfiança de cada criança.'
  },
  {
    id: '19',
    title: 'Fachada Oficial da Base Operacional BCB Norte',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0000_cca54eb9.jpg',
    date: '28 de Outubro, 2026',
    location: 'Sede BCB Norte, São Paulo - SP',
    description: 'Entrada oficial da sede da Associação Bombeiro Civil da Base Norte com os banners institucionais dos cursos profissionalizantes e do projeto Bombeiro Mirim.'
  },
  {
    id: '20',
    title: 'Roda de Leitura Cívica e Educação Preventiva',
    category: 'formatura',
    categoryLabel: 'Civismo & Formação',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0010_1e4b7f07.jpg',
    date: '28 de Outubro, 2026',
    location: 'Sala Pedagógica BCB Norte',
    description: 'Alunos estudando as cartilhas educativas sobre prevenção contra incêndios, segurança no lar, preservação do meio ambiente e civismo.'
  },
  {
    id: '21',
    title: 'Alinhamento em Fila Tática e Disciplina',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0006_72e7127d.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Instrução interna com os alunos em fila disciplinada, aprendendo a obedecer aos comandos de voz e a respeitar o espaço de cada colega de pelotão.'
  },
  {
    id: '22',
    title: 'Execução Solene do Hino Nacional Brasileiro',
    category: 'formatura',
    categoryLabel: 'Civismo & Formação',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0004_265811a3.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Momento solene de civismo com alunos com a mão direita no peito prestando continência e cantando o Hino Nacional em posição de respeito.'
  },
  {
    id: '23',
    title: 'Equipe Pedagógica e Assistência Social',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0003_2fdd9fe4.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Equipe de apoio e instrutoras voluntárias comprometidas com a transformação social e acolhimento das famílias na Zona Norte.'
  },
  {
    id: '24',
    title: 'Corpo de Instrutores e Voluntários',
    category: 'geral',
    categoryLabel: 'Geral & Comunidade',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0005_68538e8b.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Instrutores, bombeiros civis e pedagogas posando na base antes do início das atividades de atendimento e treino dos jovens.'
  },
  {
    id: '25',
    title: 'Simulado de Transporte de Emergência em Prancha',
    category: 'treinamento',
    categoryLabel: 'Treinamento & Socorrismo',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0008_aa60aadd.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Demonstração de levantamento ergonômico da maca rígida com segurança, sincronia e preservação do alinhamento da coluna da vítima.'
  },
  {
    id: '26',
    title: 'Formação Cívica Completa do Pelotão',
    category: 'formatura',
    categoryLabel: 'Civismo & Formação',
    type: 'image',
    url: '/assets/aistudio/IMG-20261028-WA0002_926f8864.jpg',
    date: '28 de Outubro, 2026',
    location: 'Base BCB Norte, SP',
    description: 'Visão frontal do pelotão perfilado em honra à pátria, consolidando os valores morais, éticos e comunitários que guiam o Bombeiro Mirim BCB Norte.'
  }
];

export function GalleryPage({ onBack }: { onBack?: () => void } = {}) {
  const [activeTab, setActiveTab] = useState<'all' | 'treinamento' | 'formatura' | 'geral'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartXRef = useRef<number | null>(null);
  const thumbnailBarRef = useRef<HTMLDivElement>(null);

  const items = GALLERY_ITEMS;

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.category === activeTab);

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, items.length]);

  // Keep thumbnail in view
  useEffect(() => {
    if (thumbnailBarRef.current) {
      const activeThumb = thumbnailBarRef.current.children[carouselIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [carouselIndex]);

  // Keyboard navigation for carousel and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem) {
        if (e.key === 'Escape') {
          setSelectedItem(null);
        } else if (e.key === 'ArrowRight') {
          const currIdx = items.findIndex(it => it.id === selectedItem.id);
          const nextIdx = (currIdx + 1) % items.length;
          setSelectedItem(items[nextIdx]);
        } else if (e.key === 'ArrowLeft') {
          const currIdx = items.findIndex(it => it.id === selectedItem.id);
          const prevIdx = (currIdx - 1 + items.length) % items.length;
          setSelectedItem(items[prevIdx]);
        }
      } else {
        if (e.key === 'ArrowRight') {
          setCarouselIndex((prev) => (prev + 1) % items.length);
        } else if (e.key === 'ArrowLeft') {
          setCarouselIndex((prev) => (prev - 1 + items.length) % items.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, items]);

  const currentSlide = items[carouselIndex] || items[0];

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 relative selection:bg-amber-500 selection:text-black font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation & Back Action */}
        <div className="flex items-center justify-between mb-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-btn text-white font-mono text-xs tracking-wider transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
              <span>VOLTAR AO INÍCIO</span>
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-btn text-white font-mono text-xs tracking-wider transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
              <span>VOLTAR AO INÍCIO</span>
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn-amber text-amber-300 font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>26 FOTOS OFICIAIS</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] tracking-[0.2em] mb-3 uppercase">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>ACERVO OFICIAL • BOMBEIRO MIRIM BCB NORTE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight uppercase">
            GALERIA DE <span className="text-amber-500">FOTOS & VIVÊNCIAS</span>
          </h1>
          <p className="text-white/70 font-mono text-xs sm:text-sm mt-2 max-w-3xl tracking-wide leading-relaxed">
            Confira os registros fotográficos reais dos treinamentos de primeiros socorros, ordem unida cívica, atividades de condicionamento físico e integração com as famílias da comunidade.
          </p>
        </div>

        {/* ----------------- FEATURED CAROUSEL COMPONENT ----------------- */}
        <div className="mb-12 rounded-3xl border border-amber-500/30 bg-zinc-950/80 p-3 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.12)]">
          
          {/* Carousel Top Controls Bar with Glass Effect */}
          <div className="flex items-center justify-between gap-3 mb-4 p-2.5 rounded-2xl glass-bar">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-btn-primary text-white font-mono text-[11px] font-black tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-white animate-pulse" />
                MODO CARROSSEL
              </span>
              <span className="text-white/70 font-mono text-xs font-bold">
                {String(carouselIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-xl glass-btn text-white font-mono text-[10px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                title={isPlaying ? "Pausar troca automática" : "Iniciar troca automática"}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span className="hidden sm:inline">{isPlaying ? 'PAUSAR' : 'REPRODUZIR'}</span>
              </button>

              <button
                onClick={() => setSelectedItem(currentSlide)}
                className="px-3 py-1.5 rounded-xl glass-btn-amber text-amber-300 font-mono text-[10px] tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                title="Ampliar em tela cheia"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">AMPLIAR</span>
              </button>
            </div>
          </div>

          {/* Carousel Slide Stage */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[560px] rounded-2xl overflow-hidden bg-black select-none group cursor-pointer"
            onClick={() => setSelectedItem(currentSlide)}
          >
            {/* The Main Image */}
            <img
              key={currentSlide.id}
              src={currentSlide.url}
              alt={currentSlide.title}
              className="w-full h-full object-cover sm:object-contain transition-all duration-700 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            {/* Navigation Arrows Inside Slide (Liquid Glass Buttons) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-btn text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl z-20 group/arrow"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6 group-hover/arrow:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-btn text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl z-20 group/arrow"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6 group-hover/arrow:translate-x-0.5 transition-transform" />
            </button>

            {/* Slide Information Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10 pointer-events-none">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-lg glass-btn-primary text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-md">
                  {currentSlide.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-white/90 glass-btn px-2.5 py-0.5 rounded-lg">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {currentSlide.date}
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-white/90 glass-btn px-2.5 py-0.5 rounded-lg">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {currentSlide.location}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl md:text-3xl font-mono font-black uppercase text-white tracking-wide drop-shadow-md">
                {currentSlide.title}
              </h2>
              <p className="text-white/85 font-mono text-xs sm:text-sm mt-1 max-w-3xl line-clamp-2 drop-shadow">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Interactive Thumbnails Filmstrip Bar with Glass Effect */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                MINIATURAS (CLIQUE PARA SELECIONAR)
              </span>
              <span className="text-[10px] font-mono text-amber-400/80">
                {carouselIndex + 1} de {items.length} fotos
              </span>
            </div>

            <div 
              ref={thumbnailBarRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth no-scrollbar p-1.5 rounded-2xl glass-bar"
            >
              {items.map((item, idx) => {
                const isCurrent = idx === carouselIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCarouselIndex(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-amber-400 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)] opacity-100 ring-2 ring-amber-500/40'
                        : 'glass-btn opacity-60 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/80 font-mono text-[8px] px-1 text-white/90">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ----------------- FILTERABLE COMPLETE GRID SECTION ----------------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-4 border-t border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-mono font-black uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>EXPLORAR POR CATEGORIA</span>
            </h3>
            <p className="text-white/60 font-mono text-xs mt-1">
              Visualize fotos individuais organizadas por tema ou formato de atuação.
            </p>
          </div>

          {/* Category Tabs (Liquid Glass Bar & Buttons) */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs p-1.5 rounded-2xl glass-bar">
            {[
              { id: 'all', label: 'TODOS', count: items.length },
              { id: 'treinamento', label: 'TREINAMENTOS', count: items.filter(i => i.category === 'treinamento').length },
              { id: 'formatura', label: 'CIVISMO', count: items.filter(i => i.category === 'formatura').length },
              { id: 'geral', label: 'COMUNIDADE', count: items.filter(i => i.category === 'geral').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-300 font-bold tracking-wider uppercase text-[10px] sm:text-xs cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'glass-btn-primary text-white shadow-lg'
                    : 'glass-btn text-white/70 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-black/30 text-white font-black' : 'bg-white/10 text-white/60'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of All 26 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/70 hover:border-amber-500/60 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-black/60 relative">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold z-10 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-amber-500" />
                  {item.categoryLabel}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5" />
                    AMPLIAR FOTO
                  </div>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide mb-2 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-white/60 font-mono text-xs line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/45 pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-500/80" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-amber-500/80 shrink-0" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ----------------- LIGHTBOX MODAL WITH FULL CONTROLS ----------------- */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-zinc-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[95vh] flex flex-col"
          >
            {/* Modal Header Bar with Glass Effect */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-bar">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md glass-btn-amber text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider">
                  {selectedItem.categoryLabel}
                </span>
                <span className="text-white/70 font-mono text-xs">
                  {selectedItem.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full glass-btn text-white hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[62vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title} 
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev in Modal (Glass Button) */}
              <button
                onClick={() => {
                  const currIdx = items.findIndex(it => it.id === selectedItem.id);
                  const prevIdx = (currIdx - 1 + items.length) % items.length;
                  setSelectedItem(items[prevIdx]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-btn text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Foto anterior (seta esquerda)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next in Modal (Glass Button) */}
              <button
                onClick={() => {
                  const currIdx = items.findIndex(it => it.id === selectedItem.id);
                  const nextIdx = (currIdx + 1) % items.length;
                  setSelectedItem(items[nextIdx]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-btn text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Próxima foto (seta direita)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Information Footer Bar with Glass Effect */}
            <div className="p-6 glass-bar-dark border-t border-white/10 overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-mono font-bold uppercase tracking-wide text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-white/70 font-mono text-xs sm:text-sm leading-relaxed mb-4">
                {selectedItem.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 pt-3 border-t border-white/10">
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
