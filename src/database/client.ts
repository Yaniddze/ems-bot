import { Client } from "pg";

export const createClient = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'emsbot',
        host: process.env.DB_HOST,
        port: 5432,
    });
    await client.connect();

    return client;
}