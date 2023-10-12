export const getPagination = (page_index: number, page_size: number) => {
  const limit = page_size ? +page_size : 5;
  const offset = page_index ? (page_index - 1) * limit : 0;

  return { limit, offset };
};

export const getPagingData = (data: any, page_index: number, limit: number) => {
  const { count, rows } = data;
  const current_page = page_index ? page_index : 1;
  const total_pages = Math.ceil(count / limit);

  return { total_items: count, total_pages, current_page, data: rows };
};
