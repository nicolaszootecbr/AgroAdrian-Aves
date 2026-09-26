import React from 'react';
import { RotateCcw, ArrowRight, History } from 'lucide-react';

interface SessionRecoveryBannerProps {
  savedAnswersCount: number;
  totalCount: number;
  propertyName: string;
  onContinue: () => void;
  onClear: () => void;
}

export const SessionRecoveryBanner: React.FC<SessionRecoveryBannerProps> = ({
  savedAnswersCount,
  totalCount,
  propertyName,
  onContinue,
  onClear,
}) => {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-sm text-stone-900 animate-in slide-in-from-top-3 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-amber-950">
              Deseja continuar a avaliação anterior?
            </h4>
            <p className="text-xs sm:text-sm text-amber-900/90 mt-0.5">
              Encontramos <strong>{savedAnswersCount} de {totalCount}</strong> respostas gravadas na memória deste dispositivo para <strong>"{propertyName || 'Propriedade em Andamento'}"</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={onClear}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-900 hover:text-red-700 hover:bg-amber-100 rounded-xl transition-colors cursor-pointer"
          >
            Limpar e Iniciar Nova
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="px-4 py-2 bg-[#1b4d3e] hover:bg-[#153e32] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Continuar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
