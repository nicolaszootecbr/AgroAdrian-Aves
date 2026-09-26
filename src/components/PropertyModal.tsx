import React, { useState, useEffect } from 'react';
import { PropertyMetadata } from '../types';
import { X, Building2, User, MapPin, Hash, UserCheck, Calendar, FileText, Check } from 'lucide-react';

interface PropertyModalProps {
  isOpen: boolean;
  property: PropertyMetadata;
  onSave: (updated: PropertyMetadata) => void;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  isOpen,
  property,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<PropertyMetadata>(property);

  useEffect(() => {
    setForm(property);
  }, [property, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#faf8f4] text-stone-900 rounded-2xl shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1b4d3e]/10 text-[#1b4d3e]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="property-modal-title" className="text-base font-bold text-stone-900">
                Dados da Propriedade e Vistoria
              </h3>
              <p className="text-xs text-stone-500">
                Essas informações constarão no cabeçalho do parecer visual AgroAdrian.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Nome da Propriedade */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Nome da Propriedade / Fazenda
              </label>
              <input
                type="text"
                required
                value={form.nomePropriedade}
                onChange={(e) => setForm({ ...form, nomePropriedade: e.target.value })}
                placeholder="Ex: Fazenda Boa Esperança - Sítio São José"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Produtor / Proprietário */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Nome do Produtor / Titular
              </label>
              <input
                type="text"
                value={form.nomeProdutor}
                onChange={(e) => setForm({ ...form, nomeProdutor: e.target.value })}
                placeholder="Ex: João Carlos da Silva"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Município e UF */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Município / UF
              </label>
              <input
                type="text"
                value={form.municipioUF}
                onChange={(e) => setForm({ ...form, municipioUF: e.target.value })}
                placeholder="Ex: Chapecó - SC"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Lote / Piquete */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Identificador do Lote / Piquete
              </label>
              <input
                type="text"
                value={form.identificadorLote}
                onChange={(e) => setForm({ ...form, identificadorLote: e.target.value })}
                placeholder="Ex: Gleba 03 - Setor Norte"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Técnico Avaliador */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Técnico / Consultor Responsável
              </label>
              <input
                type="text"
                value={form.tecnicoAvaliador}
                onChange={(e) => setForm({ ...form, tecnicoAvaliador: e.target.value })}
                placeholder="Ex: Eng. Agrônomo Marcos Santos"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Data da Vistoria */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Data da Avaliação de Campo
              </label>
              <input
                type="text"
                value={form.dataVistoria}
                onChange={(e) => setForm({ ...form, dataVistoria: e.target.value })}
                placeholder="DD/MM/AAAA"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400"
              />
            </div>

            {/* Observações Gerais */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Observações de Campo Adicionais
              </label>
              <textarea
                rows={2}
                value={form.observacoesGerais}
                onChange={(e) => setForm({ ...form, observacoesGerais: e.target.value })}
                placeholder="Ex: Estrada com bom cascalhamento; rede de energia com transformador dedicado a 200m."
                className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4d3e] focus:border-transparent placeholder:text-stone-400 resize-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-medium text-sm rounded-xl hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1b4d3e] text-white font-semibold text-sm rounded-xl hover:bg-[#153e32] active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Salvar Dados
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
