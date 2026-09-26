import { AnswerValue, ChecklistDataset, ChecklistItem, EvaluationResult, EvaluationStatus } from '../types';

export function calculateEvaluation(
  dataset: ChecklistDataset,
  answers: Record<string, AnswerValue>
): EvaluationResult {
  const allItems: ChecklistItem[] = [];
  dataset.categorias.forEach((cat) => {
    cat.itens.forEach((item) => allItems.push(item));
  });

  const totalItens = allItems.length;
  let totalRespondidos = 0;
  let totalSim = 0;
  let totalNao = 0;
  let totalEliminatoriosNao = 0;
  let totalClassificatoriosNao = 0;
  let totalOperacionaisNao = 0;

  const itensNaoConformes: ChecklistItem[] = [];
  const itensConformes: ChecklistItem[] = [];

  allItems.forEach((item) => {
    const ans = answers[item.id];
    if (ans) {
      totalRespondidos++;
      if (ans === 'SIM') {
        totalSim++;
        itensConformes.push(item);
      } else if (ans === 'NAO') {
        totalNao++;
        itensNaoConformes.push(item);
        if (item.tipo_criterio === 'ELIMINATORIO') {
          totalEliminatoriosNao++;
        } else if (item.tipo_criterio === 'CLASSIFICATORIO') {
          totalClassificatoriosNao++;
        } else if (item.tipo_criterio === 'OPERACIONAL') {
          totalOperacionaisNao++;
        }
      }
    }
  });

  const taxaConformidade = totalItens > 0 ? Math.round((totalSim / totalItens) * 100) : 0;

  let status: EvaluationStatus = 'TOTALMENTE VIÁVEL';
  let statusColor = '#2E7D32';
  let statusBg = 'bg-emerald-50 text-emerald-950 border-emerald-300';
  let statusBorder = 'border-emerald-600';
  let tituloCurto = 'Área Totalmente Viável';
  let mensagem = 'O terreno atende 100% dos requisitos normativos, sanitários e bioclimáticos estabelecidos pela IN 56/MAPA e Embrapa. A área está apta para início do projeto executivo e tramitação das licenças.';

  if (totalEliminatoriosNao > 0) {
    status = 'INVIÁVEL';
    statusColor = '#C62828';
    statusBg = 'bg-red-50 text-red-950 border-red-300';
    statusBorder = 'border-red-600';
    tituloCurto = 'Área Inviável para Instalação';
    mensagem = `Constatado(s) ${totalEliminatoriosNao} ponto(s) crítico(s) de caráter ELIMINATÓRIO em desacordo. Não é recomendado prosseguir com investimentos na coordenada atual até que os impedimentos legais/sanitários sejam superados ou um novo sítio seja avaliado.`;
  } else if (totalNao > 0) {
    status = 'VIÁVEL COM ADEQUAÇÕES';
    statusColor = '#E65100';
    statusBg = 'bg-amber-50 text-amber-950 border-amber-300';
    statusBorder = 'border-amber-600';
    tituloCurto = 'Viável Condicionado a Adequações';
    mensagem = `Os requisitos críticos eliminatórios foram atendidos com êxito. Entretanto, existem ${totalNao} ponto(s) classificatório(s)/operacional(is) que requerem obras de engenharia, terraplanagem ou manejo antes do alojamento do lote comercial.`;
  }

  const pilares = dataset.categorias.map((cat, idx) => {
    const shortNames = [
      'Biosseguridade & Distanciamento',
      'Topografia, Solo & Drenagem',
      'Orientação Solar & Bioclima',
      'Ventilação & Espaçamento',
      'Água & Energia (Insumos)',
      'Dimensionamento & Densidade'
    ];
    let catSim = 0;
    let catNao = 0;
    let catElimNao = 0;
    cat.itens.forEach((item) => {
      const a = answers[item.id];
      if (a === 'SIM') catSim++;
      if (a === 'NAO') {
        catNao++;
        if (item.tipo_criterio === 'ELIMINATORIO') catElimNao++;
      }
    });
    const taxa = cat.itens.length > 0 ? Math.round((catSim / cat.itens.length) * 100) : 0;
    let pStatus: 'TOTALMENTE ADEQUADO' | 'REQUER AJUSTE' | 'BLOQUEIO CRÍTICO' = 'TOTALMENTE ADEQUADO';
    if (catElimNao > 0) {
      pStatus = 'BLOQUEIO CRÍTICO';
    } else if (catNao > 0) {
      pStatus = 'REQUER AJUSTE';
    }

    return {
      categoryId: cat.id,
      categoryName: cat.nome,
      shortName: shortNames[idx] || cat.nome,
      total: cat.itens.length,
      sim: catSim,
      nao: catNao,
      eliminatoriosNao: catElimNao,
      taxaConformidade: taxa,
      status: pStatus
    };
  });

  return {
    status,
    statusColor,
    statusBg,
    statusBorder,
    tituloCurto,
    mensagem,
    totalItens,
    totalRespondidos,
    totalSim,
    totalNao,
    totalEliminatoriosNao,
    totalClassificatoriosNao,
    totalOperacionaisNao,
    taxaConformidade,
    itensNaoConformes,
    itensConformes,
    pilares
  };
}

export function findUnansweredItems(
  dataset: ChecklistDataset,
  answers: Record<string, AnswerValue>
): { itemId: string; categoryId: string; item: ChecklistItem }[] {
  const missing: { itemId: string; categoryId: string; item: ChecklistItem }[] = [];
  dataset.categorias.forEach((cat) => {
    cat.itens.forEach((item) => {
      if (!answers[item.id]) {
        missing.push({ itemId: item.id, categoryId: cat.id, item });
      }
    });
  });
  return missing;
}
