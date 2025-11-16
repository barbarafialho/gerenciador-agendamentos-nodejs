import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);
export default sql;

/* 
a biblioteca postgres pode utilizar a connectionString, que contém 
as propriedades de conexão com o BD, para fazer a conexão
ela é exportada pela variável sql que pode ser utilizada em outros arquivos
*/