import { createConnection } from 'mysql';
import { config } from 'dotenv';
config();

const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const query = (sql, values, callback) => {
    connection.query(sql, values, callback);
}

export {
    connection,
    query
};