import { querySync } from "./../helpers/query";

export const getAll = async () => {
  let data = querySync(`SELECT * from "products"`);
  return data;
};

export const insert = async (data: any) => {
  querySync(
    `INSERT INTO "products" (name, code, unit) VALUES ('${data.name}', '${data.code}', '${data.unit}');`
  );
};
