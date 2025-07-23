export const ENV_TYPES = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  LOCAL: 'local',
} as const;

export type Environment = typeof ENV_TYPES[keyof typeof ENV_TYPES];

export const { DEVELOPMENT, PRODUCTION, LOCAL } = ENV_TYPES;

export default ENV_TYPES;