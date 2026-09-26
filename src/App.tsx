import React, { useState, useEffect, useRef } from 'react';
import { CHECKLIST_DATA } from './data/checklist-data';
import { AnswerValue, ChecklistCategory, ChecklistItem, PropertyMetadata } from './types';
import { calculateEvaluation, findUnansweredItems } from './utils/evaluation';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { TechnicalHelpModal } from './components/TechnicalHelpModal';
import { PropertyModal } from './components/PropertyModal';
import { DiagnosticScreen } from './components/DiagnosticScreen';
import { SessionRecoveryBanner } from './components/SessionRecoveryBanner';
import { TestModeToolbar } from './components/TestModeToolbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  Building,
  Layers,
  ListOrdered
} from 'lucide-react';

const STORAGE_KEY_ANSWERS = 'checklist_avicola_answers_v1';
const STORAGE_KEY_PROPERTY = 'checklist_avicola_property_v1';

const INITIAL_PROPERTY: PropertyMetadata = {
  nomePropriedade: 'Sítio Recanto das Aves',
  nomeProdutor: 'Carlos Eduardo Mendes',
  municipioUF: 'Chapecó - SC',
  identificadorLote: 'Gleba Sul 02',
  tecnicoAvaliador: 'Consultor AgroAdrian / Zootecnista',
  dataVistoria: new Date().toLocaleDateString('pt-BR'),
  observacoesGerais: 'Terreno com boa acessibilidade para caminhões pesados de ração e aves vivas.',
};

export default function App() {
  const dataset = CHECKLIST_DATA;
  const allItemsList = dataset.categorias.flatMap((cat) => cat.itens);
  const totalQuestions = allItemsList.length;

  // State
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [property, setProperty] = useState<PropertyMetadata>(INITIAL_PROPERTY);
  const [currentPillarId, setCurrentPillarId] = useState<string>('all'); // 'all' or category id
  const [activeHelpItem, setActiveHelpItem] = useState<ChecklistItem | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isDiagnosticView, setIsDiagnosticView] = useState(false);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [missingItemIds, setMissingItemIds] = useState<string[]>([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);
      const savedProperty = localStorage.getItem(STORAGE_KEY_PROPERTY);

      if (savedProperty) {
        setProperty(JSON.parse(savedProperty));
      }

      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        const count = Object.keys(parsedAnswers).length;
        if (count > 0) {
          setAnswers(parsedAnswers);
          setShowRecoveryBanner(true);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos do localStorage:', e);
    }
  }, []);

  // Save answers to LocalStorage on change
  const handleAnswer = (itemId: string, value: AnswerValue) => {
    const updated = { ...answers, [itemId]: value };
    setAnswers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Falha ao gravar no localStorage:', e);
    }

    // Remove from missing highlights if answered
    if (missingItemIds.includes(itemId)) {
      setMissingItemIds((prev) => prev.filter((id) => id !== itemId));
    }
  };

  // Save property metadata
  const handleSaveProperty = (updated: PropertyMetadata) => {
    setProperty(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROPERTY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Falha ao gravar propriedade no localStorage:', e);
    }
  };

  // Count answered
  const answeredCount = Object.keys(answers).length;
  const isFullyAnswered = answeredCount === totalQuestions;

  // Validation before opening diagnostic
  const handleOpenDiagnostic = () => {
    const missing = findUnansweredItems(dataset, answers);
    if (missing.length > 0) {
      const missingIds = missing.map((m) => m.itemId);
      setMissingItemIds(missingIds);

      // Scroll to the first missing item
      const firstMissing = missing[0];
      // Switch pillar if necessary
      if (currentPillarId !== 'all' && currentPillarId !== firstMissing.categoryId) {
        setCurrentPillarId(firstMissing.categoryId);
      }

      setTimeout(() => {
        const el = document.getElementById(`question-${firstMissing.itemId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      setFeedbackToast(`Atenção: Existem ${missing.length} pergunta(s) pendente(s) de resposta para concluir a análise.`);
      setTimeout(() => setFeedbackToast(null), 4000);
      return;
    }

    // All answered, view diagnostic
    setMissingItemIds([]);
    setIsDiagnosticView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset confirmation
  const confirmReset = () => {
    setAnswers({});
    setShowRecoveryBanner(false);
    setIsDiagnosticView(false);
    setMissingItemIds([]);
    setShowResetModal(false);
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    setFeedbackToast('Checklist reiniciado com sucesso.');
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  // Mock QA Scenarios
  const handleTestVerde = () => {
    const mock: Record<string, AnswerValue> = {};
    allItemsList.forEach((item) => {
      mock[item.id] = 'SIM';
    });
    setAnswers(mock);
    setShowRecoveryBanner(false);
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(mock));
    setIsDiagnosticView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestLaranja = () => {
    const mock: Record<string, AnswerValue> = {};
    allItemsList.forEach((item) => {
      // Mark 2 classificatory items as NAO
      if (item.id === 'item_1_2' || item.id === 'item_2_2') {
        mock[item.id] = 'NAO';
      } else {
        mock[item.id] = 'SIM';
      }
    });
    setAnswers(mock);
    setShowRecoveryBanner(false);
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(mock));
    setIsDiagnosticView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestVermelho = () => {
    const mock: Record<string, AnswerValue> = {};
    allItemsList.forEach((item) => {
      // Mark critical eliminatory (outorga de água) as NAO
      if (item.id === 'item_5_1') {
        mock[item.id] = 'NAO';
      } else {
        mock[item.id] = 'SIM';
      }
    });
    setAnswers(mock);
    setShowRecoveryBanner(false);
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(mock));
    setIsDiagnosticView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Evaluation calculation
  const evaluationResult = calculateEvaluation(dataset, answers);

  // Active categories to display
  const categoriesToDisplay = currentPillarId === 'all'
    ? dataset.categorias
    : dataset.categorias.filter((cat) => cat.id === currentPillarId);

  // Navigation helpers for Pillar mode
  const currentCategoryIndex = dataset.categorias.findIndex((cat) => cat.id === currentPillarId);
  const hasPreviousPillar = currentCategoryIndex > 0;
  const hasNextPillar = currentCategoryIndex >= 0 && currentCategoryIndex < dataset.categorias.length - 1;

  const goToNextPillar = () => {
    if (hasNextPillar) {
      setCurrentPillarId(dataset.categorias[currentCategoryIndex + 1].id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const goToPreviousPillar = () => {
    if (hasPreviousPillar) {
      setCurrentPillarId(dataset.categorias[currentCategoryIndex - 1].id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f5f3ec] text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Agrotech Sticky Header */}
        <Header
          property={property}
          answeredCount={answeredCount}
          totalCount={totalQuestions}
          onOpenPropertyModal={() => setIsPropertyModalOpen(true)}
          onResetEvaluation={() => setShowResetModal(true)}
          isDiagnosticView={isDiagnosticView}
          onBackToQuestions={() => setIsDiagnosticView(false)}
        />

        {/* Floating Toast Notification */}
        {feedbackToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-stone-900 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-xl flex items-center gap-2 max-w-[90vw] animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Recovery Banner */}
          {showRecoveryBanner && !isDiagnosticView && (
            <div className="mb-6">
              <SessionRecoveryBanner
                savedAnswersCount={answeredCount}
                totalCount={totalQuestions}
                propertyName={property.nomePropriedade}
                onContinue={() => setShowRecoveryBanner(false)}
                onClear={confirmReset}
              />
            </div>
          )}

          {/* View Switch: Diagnostic Screen vs Survey Collection Screen */}
          {isDiagnosticView ? (
            <DiagnosticScreen
              result={evaluationResult}
              property={property}
              dataset={dataset}
              onBackToEdit={() => {
                setIsDiagnosticView(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onResetEvaluation={() => setShowResetModal(true)}
              onOpenPropertyModal={() => setIsPropertyModalOpen(true)}
            />
          ) : (
            <div className="space-y-6">
              {/* Introduction Card */}
              <section className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#1b4d3e] uppercase tracking-wider block">
                      Vistoria Técnica de Campo
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                      Avaliação de Viabilidade do Terreno
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                      Responda <strong>[ SIM ]</strong> ou <strong>[ NÃO ]</strong> para cada item. Critérios com a etiqueta <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-sm border border-red-200">Eliminatório</span> são exigências legais ou biológicas críticas da IN 56/MAPA que inviabilizam o projeto se desatendidos.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsPropertyModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Building className="w-3.5 h-3.5 text-[#1b4d3e]" />
                      <span>Dados do Lote</span>
                    </button>
                  </div>
                </div>

                {/* Pillar Filter Bar (Mobile-friendly tabs / segmented control) */}
                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#1b4d3e]" />
                      Navegar por Pilares de Avaliação:
                    </span>
                    <span className="text-stone-400 font-normal">
                      Toque para filtrar
                    </span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setCurrentPillarId('all')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                        currentPillarId === 'all'
                          ? 'bg-[#1b4d3e] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                      <span>Ver Todos ({totalQuestions})</span>
                    </button>

                    {dataset.categorias.map((cat, idx) => {
                      const catTotal = cat.itens.length;
                      const catAnswered = cat.itens.filter((item) => answers[item.id]).length;
                      const isCatComplete = catAnswered === catTotal;
                      const isSelected = currentPillarId === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCurrentPillarId(cat.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#1b4d3e] text-white shadow-xs'
                              : isCatComplete
                              ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-300'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {isCatComplete ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                          )}
                          <span>Pilar {idx + 1}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {catAnswered}/{catTotal}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Questions Groups by Pillar */}
              <div className="space-y-6">
                {categoriesToDisplay.map((cat, catIdx) => {
                  const actualCatIndex = dataset.categorias.findIndex((c) => c.id === cat.id);
                  const catAnswered = cat.itens.filter((item) => answers[item.id]).length;
                  const catTotal = cat.itens.length;
                  const isCatDone = catAnswered === catTotal;

                  return (
                    <div
                      key={cat.id}
                      className="bg-white/70 rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-2xs space-y-4"
                    >
                      {/* Category Header */}
                      <div className="border-b border-stone-200/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                              PILAR #{actualCatIndex + 1}
                            </span>
                            {isCatDone && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                <Check className="w-3 h-3" />
                                Concluído
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">
                            {cat.nome}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {cat.descricao}
                          </p>
                        </div>

                        <span className="text-xs font-mono font-bold text-stone-500 shrink-0 self-start sm:self-center">
                          {catAnswered} de {catTotal} respondidas
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3.5">
                        {cat.itens.map((item, qIdx) => (
                          <QuestionCard
                            key={item.id}
                            item={item}
                            categoryIndex={actualCatIndex}
                            questionIndex={qIdx}
                            currentAnswer={answers[item.id]}
                            isHighlightedMissing={missingItemIds.includes(item.id)}
                            onAnswer={handleAnswer}
                            onOpenHelp={(it) => setActiveHelpItem(it)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pillar Step Navigation (if in single pillar mode) */}
              {currentPillarId !== 'all' && (
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={goToPreviousPillar}
                    disabled={!hasPreviousPillar}
                    className="px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Pilar Anterior</span>
                  </button>

                  {hasNextPillar ? (
                    <button
                      type="button"
                      onClick={goToNextPillar}
                      className="px-5 py-2.5 bg-[#1b4d3e] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#153e32] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Próximo Pilar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenDiagnostic}
                      className="px-5 py-2.5 bg-[#2e7d32] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#256629] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Finalizar e Ver Diagnóstico</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Bottom Sticky Action Bar: Calculate & View Diagnostic */}
              <div className="sticky bottom-4 z-30 pt-4">
                <div className="bg-[#1b4d3e] text-white rounded-2xl p-4 shadow-xl border border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isFullyAnswered ? 'bg-[#2e7d32] text-white' : 'bg-white/10 text-white'
                    }`}>
                      {isFullyAnswered ? <CheckCircle2 className="w-6 h-6" /> : <ListOrdered className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        {isFullyAnswered
                          ? 'Todas as perguntas foram respondidas!'
                          : `Restam ${totalQuestions - answeredCount} pergunta(s) para responder`}
                      </div>
                      <div className="text-xs text-emerald-200/80">
                        {isFullyAnswered
                          ? 'Clique ao lado para emitir o parecer técnico AgroAdrian de viabilidade.'
                          : 'Responda todos os itens para liberar o parecer de viabilidade.'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenDiagnostic}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md ${
                      isFullyAnswered
                        ? 'bg-[#2e7d32] hover:bg-[#256629] text-white ring-2 ring-emerald-300 ring-offset-2 ring-offset-[#1b4d3e]'
                        : 'bg-white text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <span>{isFullyAnswered ? 'Ver Parecer AgroAdrian' : 'Conferir e Emitir Parecer'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Test Mode QA Toolbar */}
              <TestModeToolbar
                onTestVerde={handleTestVerde}
                onTestLaranja={handleTestLaranja}
                onTestVermelho={handleTestVermelho}
              />
            </div>
          )}
        </main>

        {/* Technical Help Modal */}
        <TechnicalHelpModal
          item={activeHelpItem}
          onClose={() => setActiveHelpItem(null)}
        />

        {/* Property Metadata Drawer/Modal */}
        <PropertyModal
          isOpen={isPropertyModalOpen}
          property={property}
          onSave={handleSaveProperty}
          onClose={() => setIsPropertyModalOpen(false)}
        />

        {/* Reset Confirmation Dialog */}
        {showResetModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setShowResetModal(false)}
          >
            <div
              className="bg-white rounded-2xl max-w-sm w-full p-5 text-stone-900 space-y-4 border border-stone-300 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-11 h-11 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 id="reset-modal-title" className="text-base font-bold text-stone-900">
                  Reiniciar Avaliação de Campo?
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Todas as respostas selecionadas nesta sessão serão apagadas da memória do dispositivo. Essa ação não pode ser desfeita.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmReset}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Sim, Reiniciar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
