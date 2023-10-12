import { query } from "./../helpers/query";

export const getAll = async () => {
  let data = await query(`SELECT * from "warehouses"`);
  return data.rows;
};

export const insert = async (data: any) => {
  return query(
    `INSERT INTO "warehouses" (name, location) VALUES ('${data.name}', '${data.location}');`
  );
};
