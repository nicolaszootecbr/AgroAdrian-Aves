export type CriterionType = 'ELIMINATORIO' | 'CLASSIFICATORIO' | 'OPERACIONAL';

export type AnswerValue = 'SIM' | 'NAO';

export type EvaluationStatus = 'TOTALMENTE VIÁVEL' | 'VIÁVEL COM ADEQUAÇÕES' | 'INVIÁVEL';

export interface ChecklistItem {
  id: string;
  pergunta: string;
  tipo_criterio: CriterionType;
  opcoes_resposta: AnswerValue[];
  fundamentacao_tecnica: string;
  acao_corretiva_se_nao: string;
  dica_de_campo?: string;
  referencia_normativa?: string;
}

export interface ChecklistCategory {
  id: string;
  nome: string;
  descricao: string;
  itens: ChecklistItem[];
}

export interface ChecklistMeta {
  titulo: string;
  versao: string;
  finalidade: string;
  normativa_referencia: string;
  foco_producao: string;
}

export interface ChecklistDataset {
  meta: ChecklistMeta;
  categorias: ChecklistCategory[];
}

export interface PropertyMetadata {
  nomePropriedade: string;
  nomeProdutor: string;
  municipioUF: string;
  identificadorLote: string;
  tecnicoAvaliador: string;
  dataVistoria: string;
  observacoesGerais: string;
}

export interface PillarResult {
  categoryId: string;
  categoryName: string;
  shortName: string;
  total: number;
  sim: number;
  nao: number;
  eliminatoriosNao: number;
  taxaConformidade: number;
  status: 'TOTALMENTE ADEQUADO' | 'REQUER AJUSTE' | 'BLOQUEIO CRÍTICO';
}

export interface EvaluationResult {
  status: EvaluationStatus;
  statusColor: string;
  statusBg: string;
  statusBorder: string;
  tituloCurto: string;
  mensagem: string;
  totalItens: number;
  totalRespondidos: number;
  totalSim: number;
  totalNao: number;
  totalEliminatoriosNao: number;
  totalClassificatoriosNao: number;
  totalOperacionaisNao: number;
  taxaConformidade: number;
  itensNaoConformes: ChecklistItem[];
  itensConformes: ChecklistItem[];
  pilares: PillarResult[];
}
