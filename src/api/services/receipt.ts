import { querySync } from "./../helpers/query";
import { getPagination, getPagingData } from "../helpers/pagination";

export const getAll = (page_index: number, page_size: number) => {
  let { limit, offset } = getPagination(page_index, page_size);
  let data = querySync(
    `SELECT * FROM "receipts" LIMIT ${limit} OFFSET ${offset}`
  );
  let count = querySync(`SELECT count(*) FROM "receipts"`);

  return getPagingData(
    { rows: data, count: +count[0].count },
    page_index,
    limit
  );
};

export const insert = (data: any) => {
  let receipt = querySync(
    `INSERT INTO "receipts" (deliver, warehouse_id, created_by, created_at) VALUES
    ('${data.deliver}', '${data.warehouse_id}', '${data.created_by}', '${data.created_at}') RETURNING id;`
  );

  let receipt_id = receipt[0].id;
  let insertStr = `INSERT INTO "receipt_details" (product_id, receipt_id, quantity_doc, actual_quantity, price) VALUES `;
  data.receipt_details.forEach((e: any, i: number) => {
    insertStr += `('${e.product_id}', '${receipt_id}', '${e.quantity_doc}', '${
      e.actual_quantity
    }', '${e.price}')${i === data.receipt_details.length - 1 ? ";" : ","} `;
  });
  return querySync(insertStr);
};

export const findById = (id: number) => {
  let data =
    querySync(`SELECT "receipt_details".*, "products"."name", "products"."code", "products"."unit"  
  FROM "receipt_details" INNER JOIN "products" on "receipt_details"."product_id"="products"."id" WHERE "receipt_id" = ${id}`);
  data = data.map((ele: any) => {
    return {
      ...ele,
      total_value: +ele.actual_quantity * +ele.price,
    };
  });
  return data;
};

export const update = (id: number, data: any) => {
  let str = `UPDATE "receipts" SET `;
  Object.keys(data).forEach((key, i) => {
    str += `"${key}" = '${data[key]}'${
      i === Object.keys(data).length - 1 ? " " : ","
    }`;
  });
  str += ` WHERE "id" = ${id}`;
  querySync(str);
};

export const destroy = (id: number) => {
  querySync(`DELETE FROM "receipts" WHERE "id" = ${id}`);
};
