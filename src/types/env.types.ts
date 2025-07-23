export const ENV_TYPES = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  LOCAL: 'local',
} as const;

export type Environment = typeof ENV_TYPES[keyof typeof ENV_TYPES];

export interface IEnvConfig {
  NODE_ENV: Environment;
  PORT: string | number;
  DB_URL: string;
  DB_URL_DEV?: string;
  DB_URL_PROD?: string;
  DB_URL_LOC?: string;
  SECRET: string;
  ACCESS_TOKEN_SECRET: string;
}