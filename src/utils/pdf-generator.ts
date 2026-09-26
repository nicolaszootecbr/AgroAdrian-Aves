import jsPDF from 'jspdf';
import { EvaluationResult, PropertyMetadata, ChecklistDataset } from '../types';

export function generateViabilityPDF(
  result: EvaluationResult,
  property: PropertyMetadata,
  dataset: ChecklistDataset
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 14;

  const getStatusColors = () => {
    if (result.status === 'INVIÁVEL') {
      return { r: 198, g: 40, b: 40, hex: '#C62828', label: 'INVIÁVEL' };
    }
    if (result.status === 'VIÁVEL COM ADEQUAÇÕES') {
      return { r: 230, g: 81, b: 0, hex: '#E65100', label: 'VIÁVEL COM ADEQUAÇÕES' };
    }
    return { r: 46, g: 125, b: 50, hex: '#2E7D32', label: 'TOTALMENTE VIÁVEL' };
  };

  const statusCol = getStatusColors();

  const drawPageFooter = (pageNumber: number) => {
    const footerY = pageHeight - 10;
    doc.setDrawColor(210, 220, 215);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(27, 77, 62);
    doc.text('AgroAdrian', margin, footerY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 110, 105);
    doc.text(' | Inteligência Zootécnica & Consultoria em Ambiência Avícola · Parecer Técnico Consultivo', margin + 18, footerY);

    const pageStr = `Página ${pageNumber}`;
    doc.text(pageStr, pageWidth - margin, footerY, { align: 'right' });
  };

  const drawMiniHeader = () => {
    // Brand strip
    doc.setFillColor(27, 77, 62);
    doc.rect(margin, currentY, contentWidth, 2, 'F');
    currentY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(27, 77, 62);
    doc.text('AgroAdrian · Parecer Técnico de Viabilidade Avícola', margin, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 120, 115);
    doc.text(`${property.nomePropriedade || 'Área Avaliada'} · ${property.dataVistoria}`, pageWidth - margin, currentY, { align: 'right' });
    currentY += 6;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 16) {
      drawPageFooter(doc.internal.pages.length - 1);
      doc.addPage();
      currentY = 14;
      drawMiniHeader();
    }
  };

  // ================= PAGE 1 =================

  // 1. BRAND HEADER BANNER (AgroAdrian Visual Identity)
  doc.setFillColor(27, 77, 62); // #1b4d3e (Verde Floresta Agrotech)
  doc.roundedRect(margin, currentY, contentWidth, 25, 2.5, 2.5, 'F');

  // Decorative accent line (Gold / Lime)
  doc.setFillColor(234, 179, 8); // amber-400
  doc.rect(margin + 5, currentY + 3.5, 3, 18, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('AgroAdrian', margin + 11, currentY + 9.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 235, 215);
  doc.text('INTELIGÊNCIA ZOOTÉCNICA & CONSULTORIA EM AMBIÊNCIA AVÍCOLA', margin + 11, currentY + 14.5);

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('PARECER TÉCNICO DE VIABILIDADE E ADEQUAÇÃO DE TERRENO', margin + 11, currentY + 20.5);

  // Reference Tag on the right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 48, currentY + 4.5, 43, 16, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(27, 77, 62);
  doc.text('NORMATIVA TÉCNICA', pageWidth - margin - 26.5, currentY + 9.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(60, 70, 65);
  doc.text('IN 56/2007 MAPA', pageWidth - margin - 26.5, currentY + 14, { align: 'center' });
  doc.text('Embrapa Suínos e Aves', pageWidth - margin - 26.5, currentY + 17.5, { align: 'center' });

  currentY += 29;

  // 2. PROPERTY & VISTORIA CARD
  doc.setFillColor(248, 246, 240);
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(margin, currentY, contentWidth, 23, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(27, 77, 62);
  doc.text('DADOS DA ÁREA E IDENTIFICAÇÃO DA VISTORIA', margin + 4, currentY + 5.5);

  const colWidth = (contentWidth - 8) / 3;
  const col1X = margin + 4;
  const col2X = col1X + colWidth;
  const col3X = col2X + colWidth;

  // Row 1
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Propriedade / Sítio:', col1X, currentY + 10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.nomePropriedade || 'Propriedade Rural', col1X + 26, currentY + 10.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Produtor(a):', col2X, currentY + 10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.nomeProdutor || 'Não informado', col2X + 17, currentY + 10.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Gleba / Lote:', col3X, currentY + 10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.identificadorLote || 'Gleba Principal', col3X + 18, currentY + 10.5);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Município / UF:', col1X, currentY + 16.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.municipioUF || 'Não informado', col1X + 26, currentY + 16.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Consultor:', col2X, currentY + 16.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.tecnicoAvaliador || 'Consultoria AgroAdrian', col2X + 17, currentY + 16.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(90, 95, 90);
  doc.text('Data Vistoria:', col3X, currentY + 16.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(property.dataVistoria || new Date().toLocaleDateString('pt-BR'), col3X + 18, currentY + 16.5);

  currentY += 27;

  // 3. VISUAL STATUS GAUGE & VERDICT BANNER
  doc.setFillColor(statusCol.r, statusCol.g, statusCol.b);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('DIAGNÓSTICO TÉCNICO AGROADRIAN:', margin + 6, currentY + 6.5);

  doc.setFontSize(14);
  doc.text(result.status, margin + 6, currentY + 13.5);

  // Visual Gauge / Meter inside the status banner
  const gaugeX = pageWidth - margin - 62;
  const gaugeY = currentY + 4;
  const gaugeW = 56;
  const gaugeH = 12;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(gaugeX, gaugeY, gaugeW, gaugeH, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(60, 60, 60);
  doc.text('ÍNDICE DE CONFORMIDADE', gaugeX + 4, gaugeY + 4.5);

  // Progress Bar Graphic
  const barX = gaugeX + 4;
  const barY = gaugeY + 6.5;
  const barW = 34;
  const barH = 3.5;
  const fillW = Math.max(2, (barW * result.taxaConformidade) / 100);

  // Track
  doc.setFillColor(230, 235, 230);
  doc.roundedRect(barX, barY, barW, barH, 1, 1, 'F');

  // Fill
  doc.setFillColor(statusCol.r, statusCol.g, statusCol.b);
  doc.roundedRect(barX, barY, fillW, barH, 1, 1, 'F');

  // Percentage Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(statusCol.r, statusCol.g, statusCol.b);
  doc.text(`${result.taxaConformidade}%`, gaugeX + gaugeW - 4, gaugeY + 9, { align: 'right' });

  currentY += 24;

  // 4. FOUR GRAPHIC METRIC TILES
  const tileGap = 3;
  const tileW = (contentWidth - tileGap * 3) / 4;
  const tileH = 13.5;

  const tiles = [
    { label: 'REQUISITOS TOTAIS', val: String(result.totalItens), sub: 'Normas MAPA/Embrapa', r: 70, g: 75, b: 72 },
    { label: 'CONFORMES (SIM)', val: String(result.totalSim), sub: 'Aprovados no local', r: 46, g: 125, b: 50 },
    { label: 'ADEQUAÇÕES (NÃO)', val: String(result.totalNao), sub: 'Requerem intervenção', r: result.totalNao > 0 ? 230 : 100, g: result.totalNao > 0 ? 81 : 100, b: 0 },
    { label: 'ELIMINATÓRIOS REPROV.', val: String(result.totalEliminatoriosNao), sub: result.totalEliminatoriosNao > 0 ? 'Bloqueio legal crítico' : 'Nenhum bloqueio', r: result.totalEliminatoriosNao > 0 ? 198 : 46, g: result.totalEliminatoriosNao > 0 ? 40 : 125, b: result.totalEliminatoriosNao > 0 ? 40 : 50 }
  ];

  tiles.forEach((t, i) => {
    const tX = margin + i * (tileW + tileGap);
    doc.setFillColor(245, 246, 245);
    doc.setDrawColor(220, 225, 220);
    doc.roundedRect(tX, currentY, tileW, tileH, 1.5, 1.5, 'FD');

    // Indicator top bar
    doc.setFillColor(t.r, t.g, t.b);
    doc.rect(tX + 2, currentY, tileW - 4, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(t.r, t.g, t.b);
    doc.text(t.label, tX + tileW / 2, currentY + 4.5, { align: 'center' });

    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(t.val, tX + tileW / 2, currentY + 9, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(110, 115, 110);
    doc.text(t.sub, tX + tileW / 2, currentY + 12, { align: 'center' });
  });

  currentY += tileH + 4;

  // 5. GRAPHICAL PILLAR BREAKDOWN (Elementos Gráficos por Pilar)
  doc.setFillColor(27, 77, 62);
  doc.rect(margin, currentY, 2.5, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(27, 77, 62);
  doc.text('AVALIAÇÃO GRÁFICA POR PILAR TÉCNICO (MAPA & AMBIÊNCIA AVÍCOLA)', margin + 5, currentY + 5);
  currentY += 9;

  // 2-column grid of 6 pillars with visual progress bars and status pills
  const pColW = (contentWidth - 4) / 2;
  const pH = 9;

  result.pilares.forEach((p, idx) => {
    const colIndex = idx % 2;
    const rowIndex = Math.floor(idx / 2);
    const px = margin + colIndex * (pColW + 4);
    const py = currentY + rowIndex * (pH + 2.5);

    let pR = 46;
    let pG = 125;
    let pB = 50;
    let tag = '100% OK';

    if (p.status === 'BLOQUEIO CRÍTICO') {
      pR = 198;
      pG = 40;
      pB = 40;
      tag = 'CRÍTICO';
    } else if (p.status === 'REQUER AJUSTE') {
      pR = 230;
      pG = 81;
      pB = 0;
      tag = `${p.taxaConformidade}% AJUSTAR`;
    }

    doc.setFillColor(250, 250, 248);
    doc.setDrawColor(225, 225, 220);
    doc.roundedRect(px, py, pColW, pH, 1.2, 1.2, 'FD');

    // Pillar short name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(40, 45, 42);
    doc.text(`${idx + 1}. ${p.shortName}`, px + 3, py + 4);

    // Mini visual bar
    const miniBarX = px + 3;
    const miniBarY = py + 5.5;
    const miniBarW = pColW - 32;
    const miniFillW = Math.max(1, (miniBarW * p.taxaConformidade) / 100);

    doc.setFillColor(220, 225, 220);
    doc.rect(miniBarX, miniBarY, miniBarW, 2, 'F');

    doc.setFillColor(pR, pG, pB);
    doc.rect(miniBarX, miniBarY, miniFillW, 2, 'F');

    // Status pill
    doc.setFillColor(pR, pG, pB);
    doc.roundedRect(px + pColW - 25, py + 2, 22, 5, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(255, 255, 255);
    doc.text(tag, px + pColW - 14, py + 5.5, { align: 'center' });
  });

  currentY += (3 * (pH + 2.5)) + 4;

  // 6. EXECUTIVE RECOMMENDATION STATEMENT
  doc.setFillColor(242, 245, 243);
  doc.setDrawColor(200, 215, 205);
  doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(27, 77, 62);
  doc.text('DIRETRIZ ESTRATÉGICA AGROADRIAN:', margin + 4, currentY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(50, 55, 52);
  const msgLines = doc.splitTextToSize(result.mensagem, contentWidth - 8);
  doc.text(msgLines, margin + 4, currentY + 8.5);

  currentY += 18;

  // 7. PLANO DE AÇÃO & RECOMENDAÇÕES AGROADRIAN (Se houver não conformidades)
  if (result.itensNaoConformes.length > 0) {
    checkPageBreak(25);

    doc.setFillColor(198, 40, 40);
    doc.rect(margin, currentY, 2.5, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(198, 40, 40);
    doc.text(`PLANO DE AÇÃO & RECOMENDAÇÕES CORRETIVAS OBRIGATÓRIAS (${result.itensNaoConformes.length})`, margin + 5, currentY + 5);
    currentY += 8;

    result.itensNaoConformes.forEach((item, index) => {
      const isElim = item.tipo_criterio === 'ELIMINATORIO';
      const questionLines = doc.splitTextToSize(`Item avaliado: "${item.pergunta}"`, contentWidth - 8);
      const actionLines = doc.splitTextToSize(`Recomendação AgroAdrian: ${item.acao_corretiva_se_nao}`, contentWidth - 10);
      const justLines = doc.splitTextToSize(`Fundamentação Zootécnica: ${item.fundamentacao_tecnica}`, contentWidth - 8);

      const blockHeight = 8 + (questionLines.length * 3.3) + (actionLines.length * 3.3) + 7 + (justLines.length * 3.0) + 4;

      checkPageBreak(blockHeight);

      // Card Background
      doc.setFillColor(isElim ? 255 : 255, isElim ? 245 : 248, isElim ? 245 : 240);
      doc.setDrawColor(isElim ? 230 : 240, isElim ? 80 : 150, isElim ? 80 : 50);
      doc.roundedRect(margin, currentY, contentWidth, blockHeight, 1.5, 1.5, 'FD');

      // Tag
      doc.setFillColor(isElim ? 198 : 230, isElim ? 40 : 81, isElim ? 40 : 0);
      doc.roundedRect(margin + 4, currentY + 2.5, isElim ? 48 : 42, 4.5, 1, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(5.8);
      doc.setTextColor(255, 255, 255);
      doc.text(isElim ? 'BLOQUEIO CRÍTICO ELIMINATÓRIO' : 'ADAPTAÇÃO ESTRUTURAL/MANEJO', margin + 6, currentY + 5.7);

      let textY = currentY + 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(30, 30, 30);
      doc.text(questionLines, margin + 4, textY);
      textY += (questionLines.length * 3.3) + 1.5;

      // Highlighted Action Box
      const actBoxH = (actionLines.length * 3.3) + 4;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(isElim ? 230 : 240, isElim ? 100 : 160, isElim ? 100 : 60);
      doc.roundedRect(margin + 4, textY, contentWidth - 8, actBoxH, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(isElim ? 180 : 190, isElim ? 30 : 70, isElim ? 30 : 0);
      doc.text(actionLines, margin + 6, textY + 3.8);
      textY += actBoxH + 2;

      // Justification
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.3);
      doc.setTextColor(90, 95, 90);
      doc.text(justLines, margin + 4, textY);

      currentY += blockHeight + 3;
    });
  }

  // 8. VOCAÇÃO & PONTOS FORTES CONFIRMADOS (Clean Graphic Checklist)
  if (result.itensConformes.length > 0) {
    checkPageBreak(30);

    doc.setFillColor(46, 125, 50);
    doc.rect(margin, currentY, 2.5, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(46, 125, 50);
    doc.text(`PONTOS FORTES E VOCAÇÃO SANITÁRIA IDENTIFICADA (${result.itensConformes.length})`, margin + 5, currentY + 5);
    currentY += 8;

    // Render conformities in clean 2-column or clean bullet rows
    const cColW = (contentWidth - 4) / 2;

    for (let i = 0; i < result.itensConformes.length; i += 2) {
      const item1 = result.itensConformes[i];
      const item2 = result.itensConformes[i + 1];

      const t1 = doc.splitTextToSize(item1.pergunta, cColW - 12);
      const t2 = item2 ? doc.splitTextToSize(item2.pergunta, cColW - 12) : [];
      const rowLines = Math.max(t1.length, t2.length);
      const rowHeight = Math.max(6.5, rowLines * 3.0 + 2);

      checkPageBreak(rowHeight + 2);

      // Col 1
      // Draw green check badge
      doc.setFillColor(235, 245, 238);
      doc.setDrawColor(180, 220, 190);
      doc.roundedRect(margin, currentY, 6, 4.5, 0.8, 0.8, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(5.5);
      doc.setTextColor(46, 125, 50);
      doc.text('OK', margin + 3, currentY + 3.2, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(50, 55, 50);
      doc.text(t1, margin + 8, currentY + 3.2);

      // Col 2
      if (item2) {
        const c2X = margin + cColW + 4;
        doc.setFillColor(235, 245, 238);
        doc.setDrawColor(180, 220, 190);
        doc.roundedRect(c2X, currentY, 6, 4.5, 0.8, 0.8, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.5);
        doc.setTextColor(46, 125, 50);
        doc.text('OK', c2X + 3, currentY + 3.2, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(50, 55, 50);
        doc.text(t2, c2X + 8, currentY + 3.2);
      }

      currentY += rowHeight;
    }
  }

  // Draw footer on the final page
  drawPageFooter(doc.internal.pages.length - 1);

  // Save PDF
  const cleanName = (property.nomePropriedade || 'laudo-avicola')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
  const filename = `parecer-viabilidade-agroadrian-${cleanName}-${Date.now().toString().slice(-4)}.pdf`;
  doc.save(filename);
}
