export const RoastLevels = {
  LIGHT: 'light',
  MEDIUM_LIGHT: 'medium-light',
  MEDIUM: 'medium',
  MEDIUM_DARK: 'medium-dark',
  DARK: 'dark',
  OMNI: 'omni',
} as const;

export type RoastLevel = typeof RoastLevels[keyof typeof RoastLevels];

export const roastLevelLabels: Record<RoastLevel, string> = {
  [RoastLevels.LIGHT]: 'Light',
  [RoastLevels.MEDIUM_LIGHT]: 'Medium-Light',
  [RoastLevels.MEDIUM]: 'Medium',
  [RoastLevels.MEDIUM_DARK]: 'Medium-Dark',
  [RoastLevels.DARK]: 'Dark',
  [RoastLevels.OMNI]: 'Omni',
};