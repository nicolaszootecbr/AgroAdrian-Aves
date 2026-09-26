import React from 'react';
import { PropertyMetadata } from '../types';
import { ShieldCheck, Building2, Edit3, RotateCcw, Award } from 'lucide-react';

interface HeaderProps {
  property: PropertyMetadata;
  answeredCount: number;
  totalCount: number;
  onOpenPropertyModal: () => void;
  onResetEvaluation: () => void;
  isDiagnosticView: boolean;
  onBackToQuestions?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  property,
  answeredCount,
  totalCount,
  onOpenPropertyModal,
  onResetEvaluation,
  isDiagnosticView,
  onBackToQuestions,
}) => {
  const percent = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
  const isComplete = percent === 100;

  return (
    <header className="sticky top-0 z-40 bg-[#1b4d3e] text-white shadow-md print:hidden">
      {/* Top Bar with Brand & Property quick trigger */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Brand AgroAdrian */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-emerald-400/40 shadow-inner">
              <span className="font-black text-amber-300 text-lg tracking-tighter">AA</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">AgroAdrian</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/25 text-emerald-200 px-1.5 py-0.2 rounded-sm border border-emerald-400/30">
                  Avicultura
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-100/90 truncate font-medium">
                Parecer de Viabilidade de Área · IN 56 MAPA
              </p>
            </div>
          </div>

          {/* Right Action: Property Badge */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPropertyModal}
              className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-100 transition-colors cursor-pointer max-w-[150px] sm:max-w-[220px]"
              title="Clique para editar dados da fazenda e vistoria"
            >
              <Building2 className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
              <span className="truncate">
                {property.nomePropriedade || 'Identificar Área'}
              </span>
              <Edit3 className="w-3 h-3 shrink-0 text-white/60 ml-0.5" />
            </button>

            <button
              type="button"
              onClick={onResetEvaluation}
              className="p-1.5 text-emerald-200/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Limpar e reiniciar avaliação"
              aria-label="Reiniciar avaliação"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar (Always visible during survey) */}
      <div className="bg-[#153e32] px-4 sm:px-6 py-2 border-t border-emerald-900/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-semibold text-emerald-100/90 mb-1">
          <div className="flex items-center gap-1.5">
            <span>Progresso da Vistoria:</span>
            <span className="font-mono font-bold text-white">
              {answeredCount}/{totalCount} respondidos
            </span>
          </div>
          <span className={`font-mono font-bold ${isComplete ? 'text-emerald-300' : 'text-white'}`}>
            {percent}%
          </span>
        </div>

        {/* Bar */}
        <div className="max-w-4xl mx-auto h-2 bg-emerald-950/60 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isComplete
                ? 'bg-emerald-400'
                : percent > 60
                ? 'bg-amber-400'
                : 'bg-emerald-300'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
