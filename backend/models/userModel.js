import sql from '../database/config.js';

const getUserByEmail = async (email) => {
    const [user] = await sql`select * from usuario where email = ${email}`;
    return user;
}

const insertUser = async (email, senha) => {
    const [user] = await sql`insert into usuario (email, senha)
    values (${email}, ${senha})`;
    return user;
}

export default {
    getUserByEmail,
    insertUser
}