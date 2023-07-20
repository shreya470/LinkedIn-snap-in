import file from './functions/file/index';
import company_fetcher from './functions/company_fetcher/index';


export const functionFactory = {
  file,
  company_fetcher,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
