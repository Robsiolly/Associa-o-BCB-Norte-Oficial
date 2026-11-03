import { useState, useRef } from 'react';
import { Award, Shield, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';

interface Question {
  id: number;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  accentColor: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: "Você percebe que uma tomada na sala começou a soltar faíscas e um leve cheiro de queimado. O que deve ser feito imediatamente?",
    options: [
      "Jogar um copo d'água para apagar as faíscas rapidamente.",
      "Desligar o disjuntor geral de energia da casa e avisar um adulto.",
      "Assoprar com força para esfriar os fios quentes."
    ],
    correctIndex: 1,
    explanation: "Excelente decisão! Água conduz eletricidade e causaria um choque perigoso. Desligar o disjuntor geral corta a corrente e interrompe o risco na fonte de forma segura.",
    accentColor: "from-amber-500 to-red-600"
  },
  {
    id: 2,
    scenario: "Durante uma brincadeira, um colega tropeça, cai e machuca o braço, reclamando de muita dor. Qual a postura de primeiros socorros correta?",
    options: [
      "Tentar puxar o braço para 'colocar no lugar' o osso.",
      "Passar pasta de dente no local para aliviar a sensação de calor.",
      "Manter o colega calmo, evitar mover o braço dele e ligar para o 193 (Bombeiros)."
    ],
    correctIndex: 2,
    explanation: "Perfeito! Nunca devemos forçar um membro machucado ou aplicar substâncias domésticas. Manter a calma e acionar o socorro especializado (193) salva vidas.",
    accentColor: "from-red-600 to-amber-500"
  },
  {
    id: 3,
    scenario: "Uma fumaça densa começa a entrar por debaixo da porta do quarto. Qual a melhor rota de fuga recomendada pelos Bombeiros?",
    options: [
      "Caminhar agachado bem rente ao chão (onde há oxigênio limpo) e cobrir o nariz com um pano.",
      "Correr de pé o mais rápido possível respirando fundo.",
      "Se esconder debaixo da cama e esperar o fogo apagar sozinho."
    ],
    correctIndex: 0,
    explanation: "Brilhante! O calor e os gases tóxicos da fumaça sobem. Ficar rente ao chão garante que você respire o ar mais puro e seguro para escapar do ambiente.",
    accentColor: "from-amber-500 to-amber-600"
  }
];

const BADGES = [
  {
    title: "Prevenção & Combate",
    desc: "Aprende a identificar riscos domésticos, manusear extintores e agir preventivamente contra acidentes.",
    icon: Shield,
    color: "from-red-500 to-orange-600",
    shadowColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    title: "Anjo da Guarda",
    desc: "Noções vitais de primeiros socorros, contenção de pequenos sangramentos, engasgos e acionamento do 193.",
    icon: Award,
    color: "from-amber-500 to-yellow-600",
    shadowColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    title: "Cidadão Protetor",
    desc: "Valores éticos de civismo, preservação ambiental, respeito hierárquico e liderança comunitária.",
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
    shadowColor: "rgba(59, 130, 246, 0.4)"
  }
];

export const InteractiveSection = () => {
  // Simulator states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Badge States
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);
  const [activeBadgeInfo, setActiveBadgeInfo] = useState<number>(0);

  // Local Web Audio synthesizer for instant gamified feedback clicks
  const playSynthesizedBeep = (isSuccess: boolean) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        // High pleasant ding-ding chord
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Low brief buzzer warning tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch (e) {
      // Audio context block failsafe
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    const correct = selectedOption === QUESTIONS[currentQuestionIndex].correctIndex;
    setIsAnswered(true);
    playSynthesizedBeep(correct);

    if (correct) {
      setScore(prev => prev + 1);
      window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Resposta Correta! +1 Ponto", type: 'success' } }));
    } else {
      window.dispatchEvent(new CustomEvent('dynamic-island', { detail: { message: "Alternativa incorreta. Leia a explicação!", type: 'info' } }));
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartSimulator = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4 sm:px-8 py-20 sm:py-28 border-t border-zinc-900" id="interactive-portal-section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Section Heading with cinematic styling */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-400 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Portal Interativo Mirim
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400 leading-tight">
            VIVENCIE A FORMAÇÃO
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Gire as insígnias reais conquistadas pelos alunos ou teste seus reflexos no nosso simulador de primeiros socorros de emergência.
          </p>
        </div>

        {/* Dual Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
          
          {/* LEFT SLOT: Medalhas / Insígnias 3D (Grid Column: 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl glass-card-3d glass-card-gold glass-sheen shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base sm:text-lg font-bold tracking-wide">INSÍGNIAS DE HONRA</h3>
            </div>

            {/* Badges Floating Interactive List */}
            <div className="flex justify-around items-center py-6 gap-4">
              {BADGES.map((badge, idx) => {
                const Icon = badge.icon;
                const isSelected = activeBadgeInfo === idx;
                const isHovered = hoveredBadge === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveBadgeInfo(idx)}
                    onMouseEnter={() => setHoveredBadge(idx)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    style={{
                      transform: isSelected || isHovered 
                        ? 'rotateY(180deg) scale(1.1)' 
                        : 'rotateY(0deg)',
                      perspective: '1000px',
                      transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    className={`relative w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isSelected 
                        ? 'glass-btn-amber shadow-lg' 
                        : 'glass-btn'
                    }`}
                    title={badge.title}
                  >
                    {/* Glowing effect background */}
                    {(isSelected || isHovered) && (
                      <div 
                        style={{ boxShadow: `0 0 20px ${badge.shadowColor}` }}
                        className="absolute inset-0 rounded-full animate-pulse opacity-60"
                      />
                    )}

                    {/* Badge Icon (shows correctly oriented) */}
                    <div className="transform" style={{ transform: isSelected || isHovered ? 'rotateY(180deg)' : 'none' }}>
                      <Icon className={`w-7 h-7 sm:w-9 sm:h-9 ${isSelected ? 'text-amber-400' : 'text-zinc-500 group-hover:text-amber-400 transition-colors'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Badge Detailed Card */}
            <div className="p-4 sm:p-5 rounded-2xl glass-bar flex flex-col gap-2 min-h-[140px] justify-center transition-all duration-300">
              <span className={`text-[10px] uppercase tracking-widest font-mono font-bold bg-gradient-to-r ${BADGES[activeBadgeInfo].color} bg-clip-text text-transparent`}>
                BRONZE • PRATA • OURO
              </span>
              <h4 className="text-sm sm:text-base font-extrabold tracking-wide text-white">
                {BADGES[activeBadgeInfo].title}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                {BADGES[activeBadgeInfo].desc}
              </p>
            </div>
          </div>

          {/* RIGHT SLOT: Simulador Chamado do Herói (Grid Column: 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl glass-card-3d glass-card-red glass-sheen shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Area */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-red-500" />
                <h3 className="text-base sm:text-lg font-bold tracking-wide uppercase">SIMULADOR: CHAMADO DO HERÓI</h3>
              </div>
              
              {!showResult && (
                <span className="text-[10px] font-mono font-bold text-white/50">
                  QUESTÃO {currentQuestionIndex + 1} DE {QUESTIONS.length}
                </span>
              )}
            </div>

            {/* Active Game Scenario */}
            {!showResult ? (
              <div className="flex flex-col gap-5 flex-grow justify-center">
                
                {/* Scenario text */}
                <div className="p-4 sm:p-5 rounded-2xl glass-bar text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{QUESTIONS[currentQuestionIndex].scenario}</span>
                  </div>
                </div>

                {/* Option buttons */}
                <div className="flex flex-col gap-2.5">
                  {QUESTIONS[currentQuestionIndex].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectOption = QUESTIONS[currentQuestionIndex].correctIndex === idx;
                    
                    let btnStyle = "glass-btn text-zinc-300";
                    if (isAnswered) {
                      if (isCorrectOption) {
                        btnStyle = "border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                      } else if (isSelected) {
                        btnStyle = "border-red-500/60 bg-red-950/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
                      } else {
                        btnStyle = "border-zinc-800/40 bg-zinc-950/10 text-zinc-600 pointer-events-none opacity-40";
                      }
                    } else if (isSelected) {
                      btnStyle = "glass-btn-amber text-amber-300";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={isAnswered}
                        className={`p-3.5 sm:p-4 rounded-xl border text-left text-xs font-medium tracking-wide transition-all duration-300 flex gap-3 items-center ${btnStyle} ${!isAnswered ? 'cursor-pointer active:scale-[0.99]' : ''}`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                          isSelected ? 'bg-amber-500 border-amber-500 text-black font-bold' : 'border-zinc-700 text-zinc-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback box */}
                {isAnswered && (
                  <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed animate-fadeIn ${
                    selectedOption === QUESTIONS[currentQuestionIndex].correctIndex
                      ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/20 text-red-300'
                  }`}>
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                    <div>
                      <span className="font-bold uppercase block mb-1">
                        {selectedOption === QUESTIONS[currentQuestionIndex].correctIndex ? 'Resposta Correta!' : 'Resposta Errada'}
                      </span>
                      {QUESTIONS[currentQuestionIndex].explanation}
                    </div>
                  </div>
                )}

                {/* Actions area inside game */}
                <div className="flex justify-end pt-2">
                  {!isAnswered ? (
                    <button
                      onClick={checkAnswer}
                      disabled={selectedOption === null}
                      className={`px-5 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                        selectedOption !== null
                          ? 'glass-btn-primary text-white'
                          : 'glass-btn text-zinc-500 pointer-events-none opacity-50'
                      }`}
                    >
                      Confirmar Escolha
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-5 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-[11px] glass-btn text-white uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {currentQuestionIndex === QUESTIONS.length - 1 ? 'Ver Resultado' : 'Próxima Questão'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            ) : (
              // Game Score Dashboard Result
              <div className="flex flex-col items-center justify-center text-center py-6 flex-grow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-xl shadow-amber-500/10 mb-4 animate-bounce">
                  <Award className="w-9 h-9 text-white" />
                </div>
                
                <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
                  {score === QUESTIONS.length ? '🥇 EXCELENTE CONDUTA!' : score > 1 ? '🥈 QUASE UM HERÓI!' : '🥉 PRECISA TREINAR MAIS!'}
                </h4>
                
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-sm font-normal">
                  Você acertou <strong className="text-amber-500 font-bold">{score} de {QUESTIONS.length}</strong> cenários de simulação crítica da corporação mirim.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button
                    onClick={restartSimulator}
                    className="flex-1 px-4 py-3 rounded-xl glass-btn font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Recomeçar Teste
                  </button>
                  <a
                    href="#hero-scroll-container"
                    onClick={() => {
                      // Smooth scroll up to top registration buttons
                      document.getElementById('hero-scroll-container')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 px-4 py-3 rounded-xl glass-btn-primary font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer text-white"
                  >
                    Inscrever Aluno
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
