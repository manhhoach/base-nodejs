import Libpq from "libpq";
export const client = new Libpq();

export const connectDb = () => {
  client.connectSync(process.env.DB_URL);
  client.exec(
    `CREATE TABLE IF NOT EXISTS "products"(
      "id" serial PRIMARY KEY,
      "name" VARCHAR NOT NULL,
      "code" VARCHAR NOT NULL,
      "unit" VARCHAR NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "warehouses"(
        "id" serial PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "location" VARCHAR NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "receipts"(
        "id" serial PRIMARY KEY,
        "deliver" VARCHAR NOT NULL,
        "warehouse_id" BIGINT NOT NULL,
        "created_by" VARCHAR NOT NULL,
        "created_at" DATE NOT NULL,
        FOREIGN KEY("warehouse_id") REFERENCES "warehouses"("id")
    );
    
    CREATE TABLE IF NOT EXISTS "receipt_details"(
        "id" serial PRIMARY KEY,
        "product_id" BIGINT NOT NULL,
        "receipt_id" BIGINT NOT NULL,
        "quantity_doc" BIGINT NOT NULL,
        "actual_quantity" BIGINT NOT NULL,
        "price" BIGINT NOT NULL,
        FOREIGN KEY("receipt_id") REFERENCES "receipts"("id"),
        FOREIGN KEY("product_id") REFERENCES "products"("id"),
        CONSTRAINT UNIQUE_PRODUCT_RECEIPT UNIQUE("receipt_id", "product_id")
    );`
  );
  console.log("Connected to database");
  client.finish();
};
