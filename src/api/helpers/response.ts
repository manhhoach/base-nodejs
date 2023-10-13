export const responseSuccess = (data: any) => {
  return {
    success: true,
    data,
  };
};

export const responseWithError = (err: any) => {
  // if (err.message === "Validation error") err.message = err.errors[0].message;
  return {
    success: false,
    error: err.message ? err.message : err,
  };
};
