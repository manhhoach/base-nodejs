import { responseSucess } from './response';

export const customReturn = async (task: Promise<any>, statusCode: number) => {
  const data = await task;
  return responseSucess(statusCode, data);
};
