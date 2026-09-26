import React from 'react';
import { ChecklistItem } from '../types';
import { X, HelpCircle, AlertTriangle, ShieldCheck, BookOpen, Compass, ExternalLink } from 'lucide-react';

interface TechnicalHelpModalProps {
  item: ChecklistItem | null;
  onClose: () => void;
}

export const TechnicalHelpModal: React.FC<TechnicalHelpModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isEliminatorio = item.tipo_criterio === 'ELIMINATORIO';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#faf8f4] text-stone-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-5 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-3 pr-2">
            <div className={`p-2 rounded-xl shrink-0 ${isEliminatorio ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-[#1b4d3e]'}`}>
              {isEliminatorio ? <AlertTriangle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div>
              <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                isEliminatorio ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}>
                {isEliminatorio ? 'Requisito Crítico Eliminatório' : 'Requisito Classificatório / Operacional'}
              </span>
              <h3 id="help-modal-title" className="text-base font-bold text-stone-900 leading-snug mt-1">
                Fundamentação Técnica e Normativa
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 -mr-1 -mt-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-sm leading-relaxed text-stone-700">
          {/* Pergunta em Foco */}
          <div className="bg-stone-100/80 p-3.5 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1">
              Item em Avaliação
            </span>
            <p className="font-semibold text-stone-900 text-sm">
              {item.pergunta}
            </p>
          </div>

          {/* Por que isso é importante */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#1b4d3e]" />
              <h4>Por que este critério é determinante?</h4>
            </div>
            <p className="text-stone-700 pl-6 text-[13.5px]">
              {item.fundamentacao_tecnica}
            </p>
          </div>

          {/* Dica Prática de Campo */}
          {item.dica_de_campo && (
            <div className="bg-[#1b4d3e]/5 border border-[#1b4d3e]/20 p-3.5 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#1b4d3e] text-xs uppercase tracking-wide">
                <Compass className="w-4 h-4 shrink-0" />
                <span>Como verificar no terreno (Dica de Campo)</span>
              </div>
              <p className="text-stone-800 text-[13px] leading-relaxed break-words">
                {item.dica_de_campo}
              </p>
            </div>
          )}

          {/* O que fazer se for 'NÃO' */}
          <div className="bg-amber-50/90 border border-amber-200 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Ação Corretiva Exigida (se responder NÃO)</span>
            </div>
            <p className="text-amber-950 text-[13px] leading-relaxed">
              {item.acao_corretiva_se_nao}
            </p>
          </div>

          {/* Referência Normativa */}
          {item.referencia_normativa && (
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-200">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>Base normativa: <strong className="text-stone-700">{item.referencia_normativa}</strong></span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#1b4d3e] text-white font-semibold text-sm rounded-xl hover:bg-[#153e32] active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
