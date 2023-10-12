import { query } from "./../helpers/query";


export const getAll = async () => {
  let data = await query(`SELECT * from "products"`);
  return data.rows;
};

export const insert = async (data: any) => {
  await query(
    `INSERT INTO "products" (name, code, unit) VALUES ('${data.name}', '${data.code}', '${data.unit}');`
  );
};
