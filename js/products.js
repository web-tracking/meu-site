window.NEXUS_PRODUCTS = [
  {
    id: "nb-aurora",
    name: "Notebook Aurora 14",
    category: "notebooks",
    price: 4899,
    badge: "Destaque",
    short: "Ultraleve com tela OLED e 16 GB de RAM.",
    description:
      "Notebook fino de 14\" com painel OLED 120 Hz, processador de última geração, 16 GB de RAM e SSD de 512 GB. Ideal para trabalho e criação em movimento.",
  },
  {
    id: "nb-pulse",
    name: "Notebook Pulse 16",
    category: "notebooks",
    price: 7299,
    badge: "Pro",
    short: "Performance para edição e desenvolvimento.",
    description:
      "Tela 16\" QHD, GPU dedicada, 32 GB de RAM e SSD de 1 TB. Feito para quem precisa de potência sem abrir mão da mobilidade.",
  },
  {
    id: "ph-nova",
    name: "Smartphone Nova X",
    category: "smartphones",
    price: 3499,
    badge: "Novo",
    short: "Câmera tripla e carga rápida 65 W.",
    description:
      "Tela AMOLED 6,7\", câmera tripla de 108 MP, bateria de longa duração e carregamento rápido de 65 W. Experiência fluida o dia todo.",
  },
  {
    id: "ph-orbit",
    name: "Smartphone Orbit Mini",
    category: "smartphones",
    price: 2199,
    badge: null,
    short: "Compacto, rápido e com ótimo custo-benefício.",
    description:
      "Design compacto com tela de 6,1\", chip eficiente, 128 GB de armazenamento e resistência a respingos. Perfeito para o dia a dia.",
  },
  {
    id: "au-wave",
    name: "Fone Wave ANC",
    category: "audio",
    price: 899,
    badge: "Popular",
    short: "Cancelamento de ruído e até 30 h de bateria.",
    description:
      "Over-ear com ANC híbrido, modo transparência, Bluetooth 5.3 e estojo com carga sem fio. Som equilibrado para música e calls.",
  },
  {
    id: "au-echo",
    name: "Caixa Echo Go",
    category: "audio",
    price: 599,
    badge: null,
    short: "Som 360° à prova d'água IP67.",
    description:
      "Caixa portátil com som 360°, graves potentes, IP67 e até 16 horas de reprodução. Leve para qualquer lugar.",
  },
  {
    id: "wr-pulse",
    name: "Smartwatch Pulse Band",
    category: "wearables",
    price: 1299,
    badge: "Saúde",
    short: "GPS, SpO2 e autonomia de 7 dias.",
    description:
      "Pulseira inteligente com GPS integrado, monitoramento de sono, SpO2, notificações e autonomia de até 7 dias.",
  },
  {
    id: "wr-orbit",
    name: "Óculos Orbit AR Lite",
    category: "wearables",
    price: 2599,
    badge: "Lab",
    short: "Notificações e áudio espacial discretos.",
    description:
      "Óculos leves com áudio espacial, alertas inteligentes e design discreto. Uma introdução prática à realidade aumentada.",
  },
  {
    id: "nb-edge",
    name: "Chromebook Edge 13",
    category: "notebooks",
    price: 2499,
    badge: null,
    short: "Rápido para estudos e navegação.",
    description:
      "Notebook leve de 13\" com inicialização instantânea, teclado confortável e bateria para o dia inteiro. Ideal para estudos e produtividade leve.",
  },
  {
    id: "ph-flux",
    name: "Smartphone Flux Ultra",
    category: "smartphones",
    price: 5999,
    badge: "Flagship",
    short: "Zoom óptico e tela LTPO 144 Hz.",
    description:
      "Topo de linha com zoom óptico avançado, tela LTPO 144 Hz, carregamento sem fio e resistência premium.",
  },
  {
    id: "au-beam",
    name: "Earphones Beam Pro",
    category: "audio",
    price: 749,
    badge: null,
    short: "In-ear com ANC e case MagSafe.",
    description:
      "Fones in-ear com cancelamento ativo, equalização adaptativa e case compatível com MagSafe. Até 28 h com o estojo.",
  },
  {
    id: "wr-stride",
    name: "Pulseira Stride Fit",
    category: "wearables",
    price: 449,
    badge: null,
    short: "Treinos, passos e notificações essenciais.",
    description:
      "Pulseira fitness com sensores de batimento, modos de treino, resistência à água e tela sempre ativa.",
  },
];

window.NEXUS_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "notebooks", label: "Notebooks" },
  { id: "smartphones", label: "Smartphones" },
  { id: "audio", label: "Áudio" },
  { id: "wearables", label: "Wearables" },
];

window.getProductById = function getProductById(id) {
  return window.NEXUS_PRODUCTS.find(function (p) {
    return p.id === id;
  });
};

window.formatPrice = function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
};
