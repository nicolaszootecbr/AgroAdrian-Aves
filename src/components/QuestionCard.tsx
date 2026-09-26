import React from 'react';
import { AnswerValue, ChecklistItem } from '../types';
import { Check, X, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  item: ChecklistItem;
  categoryIndex: number;
  questionIndex: number;
  currentAnswer: AnswerValue | undefined;
  isHighlightedMissing: boolean;
  onAnswer: (itemId: string, value: AnswerValue) => void;
  onOpenHelp: (item: ChecklistItem) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  categoryIndex,
  questionIndex,
  currentAnswer,
  isHighlightedMissing,
  onAnswer,
  onOpenHelp,
}) => {
  const isEliminatorio = item.tipo_criterio === 'ELIMINATORIO';

  return (
    <div
      id={`question-${item.id}`}
      className={`rounded-2xl transition-all duration-200 border p-4 sm:p-5 relative ${
        isHighlightedMissing
          ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400 ring-offset-2'
          : currentAnswer === 'SIM'
          ? 'bg-white border-emerald-300/80 shadow-xs'
          : currentAnswer === 'NAO'
          ? isEliminatorio
            ? 'bg-red-50/70 border-red-300 shadow-xs'
            : 'bg-amber-50/60 border-amber-300 shadow-xs'
          : 'bg-white border-stone-200 shadow-xs hover:border-stone-300'
      }`}
    >
      {/* Missing Answer Badge Warning */}
      {isHighlightedMissing && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/90 px-2.5 py-1 rounded-md mb-2.5 w-fit animate-pulse">
          <AlertCircle className="w-3.5 h-3.5 text-amber-800" />
          <span>Pergunta obrigatória não respondida</span>
        </div>
      )}

      {/* Top Header Row: Counter, Type Tag and Help Button */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
            #{categoryIndex + 1}.{questionIndex + 1}
          </span>

          {isEliminatorio ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              Critério Eliminatório
            </span>
          ) : item.tipo_criterio === 'OPERACIONAL' ? (
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
              Critério Operacional
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
              Critério Classificatório
            </span>
          )}
        </div>

        {/* Technical help trigger */}
        <button
          type="button"
          onClick={() => onOpenHelp(item)}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#1b4d3e] hover:text-[#12362b] bg-[#1b4d3e]/8 hover:bg-[#1b4d3e]/15 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
          title="Ver explicação técnica e dicas"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">O que é isso?</span>
        </button>
      </div>

      {/* Question Text */}
      <p className="text-stone-900 font-semibold text-[15px] sm:text-base leading-snug mb-3">
        {item.pergunta}
      </p>

      {/* Subtle field hint preview */}
      {item.dica_de_campo && !currentAnswer && (
        <div className="mb-3.5 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-[13px] leading-relaxed flex items-start gap-2 shadow-2xs">
          <span className="shrink-0 text-sm select-none">💡</span>
          <div className="min-w-0 flex-1">
            <span className="font-bold text-amber-900 block xs:inline mr-1">
              Dica prática:
            </span>
            <span className="text-stone-700 font-medium break-words">
              {item.dica_de_campo}
            </span>
          </div>
        </div>
      )}

      {/* Toggle Buttons: SIM / NÃO (Mobile-first, min height 48px, huge touch targets) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
        {/* Button SIM */}
        <button
          type="button"
          onClick={() => onAnswer(item.id, 'SIM')}
          className={`h-13 sm:h-12 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98] ${
            currentAnswer === 'SIM'
              ? 'bg-[#2e7d32] text-white shadow-md shadow-emerald-900/20 ring-2 ring-emerald-600 ring-offset-1 font-extrabold'
              : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200/80'
          }`}
          aria-pressed={currentAnswer === 'SIM'}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${currentAnswer === 'SIM' ? 'bg-white/20' : 'bg-stone-200 text-stone-500'}`}>
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>SIM</span>
        </button>

        {/* Button NÃO */}
        <button
          type="button"
          onClick={() => onAnswer(item.id, 'NAO')}
          className={`h-13 sm:h-12 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98] ${
            currentAnswer === 'NAO'
              ? 'bg-[#c62828] text-white shadow-md shadow-red-900/20 ring-2 ring-red-600 ring-offset-1 font-extrabold'
              : 'bg-stone-100 text-stone-700 hover:bg-red-50 hover:text-red-800 border border-stone-200/80'
          }`}
          aria-pressed={currentAnswer === 'NAO'}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${currentAnswer === 'NAO' ? 'bg-white/20' : 'bg-stone-200 text-stone-500'}`}>
            <X className="w-3.5 h-3.5" />
          </div>
          <span>NÃO</span>
        </button>
      </div>

      {/* Immediate feedback strip when answered 'NAO' */}
      {currentAnswer === 'NAO' && (
        <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed transition-all ${
          isEliminatorio
            ? 'bg-red-100/90 border-red-300 text-red-950'
            : 'bg-amber-100/80 border-amber-300 text-amber-950'
        }`}>
          <div className="font-bold flex items-center gap-1.5 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{isEliminatorio ? 'Ponto Crítico Eliminatório' : 'Adequação Necessária'}</span>
          </div>
          <p className="font-medium">
            {item.acao_corretiva_se_nao}
          </p>
        </div>
      )}
    </div>
  );
};
