export const responseSucess = (statusCode: number, data: any) => {
  return {
    status_code: statusCode,
    success: true,
    data: data,
  };
};

export const responseError = (statusCode: number, message: string) => {
  return {
    status_code: statusCode,
    success: false,
    message: message,
  };
};
