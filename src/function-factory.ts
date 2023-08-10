import company_fetcher from './functions/company_fetcher/index';
import user_fetcher from './functions/user_fetcher/index';

export const functionFactory = {
  user_fetcher,
  company_fetcher,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
