import { clientPg } from "./../helpers/query";

export const getAll = async () => {
  await clientPg.connect();
  let data = await clientPg.query(`SELECT * from "products"`);
  await clientPg.end();
  return data.rows;
};

export const insert = async (data: any) => {
  // return client.exec(
  //   `INSERT INTO "products" (name, code, unit) VALUES ('${data.name}', '${data.code}', '${data.unit}');`
  // );
};
