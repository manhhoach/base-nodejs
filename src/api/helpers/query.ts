import { Client } from 'pg'
export const clientPg = new Client(process.env.DB_URL)