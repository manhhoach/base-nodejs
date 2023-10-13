import { querySync } from "./../helpers/query";

export const getAll = async () => {
  return querySync(`SELECT * from "warehouses"`);
};

export const insert = async (data: any) => {
  return querySync(
    `INSERT INTO "warehouses" (name, location) VALUES ('${data.name}', '${data.location}');`
  );
};
