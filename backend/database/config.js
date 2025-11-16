import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);
export default sql;

/*
https://github.com/porsager/postgres
*/