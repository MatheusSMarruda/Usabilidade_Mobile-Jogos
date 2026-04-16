// ODS 15 - Vida Terrestre: animais e plantas em risco/relevantes para a biodiversidade
export const animals = [
  {
    id: 1,
    emoji: '🐺',
    name: 'Lobo-guará',
    wikiSlug: 'Maned_wolf',
    status: 'Vulnerável',
    biome: 'Cerrado',
  },
  {
    id: 2,
    emoji: '🐆',
    name: 'Onça-pintada',
    wikiSlug: 'Jaguar',
    status: 'Quase Ameaçado',
    biome: 'Amazônia',
  },
  {
    id: 3,
    emoji: '🐘',
    name: 'Elefante Africano',
    wikiSlug: 'African_elephant',
    status: 'Vulnerável',
    biome: 'Savana',
  },
  {
    id: 4,
    emoji: '🦍',
    name: 'Gorila',
    wikiSlug: 'Gorilla',
    status: 'Em Perigo',
    biome: 'Floresta Tropical',
  },
  {
    id: 5,
    emoji: '🐼',
    name: 'Panda-gigante',
    wikiSlug: 'Giant_panda',
    status: 'Vulnerável',
    biome: 'Florestas Temperadas',
  },
  {
    id: 6,
    emoji: '🐯',
    name: 'Tigre-de-bengala',
    wikiSlug: 'Bengal_tiger',
    status: 'Em Perigo',
    biome: 'Florestas Subtropicais',
  },
  {
    id: 7,
    emoji: '🦅',
    name: 'Harpia',
    wikiSlug: 'Harpy_eagle',
    status: 'Vulnerável',
    biome: 'Amazônia',
  },
  {
    id: 8,
    emoji: '🦓',
    name: 'Zebra-das-planícies',
    wikiSlug: 'Plains_zebra',
    status: 'Quase Ameaçado',
    biome: 'Savana Africana',
  },
  {
    id: 9,
    emoji: '🦏',
    name: 'Rinoceronte-branco',
    wikiSlug: 'White_rhinoceros',
    status: 'Quase Ameaçado',
    biome: 'Savana',
  },
  {
    id: 10,
    emoji: '🐻',
    name: 'Urso-pardo',
    wikiSlug: 'Brown_bear',
    status: 'Pouco Preocupante',
    biome: 'Florestas Boreais',
  },
];

export const getDifficultyConfig = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { pairs: 6, cols: 4, label: 'Fácil' };
    case 'medium':
      return { pairs: 8, cols: 4, label: 'Médio' };
    case 'hard':
      return { pairs: 10, cols: 5, label: 'Difícil' };
    default:
      return { pairs: 6, cols: 4, label: 'Fácil' };
  }
};

export const createShuffledDeck = (pairs) => {
  const selected = animals.slice(0, pairs);
  const deck = [
    ...selected.map((a) => ({ ...a, uid: `${a.id}-a` })),
    ...selected.map((a) => ({ ...a, uid: `${a.id}-b` })),
  ];
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
