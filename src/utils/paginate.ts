export const getPagination = (pageSize: number, pageIndex: number) => {
  const limit = pageSize;
  const skip = (pageIndex - 1) * limit;
  return { skip, limit };
};

export const getPagingData = (data: any, pageIndex: number, limit: number) => {
  const records = data[0],
    count = data[1];
  const total_pages = Math.ceil(count / limit);
  return {
    total_items: count,
    total_pages,
    current_page: pageIndex,
    data: records,
  };
};
