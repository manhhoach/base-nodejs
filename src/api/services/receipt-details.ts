import { querySync } from "./../helpers/query";

export const insert = (receipt_id: number, data: any) => {
  let insertStr = `INSERT INTO "receipt_details" (product_id, receipt_id, quantity_doc, actual_quantity, price) VALUES `;
  data.receipt_details.forEach((e: any, i: number) => {
    insertStr += `('${e.product_id}', '${receipt_id}', '${e.quantity_doc}', '${
      e.actual_quantity
    }', '${e.price}')${i === data.receipt_details.length - 1 ? ";" : ","} `;
  });
  return querySync(insertStr);
};

export const update = (data: any) => {
  data.data.forEach((item: any) => {
    let str = `UPDATE "receipt_details" SET `;
    Object.keys(item).forEach((key, i) => {
      str += `"${key}" = '${item[key]}'${
        i === Object.keys(item).length - 1 ? " " : ","
      }`;
    });
    str += ` WHERE "id" = ${item.id}`;
    querySync(str);
    console.log(str);
  });
};

export const destroy = (id: number) => {
  querySync(`DELETE FROM "receipt_details" WHERE "id" = ${id}`);
};
