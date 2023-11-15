import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE,
    port: process.env.PORT
});

async function createNameTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS names (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );

        INSERT INTO names (name) VALUES ('John');
        `;

    const client = await pool.connect();
    try {
        client.query(query, (err, res) => {
            if(err) {
                console.error("Erro when executing this query:", err);
                return;
            } else {
                console.log("Query run successfully");
            }
        });     
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

async function getNameTable() {
    const query = `SELECT name FROM names LIMIT 1;`
    const client = await pool.connect();

    try {
        const {rows} = await client.query(query);
        console.log(rows[0]['name']);
    } catch (error) {
        console.log(error)
    } finally {
        client.release();
    }
}

createNameTable();
getNameTable();