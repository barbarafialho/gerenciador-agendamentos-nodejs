import sql from './database/config.js';

const getAllProfissionais = async () => {
    return await sql`select * from profissional where removido = false`;
}

const getProfissionalById = async (id) => {
    const [item] = await sql`select * from profissional where id = ${id}
    and removido = false`;
    return item;
}

// o returning serve para otimizar a query e já retornar o item inserido
const insertProfissional = async (nome, telefone, especialidade) => {
    const [item] = await sql`insert into profissional 
    (nome_profissional, telefone, especialidade) 
    values (${nome}, ${telefone}, ${especialidade})
    returning *`;
    return item;
}

const updateProfissional = async (id, nome, telefone, especialidade) => {
    const [item] = await sql`update profissional set 
    nome_profissional = ${nome},
    telefone = ${telefone},
    especialidade = ${especialidade}
    where id = ${id} and removido = false
    returning *`
    return item;
};

const deleteProfissional = async (id) => {
    const [item] = await sql`update profissional set
    removido = true
    where id = ${id}
    returning *`;
    return item;
}

export default {
    getAllProfissionais,
    getProfissionalById,
    insertProfissional,
    updateProfissional,
    deleteProfissional
}