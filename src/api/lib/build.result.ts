"use strict";
import Libpq from "libpq";

class Result {
  _types: any;
  _arrayMode: any;
  command: any;
  rowCount: any;
  fields: any[] = [];
  rows: any[] = [];

  constructor(types: any, arrayMode: any) {
    this._types = types;
    this._arrayMode = arrayMode;

    this.command = undefined;
    this.rowCount = undefined;
    this.fields = [];
    this.rows = [];
  }

  consumeCommand(pq: Libpq) {
    this.command = pq.cmdStatus().split(" ")[0];
    this.rowCount = parseInt(pq.cmdTuples(), 10);
  }

  consumeFields(pq: Libpq) {
    const nfields = pq.nfields();
    for (var x = 0; x < nfields; x++) {
      this.fields.push({
        name: pq.fname(x),
        dataTypeID: pq.ftype(x),
      });
    }
  }

  consumeRows(pq: Libpq) {
    const tupleCount = pq.ntuples();
    for (var i = 0; i < tupleCount; i++) {
      const row = this._arrayMode
        ? this.consumeRowAsArray(pq, i)
        : this.consumeRowAsObject(pq, i);
      this.rows.push(row);
    }
  }

  consumeRowAsObject(pq: Libpq, rowIndex: number) {
    const row = {} as any;
    for (var j = 0; j < this.fields.length; j++) {
      const value = this.readValue(pq, rowIndex, j);
      row[this.fields[j].name] = value;
    }
    return row;
  }

  consumeRowAsArray(pq: Libpq, rowIndex: number) {
    const row = [];
    for (var j = 0; j < this.fields.length; j++) {
      const value = this.readValue(pq, rowIndex, j);
      row.push(value);
    }
    return row;
  }

  readValue(pq: Libpq, rowIndex: number, colIndex: number) {
    var rawValue = pq.getvalue(rowIndex, colIndex);
    if (rawValue === "") {
      if (pq.getisnull(rowIndex, colIndex)) {
        return null;
      }
    }
    const dataTypeId = this.fields[colIndex].dataTypeID;
    return this._types.getTypeParser(dataTypeId)(rawValue);
  }
}

export const buildResult = (pq: Libpq, types: any, arrayMode: any) => {
  const result = new Result(types, arrayMode);
  result.consumeCommand(pq);
  result.consumeFields(pq);
  result.consumeRows(pq);

  return result;
};
