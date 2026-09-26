import { ChecklistDataset } from '../types';

export const CHECKLIST_DATA: ChecklistDataset = {
  meta: {
    titulo: "Checklist de Avaliação de Viabilidade de Terreno para Aviário de Frangos de Corte",
    versao: "1.0",
    finalidade: "Avaliação técnica, sanitária e bioclimática em campo para verificação de viabilidade de implantação de galpões de frangos de corte comercial.",
    normativa_referencia: "IN 56/2007 MAPA e Diretrizes de Bioclimatologia Avícola (Embrapa)",
    foco_producao: "Frangos de Corte Comercial (Não aplicável a Matrizes ou Poedeiras)"
  },
  categorias: [
    {
      id: "cat_1",
      nome: "Pilar 1: Biosseguridade e Distanciamento Sanitário",
      descricao: "Verificação de distâncias mínimas de segurança sanitária em relação a focos de contaminação e vetores de patógenos (Normativa MAPA).",
      itens: [
        {
          id: "item_1_1",
          pergunta: "O local possui distanciamento mínimo de 3 km de outros estabelecimentos avícolas (reprodução, matrizes), abatedouros ou fábricas de ração?",
          tipo_criterio: "ELIMINATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Afastamento exigido pela IN 56/MAPA para prevenir a transmissão aerógena de patógenos de alto impacto como Influenza Aviária e Doença de Newcastle.",
          acao_corretiva_se_nao: "Inviabilidade sanitária estrita. É obrigatório selecionar outra área da propriedade que respeite o raio ou escolher outro imóvel rural fora do raio de 3 km de risco sanitário.",
          dica_de_campo: "Utilize o GPS ou Google Earth no celular para medir em linha reta o raio de 3 km até a granja, incubatório ou abatedouro mais próximo antes de iniciar as obras.",
          referencia_normativa: "IN 56/2007 MAPA - Art. 4º"
        },
        {
          id: "item_1_2",
          pergunta: "O local respeita o afastamento mínimo de estradas e rodovias (100 m a 500 m, dependendo do fluxo e tipo de via)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Minimiza a exposição das aves à poeira, ruídos intensos e potenciais patógenos veiculados pelo trânsito de caminhões de aves vivas e carcaças.",
          acao_corretiva_se_nao: "Recuar a posição de construção do galpão no terreno ou implantar barreira vegetal densa (cinturão verde com eucalipto/sansão-do-campo) entre a estrada e o aviário.",
          dica_de_campo: "Estradas vicinais de terra com poeira exigem barreira vegetal dupla; rodovias asfaltadas de grande circulação exigem recuo de pelo menos 300 a 500 metros.",
          referencia_normativa: "Manual de Boas Práticas Embrapa Suínos e Aves"
        },
        {
          id: "item_1_3",
          pergunta: "O local do galpão mantém distância mínima dos limites periféricos da propriedade (30 m para granjas comerciais)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Garante zona de amortecimento sanitário e previne interferências de pulverizações agrícolas, queimadas ou ruídos de propriedades vizinhas.",
          acao_corretiva_se_nao: "Reorganizar o layout da propriedade para afastar o galpão das divisas ou pactuar faixa formal de servidão/isolamento com os confinantes.",
          dica_de_campo: "Verifique a cerca de divisa com trena ou GPS. Além dos 30 metros, certifique-se de que o vizinho não possui culturas com pulverização aérea frequente.",
          referencia_normativa: "IN 56/2007 MAPA"
        },
        {
          id: "item_1_4",
          pergunta: "Há espaço físico disponível para instalação de cerca de isolamento de no mínimo 1 m de altura, com recuo de pelo menos 5 m do galpão?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "A cerca impede o acesso de animais domésticos (cães, gatos), animais silvestres e pessoas não autorizadas ao perímetro imediato do galpão.",
          acao_corretiva_se_nao: "Redimensionar a área externa e prever a instalação de cerca perimetral com mureta/tela e tela passarinheira de malha 1 polegada (2,54 cm) em todas as aberturas.",
          dica_de_campo: "A cerca deve contornar todo o galpão com portão trancável e placas de 'Acesso Restrito - Biosseguridade'.",
          referencia_normativa: "IN 56/2007 MAPA"
        },
        {
          id: "item_1_5",
          pergunta: "A topografia da entrada permite a instalação de arco de desinfecção/rodilúvio para veículos e vestiário de barreira sanitária?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Garante a desinfecção obrigatória de caminhões de ração/aves e a troca de vestimenta/calçados (área suja / área limpa) com pedilúvio para operadores.",
          acao_corretiva_se_nao: "Adequar a terraplanagem do acesso principal para criação de ponto único de controle de entrada sanitária com rampa e escoamento adequado de efluentes.",
          dica_de_campo: "O rodilúvio precisa ter profundidade para molhar todo o rodado do caminhão e possuir cobertura para evitar que a chuva dilua a solução desinfetante.",
          referencia_normativa: "IN 56/2007 MAPA"
        }
      ]
    },
    {
      id: "cat_2",
      nome: "Pilar 2: Topografia, Solo e Drenagem",
      descricao: "Avaliação do relevo, escoamento de águas pluviais e estabilidade do solo para construção civil.",
      itens: [
        {
          id: "item_2_1",
          pergunta: "O terreno é plano ou com declividade suave (1% a 3%), livre de risco de alagamento ou enxurradas?",
          tipo_criterio: "ELIMINATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Evita inundação da área do aviário, umidade excessiva na cama de frango e acúmulo de água parada que atrai vetores de doenças e roedores.",
          acao_corretiva_se_nao: "Realizar obras robustas de drenagem profunda, canais de desvio de água pluvial (valas de coroamento) ou selecionar platô mais elevado na propriedade.",
          dica_de_campo: "Observe marcas históricas de enchentes na vegetação vizinha e consulte moradores antigos sobre o comportamento do terreno em chuvas torrenciais.",
          referencia_normativa: "Manual de Engenharia e Ambiência Avícola"
        },
        {
          id: "item_2_2",
          pergunta: "O local permite a elevação do piso do aviário em pelo menos 20 cm acima do nível do solo adjacente?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Impede a infiltração lateral de umidade para a cama do aviário durante chuvas torrenciais, mantendo o ambiente seco e livre de amônia excessiva.",
          acao_corretiva_se_nao: "Executar aterro compactado de boa qualidade com saibro/cascalho para construção do contrapiso elevado em pelo menos 20 cm antes da edificação.",
          dica_de_campo: "A mureta lateral de alvenaria deve ter entre 20 e 30 cm de altura e o piso interno deve ser sempre mais alto que o terreno externo circundante.",
          referencia_normativa: "Recomendações Construtivas Embrapa"
        },
        {
          id: "item_2_3",
          pergunta: "O local está fora de fundos de vale, grotas ou depressões profundas?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Fundos de vale acumulam ar frio e úmido durante a noite (inversão térmica), dificultam a dispersão de amônia e podem sofrer com rajadas de vento afuniladas.",
          acao_corretiva_se_nao: "Mover a implantação para a meia-encosta ou topo de elevação suave, garantindo melhor dissipação térmica natural.",
          dica_de_campo: "Áreas de meia-encosta com exposição ao sol da manhã e boa ventilação transversal são as mais recomendadas em regiões quentes.",
          referencia_normativa: "Bioclimatologia Zootécnica"
        }
      ]
    },
    {
      id: "cat_3",
      nome: "Pilar 3: Orientação Solar e Bioclimatologia",
      descricao: "Adequação do alinhamento do galpão para minimização do estresse térmico por radiação solar direta.",
      itens: [
        {
          id: "item_3_1",
          pergunta: "O terreno permite orientar o eixo longitudinal do galpão rigorosamente no sentido Leste-Oeste?",
          tipo_criterio: "ELIMINATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "A orientação Leste-Oeste faz com que os raios solares incidam na cumeeira nas horas mais quentes do dia e não penetrem diretamente pelas laterais do galpão.",
          acao_corretiva_se_nao: "Caso o terreno imponha desvio máximo tolerável de até 15°, compensar obrigatoriamente com beirais mais largos (1,2m a 1,5m), fechamento de oitões e cortinas/tijolos refletivos.",
          dica_de_campo: "Use o aplicativo de bússola do celular: o comprimento do galpão deve apontar para onde o sol nasce (Leste ~90°) e se põe (Oeste ~270°).",
          referencia_normativa: "Manual de Ambiência Avícola Embrapa"
        },
        {
          id: "item_3_2",
          pergunta: "Há espaço e viabilidade para sombreamento natural com árvores não frutíferas nas faces Norte e Oeste?",
          tipo_criterio: "OPERACIONAL",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "A arborização adequada reduz a temperatura radiante no entorno sem bloquear a circulação do ar natural, baixando a temperatura interna em até 2°C.",
          acao_corretiva_se_nao: "Planejar o plantio de cortina vegetal com espécies de copa alta e sem atrativos para aves silvestres (ex: grevílea, sansão-do-campo a 10-15m do galpão).",
          dica_de_campo: "Nunca utilize árvores frutíferas próximas ao aviário, pois atraem pássaros silvestres e morcegos, que são vetores de patógenos.",
          referencia_normativa: "Diretrizes de Bem-Estar Animal"
        }
      ]
    },
    {
      id: "cat_4",
      nome: "Pilar 4: Ventilação e Arranjo Espacial",
      descricao: "Aproveitamento das correntes de ar naturais e espaçamento entre edificações para evitar barreiras.",
      itens: [
        {
          id: "item_4_1",
          pergunta: "O local aproveita os ventos dominantes da região sem barreiras físicas imediatas na direção do fluxo de ar?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Favorece a renovação contínua de ar no sistema de ventilação natural e reduz o esforço e consumo energético dos exaustores no sistema climatizado.",
          acao_corretiva_se_nao: "Remover obstáculos ventilatórios imediatos (entulhos, taipas, galpões velhos) ou redimensionar exaustores adicionais se for sistema de pressão negativa.",
          dica_de_campo: "Observe a direção predominante dos ventos na região (geralmente ventos alísios ou de quadrante sul/sudeste) e evite instalar o galpão atrás de paredões de morro.",
          referencia_normativa: "Engenharia de Construções Rurais"
        },
        {
          id: "item_4_2",
          pergunta: "Caso haja múltiplos galpões, o espaçamento entre galpões paralelos é de no mínimo o dobro da largura (ou 30m a 70m)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Evita que um aviário sirva de barreira aerodinâmica para o outro ou transmita calor, poeira e gases expelidos pelos exaustores para o galpão vizinho.",
          acao_corretiva_se_nao: "Aumentar a distância entre os eixos dos galpões no desenho de implantação para no mínimo 30 a 40 metros.",
          dica_de_campo: "Em galpões tipo túnel (pressão negativa), a saída dos exaustores deve ser orientada preferencialmente no sentido do vento para não criar refluxo.",
          referencia_normativa: "Normas de Projeto Integradoras Avícolas"
        }
      ]
    },
    {
      id: "cat_5",
      nome: "Pilar 5: Infraestrutura de Insumos Críticos (Água e Energia)",
      descricao: "Disponibilidade quantitativa e qualitativa de recursos vitais ininterruptos para a sobrevivência do lote.",
      itens: [
        {
          id: "item_5_1",
          pergunta: "Existe fonte de água potável (ex: poço artesiano) com outorga e vazão suficiente para dessedentação e resfriamento evaporativo?",
          tipo_criterio: "ELIMINATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Em dias quentes, o consumo de água por frangos de corte pode triplicar. A falta de água no sistema de resfriamento (pad cooling) causa hipertermia fatal em poucas horas.",
          acao_corretiva_se_nao: "Perfurar poço artesiano homologado com teste de vazão mínima de 24h, construir reservatório central proporcional (mínimo 48h de autonomia) e instalar dosador de cloro.",
          dica_de_campo: "Calcule: para 30.000 aves no verão, a demanda diária pode superar 20.000 a 30.000 litros entre água de bebida e placas evaporativas. Teste químico e bacteriológico é indispensável.",
          referencia_normativa: "Padrão de Potabilidade Portaria GM/MS nº 888 e IN 56"
        },
        {
          id: "item_5_2",
          pergunta: "A propriedade possui acesso à rede elétrica trifásica confiável e espaço para grupo gerador de emergência?",
          tipo_criterio: "ELIMINATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "A interrupção de energia em aviários climatizados (Dark House/Tunnel) paralisa exaustores e causa asfixia e mortalidade total do lote em questão de 15 a 30 minutos.",
          acao_corretiva_se_nao: "Solicitar extensão de rede trifásica junto à concessionária de energia e prever no orçamento a aquisição de grupo gerador automatizado com chave de transferência automática (QTA).",
          dica_de_campo: "O gerador deve ter capacidade para suportar 100% da carga de motores, iluminação e bombas da granja simultaneamente, com autonomia de combustível para 12 horas.",
          referencia_normativa: "Manual de Gestão de Riscos Operacionais Avícolas"
        }
      ]
    },
    {
      id: "cat_6",
      nome: "Pilar 6: Dimensionamento e Densidade de Alojamento",
      descricao: "Planejamento da capacidade de alojamento conforme a tipologia construtiva planejada para Frangos de Corte.",
      itens: [
        {
          id: "item_6_1",
          pergunta: "Para Sistema Convencional (Ventilação Natural), a densidade planejada é de 9 a 10 aves/m² (máx 30 kg peso vivo/m²)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Evita o estresse térmico por superpopulação em galpões sem climatização forçada, prevenindo quedas drásticas no ganho de peso diário e calos de peito.",
          acao_corretiva_se_nao: "Reduzir a quantidade de pintainhos alojados por lote para respeitar os limites de conforto térmico do sistema convencional ou converter o projeto para climatizado.",
          dica_de_campo: "Se a região tem temperaturas médias acima de 30°C no verão, a densidade no sistema convencional não deve passar de 9 aves/m².",
          referencia_normativa: "Normas de Bem-Estar na Avicultura de Corte"
        },
        {
          id: "item_6_2",
          pergunta: "Para Sistema Climatizado / Pressão Negativa (Tunnel / Dark House), a densidade planejada é de 12 a 14 aves/m² (máx 38 a 42 kg peso vivo/m²)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Alojamento otimizado com segurança biológica garantido por controle rigoroso de temperatura, umidade e velocidade do ar (2,5 a 3,0 m/s).",
          acao_corretiva_se_nao: "Adequar a densidade do lote à capacidade real dos exaustores e placas evaporativas instalados, nunca superando 42 kg/m² no peso final.",
          dica_de_campo: "Consulte o manual da linhagem (Cobb, Ross, Hubbard) e as exigências da agroindústria integradora parceira para a densidade autorizada.",
          referencia_normativa: "Manual Técnico de Produção de Frangos de Corte"
        },
        {
          id: "item_6_3",
          pergunta: "As dimensões estruturais planejadas atendem aos padrões técnicos (Largura 10-14m, Pé-direito 3,0-4,0m e Mureta 20-30cm)?",
          tipo_criterio: "CLASSIFICATORIO",
          opcoes_resposta: ["SIM", "NAO"],
          fundamentacao_tecnica: "Garante estabilidade do fluxo de ar interior, altura adequada para dissipação de calor acumulado na cumeeira e facilidade de limpeza e desinfecção mecânica.",
          acao_corretiva_se_nao: "Ajustar as especificações do projeto arquitetônico e estrutural antes da contratação das estruturas metálicas ou pré-moldadas.",
          dica_de_campo: "Pé-direito inferior a 3,0 metros retém calor próximo às aves; larguras superiores a 16 metros exigem climatização forçada e forro de isolamento reforçado.",
          referencia_normativa: "Diretrizes de Infraestrutura Avícola"
        }
      ]
    }
  ]
};
