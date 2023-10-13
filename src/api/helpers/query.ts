import Libpq from "libpq";
import types from "pg-types";
import { buildResult } from "../lib/build.result";

const throwIfError = function (pq: Libpq) {
  var err = pq.resultErrorMessage() || pq.errorMessage();
  if (err) {
    throw new Error(err);
  }
};

export const querySync = function (text: string) {
  const pq = new Libpq();
  pq.connectSync(process.env.DB_URL);
  pq.exec(text);
  throwIfError(pq);

  let arrayMode = false;
  const result = buildResult(pq, types, arrayMode);
  pq.finish();
  return result.rows;
};
