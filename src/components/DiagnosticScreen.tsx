import React, { useState } from 'react';
import { EvaluationResult, PropertyMetadata, ChecklistDataset } from '../types';
import { generateViabilityPDF } from '../utils/pdf-generator';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Download,
  Share2,
  Printer,
  RotateCcw,
  ArrowLeft,
  Check,
  Building2,
  Calendar,
  User,
  MapPin,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  FileCheck,
  Copy,
  ExternalLink
} from 'lucide-react';

interface DiagnosticScreenProps {
  result: EvaluationResult;
  property: PropertyMetadata;
  dataset: ChecklistDataset;
  onBackToEdit: () => void;
  onResetEvaluation: () => void;
  onOpenPropertyModal: () => void;
}

export const DiagnosticScreen: React.FC<DiagnosticScreenProps> = ({
  result,
  property,
  dataset,
  onBackToEdit,
  onResetEvaluation,
  onOpenPropertyModal,
}) => {
  const [activeTab, setActiveTab] = useState<'acoes' | 'conformes' | 'todas'>('acoes');
  const [copiedShare, setCopiedShare] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const isTotalmenteViavel = result.status === 'TOTALMENTE VIÁVEL';
  const isViavelComAdequacoes = result.status === 'VIÁVEL COM ADEQUAÇÕES';
  const isInviavel = result.status === 'INVIÁVEL';

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);
    try {
      generateViabilityPDF(result, property, dataset);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const summaryText = `*PARECER TÉCNICO AGROADRIAN · VIABILIDADE AVÍCOLA*\n` +
      `Propriedade: ${property.nomePropriedade || 'Propriedade Rural'}\n` +
      `Produtor: ${property.nomeProdutor || 'Produtor'}\n` +
      `Local: ${property.municipioUF || 'Campo'}\n` +
      `Data: ${property.dataVistoria}\n\n` +
      `*DIAGNÓSTICO:* ${result.status}\n` +
      `Índice de Conformidade: ${result.taxaConformidade}% (${result.totalSim}/${result.totalItens} itens atendidos)\n` +
      `Pendências a ajustar: ${result.totalNao}\n` +
      (result.totalEliminatoriosNao > 0 ? `🚨 Requisitos Críticos Eliminatórios Reprovados: ${result.totalEliminatoriosNao}\n` : '') +
      `\nParecer consultivo emitido com base na IN 56/2007 MAPA e Diretrizes Embrapa Suínos e Aves.\n` +
      `AgroAdrian · Inteligência Zootécnica & Consultoria em Ambiência Avícola.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Parecer AgroAdrian - ${property.nomePropriedade}`,
          text: summaryText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(summaryText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* AgroAdrian Brand Strip */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1b4d3e] text-amber-300 font-black text-sm flex items-center justify-center shadow-xs">
            AA
          </div>
          <div>
            <span className="font-extrabold text-stone-900 text-sm tracking-tight">AgroAdrian</span>
            <span className="text-[11px] text-stone-500 block leading-none">Parecer Consultivo de Viabilidade Avícola</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#1b4d3e] font-semibold bg-[#1b4d3e]/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>IN 56 MAPA / Embrapa</span>
        </div>
      </div>

      {/* 1. Status Banner Principal */}
      <section
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden transition-all print:border print:shadow-none ${
          isTotalmenteViavel
            ? 'bg-linear-to-br from-[#1b5e20] to-[#2e7d32] border-emerald-500'
            : isViavelComAdequacoes
            ? 'bg-linear-to-br from-[#c65102] to-[#e65100] border-amber-500'
            : 'bg-linear-to-br from-[#b71c1c] to-[#c62828] border-red-600'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wider uppercase">
              {isTotalmenteViavel && <CheckCircle2 className="w-4 h-4 text-emerald-200" />}
              {isViavelComAdequacoes && <AlertTriangle className="w-4 h-4 text-amber-200" />}
              {isInviavel && <AlertOctagon className="w-4 h-4 text-red-200" />}
              <span>Parecer Técnico AgroAdrian</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {result.status}
            </h1>

            <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              {result.mensagem}
            </p>
          </div>

          {/* Quick Conformity Circle */}
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0 border border-white/20 min-w-[130px] self-start sm:self-center">
            <span className="text-3xl sm:text-4xl font-black">{result.taxaConformidade}%</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-white/80 mt-0.5">Conformidade</span>
            <span className="text-[11px] text-white/70 font-mono mt-1">{result.totalSim} de {result.totalItens} itens</span>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none blur-xl" />
      </section>

      {/* 2. Property Identification Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-stone-400 block font-medium">Propriedade</span>
            <strong className="text-stone-900 font-bold text-sm truncate block">
              {property.nomePropriedade || 'Propriedade Rural'}
            </strong>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Produtor(a)</span>
            <span className="text-stone-800 font-semibold truncate block">
              {property.nomeProdutor || 'Não informado'}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Município / Lote</span>
            <span className="text-stone-800 font-semibold truncate block">
              {property.municipioUF} · {property.identificadorLote}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Data da Vistoria</span>
            <span className="text-stone-800 font-semibold block">
              {property.dataVistoria}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPropertyModal}
          className="text-xs font-semibold text-[#1b4d3e] hover:text-[#12362b] underline cursor-pointer shrink-0 self-start sm:self-center"
        >
          Editar dados do laudo
        </button>
      </div>

      {/* 3. Executive Metrics Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Verificados */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Itens Totais</span>
            <ClipboardList className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl font-black text-stone-900">{result.totalItens}</div>
          <span className="text-[11px] text-stone-500">Requisitos normativos</span>
        </div>

        {/* Total Aprovados */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Aprovados</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{result.totalSim}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Em total conformidade</span>
        </div>

        {/* Total Adequações / Pendentes */}
        <div className={`rounded-2xl p-4 border shadow-xs ${
          result.totalNao > 0 ? 'bg-amber-50/60 border-amber-300' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between text-amber-900 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Pendentes</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className={`text-2xl font-black ${result.totalNao > 0 ? 'text-amber-800' : 'text-stone-400'}`}>
            {result.totalNao}
          </div>
          <span className="text-[11px] text-stone-500">Exigem adequação</span>
        </div>

        {/* Eliminatórios Não Conformes */}
        <div className={`rounded-2xl p-4 border shadow-xs ${
          result.totalEliminatoriosNao > 0 ? 'bg-red-50 border-red-300' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between text-red-900 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Eliminatórios</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className={`text-2xl font-black ${result.totalEliminatoriosNao > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
            {result.totalEliminatoriosNao}
          </div>
          <span className="text-[11px] text-stone-500">
            {result.totalEliminatoriosNao > 0 ? 'Bloqueio sanitário crítico' : 'Todos os 5 aprovados'}
          </span>
        </div>
      </div>

      {/* 4. Action Buttons Bar (PDF, Print, WhatsApp, Back) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-wrap gap-2.5 sm:gap-3 items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToEdit}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Revisar Respostas</span>
          </button>

          <button
            type="button"
            onClick={onResetEvaluation}
            className="px-3 py-2.5 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            title="Limpar e recomeçar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nova Vistoria</span>
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* WhatsApp / Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedShare ? 'Copiado para Envio!' : 'Compartilhar Parecer'}</span>
          </button>

          {/* Imprimir */}
          <button
            type="button"
            onClick={handlePrint}
            className="hidden md:flex px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs sm:text-sm items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>

          {/* Baixar Parecer Visual PDF */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#1b4d3e] hover:bg-[#153e32] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Gerando Parecer...' : 'Baixar Parecer Visual (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* 5. Painel Gráfico de Viabilidade por Pilar (AgroAdrian Graphic Breakdown) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-bold text-[#1b4d3e] uppercase tracking-wider block">
              Análise Zootécnica & Sanitária
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Desempenho Visual por Pilar de Implantação
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Diretrizes MAPA IN 56/2007 & Ambiência
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {result.pilares.map((p, idx) => {
            const isCritico = p.status === 'BLOQUEIO CRÍTICO';
            const isAjuste = p.status === 'REQUER AJUSTE';

            return (
              <div
                key={p.categoryId}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCritico
                    ? 'bg-red-50/70 border-red-300'
                    : isAjuste
                    ? 'bg-amber-50/60 border-amber-300'
                    : 'bg-emerald-50/40 border-emerald-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded-md border border-stone-200 text-stone-600">
                      Pilar {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate max-w-[150px]">
                      {p.shortName}
                    </h4>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      isCritico
                        ? 'bg-red-200 text-red-950'
                        : isAjuste
                        ? 'bg-amber-200 text-amber-950'
                        : 'bg-emerald-200 text-emerald-950'
                    }`}
                  >
                    {isCritico ? 'Crítico' : isAjuste ? 'Ajustar' : '100% OK'}
                  </span>
                </div>

                {/* Graphical Gauge Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600">
                    <span>{p.sim}/{p.total} itens conformes</span>
                    <span className="font-bold text-stone-900">{p.taxaConformidade}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        isCritico ? 'bg-red-600' : isAjuste ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${p.taxaConformidade}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Navigation Tabs for Diagnostic Details */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('acoes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'acoes'
              ? 'bg-[#1b4d3e] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          <span>Plano de Ação Corretiva</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] ${
            activeTab === 'acoes' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
          }`}>
            {result.itensNaoConformes.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('conformes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'conformes'
              ? 'bg-[#1b4d3e] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          <span>O que está Adequado</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] ${
            activeTab === 'conformes' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {result.itensConformes.length}
          </span>
        </button>
      </div>

      {/* 6. Content Section based on Tab */}
      {activeTab === 'acoes' && (
        <section className="space-y-4">
          {result.itensNaoConformes.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-[#2e7d32] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">
                Nenhuma Não Conformidade Encontrada!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                Parabéns! Todos os 17 requisitos sanitários, ambientais e bioclimáticos foram atendidos pela propriedade. A área está pronta para desenvolvimento do projeto executivo.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                <span>
                  Exibindo {result.itensNaoConformes.length} item(ns) respondidos como <strong>NÃO</strong>:
                </span>
                <span className="font-semibold text-stone-700">
                  Prioridade por Criticidade Normativa
                </span>
              </div>

              {result.itensNaoConformes.map((item, index) => {
                const isElim = item.tipo_criterio === 'ELIMINATORIO';
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isElim
                        ? 'bg-red-50/70 border-red-300 shadow-xs'
                        : 'bg-amber-50/70 border-amber-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                          isElim
                            ? 'bg-red-200 text-red-950 border border-red-300'
                            : 'bg-amber-200 text-amber-950 border border-amber-300'
                        }`}>
                          {isElim ? '🚨 Critério Eliminatório Crítico' : '⚠️ Critério Classificatório / Operacional'}
                        </span>
                        <span className="text-xs font-mono text-stone-600">
                          Item #{index + 1}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-stone-900 font-bold text-sm sm:text-base leading-snug mb-3">
                      {item.pergunta}
                    </h4>

                    {/* Ação Corretiva Destacada */}
                    <div className="bg-white/95 rounded-xl p-4 border border-stone-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-red-800">
                        <AlertOctagon className="w-4 h-4 text-red-600" />
                        <span>Recomendação & Ação Corretiva AgroAdrian:</span>
                      </div>
                      <p className="text-stone-900 text-sm font-semibold leading-relaxed">
                        {item.acao_corretiva_se_nao}
                      </p>
                    </div>

                    {/* Justificativa e dica */}
                    <div className="mt-3 pt-3 border-t border-stone-200/60 text-xs sm:text-[13px] text-stone-600 space-y-2">
                      <p className="leading-relaxed break-words">
                        <strong className="text-stone-800">Fundamentação:</strong> {item.fundamentacao_tecnica}
                      </p>
                      {item.dica_de_campo && (
                        <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed">
                          <span className="shrink-0 select-none">💡</span>
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-amber-900 block xs:inline mr-1">Dica de Campo:</span>
                            <span className="text-stone-700 font-medium break-words">{item.dica_de_campo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {activeTab === 'conformes' && (
        <section className="space-y-3">
          <div className="text-xs text-stone-500 px-1">
            Lista de todos os {result.itensConformes.length} requisitos aprovados no terreno:
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
            {result.itensConformes.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-3 hover:bg-emerald-50/20 transition-colors">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-stone-900 leading-snug">
                    {item.pergunta}
                  </p>
                  <p className="text-xs text-stone-500">
                    {item.fundamentacao_tecnica}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
