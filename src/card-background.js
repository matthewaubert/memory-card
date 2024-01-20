const typeToColor = {
  bug: 'lime',
  dragon: 'purple',
  electric: 'yellow',
  fighting: 'orange',
  fire: 'red',
  flying: 'indigo',
  ghost: 'violet',
  grass: 'green',
  ground: 'stone',
  ice: 'cyan',
  normal: 'brown',
  fairy: 'brown',
  poison: 'fuchsia',
  psychic: 'pink',
  rock: 'slate',
  water: 'sky',
};

const colorSchemes = {
  lime: {
    dark: '#3f6212',
    med: '#84cc16',
    lite: '#bef264',
  },
  purple: {
    dark: '#581c87',
    med: '#a855f7',
    lite: '#d8b4fe',
  },
  yellow: {
    dark: '#a16207',
    med: '#eab308',
    lite: '#fde047',
  },
  orange: {
    dark: '#7c2d12',
    med: '#f97316',
    lite: '#fdba74',
  },
  red: {
    dark: '#991b1b',
    med: '#ef4444',
    lite: '#fca5a5',
  },
  indigo: {
    dark: '#3730a3',
    med: '#6366f1',
    lite: '#a5b4fc',
  },
  violet: {
    dark: '#5b21b6',
    med: '#8b5cf6',
    lite: '#c4b5fd',
  },
  green: {
    dark: '#166534',
    med: '#22c55e',
    lite: '#86efac',
  },
  stone: {
    dark: '#44403c',
    med: '#78716c',
    lite: '#d6d3d1',
  },
  cyan: {
    dark: '#164e63',
    med: '#06b6d4',
    lite: '#67e8f9',
  },
  brown: {
    dark: '#57331f',
    med: '#e0b161',
    lite: '#eed684',
  },
  fuchsia: {
    dark: '#701a75',
    med: '#d946ef',
    lite: '#f0abfc',
  },
  pink: {
    dark: '#9d174d',
    med: '#ec4899',
    lite: '#f0abfc',
  },
  slate: {
    dark: '#334155',
    med: '#64748b',
    lite: '#cbd5e1',
  },
  sky: {
    dark: '#075985',
    med: '#0ea5e9',
    lite: '#7dd3fc',
  },
};

export default function getBackground(types) {
  const colorScheme1 = colorSchemes[typeToColor[types[0]]];
  const colors = {
    1: colorScheme1.dark,
    2: colorScheme1.med,
    // if pkmn has more than one type, pull colors[3] from secondary color scheme
    3:
      types.length === 1
        ? colorScheme1.lite
        : colorSchemes[typeToColor[types[1]]].lite,
    4: colorScheme1.med,
  };

  return `linear-gradient(217deg, ${colors[1]}, transparent 71%),
    linear-gradient(127deg, ${colors[2]}, transparent 71%),
    linear-gradient(336deg, ${colors[3]}, transparent 71%),
    ${colors[4]}`;
}
