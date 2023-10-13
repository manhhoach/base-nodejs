import { responseSucess } from './response';

export const customController = async (task: Promise<any>, statusCode: number) => {
  const data = await task;
  return responseSucess(statusCode, data);
};
