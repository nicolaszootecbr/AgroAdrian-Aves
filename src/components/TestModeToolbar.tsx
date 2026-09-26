import React from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

interface TestModeToolbarProps {
  onTestVerde: () => void;
  onTestLaranja: () => void;
  onTestVermelho: () => void;
}

export const TestModeToolbar: React.FC<TestModeToolbarProps> = ({
  onTestVerde,
  onTestLaranja,
  onTestVermelho,
}) => {
  return (
    <div className="mt-12 pt-6 border-t border-stone-200/80 print:hidden text-center">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wider">
        <FlaskConical className="w-3.5 h-3.5 text-stone-400" />
        <span>Atalhos de Homologação e Teste Rápido (QA)</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
        <button
          type="button"
          onClick={onTestVerde}
          className="px-3 py-2 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Preenche 100% dos itens como SIM"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Testar Cenário Verde</span>
        </button>

        <button
          type="button"
          onClick={onTestLaranja}
          className="px-3 py-2 bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Eliminatórios como SIM, mas 2 classificatórios como NÃO"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
          <span>Testar Cenário Laranja</span>
        </button>

        <button
          type="button"
          onClick={onTestVermelho}
          className="px-3 py-2 bg-red-100/80 hover:bg-red-200 text-red-950 border border-red-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Marca 1 item eliminatório crítico como NÃO"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
          <span>Testar Cenário Vermelho</span>
        </button>
      </div>
      <p className="text-[11px] text-stone-400 mt-2">
        Preenche os dados automaticamente e calcula o laudo instantaneamente.
      </p>
    </div>
  );
};
