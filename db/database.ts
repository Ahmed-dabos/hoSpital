import "dotenv/config"
import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js'
import * as _schema from "./schema"
import * as relations from "./relations"

const schema = {..._schema, ...relations}

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)

export const db = drizzle(client, {schema})