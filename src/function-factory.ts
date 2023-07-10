import file from './functions/file/index';
import function_2 from './functions/function_2/index';


export const functionFactory = {
  file,
  function_2
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
