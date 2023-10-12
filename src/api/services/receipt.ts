import { query } from "./../helpers/query";
import { getPagination, getPagingData } from "../helpers/pagination";

export const getAll = async (page_index: number, page_size: number) => {
  let { limit, offset } = getPagination(page_index, page_size);
  let [data, count] = await Promise.all([
    query(`SELECT * FROM "receipts" LIMIT ${limit} OFFSET ${offset}`),
    query(`SELECT count(*) FROM "receipts"`),
  ]);
  return getPagingData(
    { rows: data.rows, count: count.rows[0].count },
    page_index,
    limit
  );
};

export const insert = async (data: any) => {
  let receipt = await query(
    `INSERT INTO "receipts" (deliver, warehouse_id, created_by, created_at) VALUES 
    ('${data.deliver}', '${data.warehouse_id}', '${data.created_by}', '${data.created_at}') RETURNING id;`
  );
  let receipt_id = receipt.rows[0].id;
  let insertStr = `INSERT INTO "receipt_details" (product_id, receipt_id, quantity_doc, actual_quantity, price) VALUES `;
  data.receipt_details.forEach((e: any, i: number) => {
    insertStr += `('${e.product_id}', '${receipt_id}', '${e.quantity_doc}', '${
      e.actual_quantity
    }', '${e.price}')${i === data.receipt_details.length - 1 ? ";" : ","} `;
  });
  return query(insertStr);
};

export const findById = async (id: number) => {
  let data =
    await query(`SELECT "receipt_details".*, "products"."name", "products"."code", "products"."unit"  
  FROM "receipt_details" INNER JOIN "products" on "receipt_details"."product_id"="products"."id" WHERE "receipt_id" = ${id}`);
  let rows = data.rows;
  rows = rows.map((ele: any) => {
    return {
      ...ele,
      total_value: +ele.actual_quantity * +ele.price,
    };
  });
  return rows;
};

export const update = async (id: number, data: any) => {};


export const destroy = async (id: number) => {};