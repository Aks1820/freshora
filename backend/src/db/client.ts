const databaseURL = process.env.DATABASE_URL;
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";


const schema = {}

if(!databaseURL){
    throw new Error("DATABASE_URL is required for API routes");
}

const sql = neon(databaseURL);

export const db = drizzle({client:sql, schema})