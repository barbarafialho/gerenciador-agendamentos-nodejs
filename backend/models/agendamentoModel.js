import sql from '../database/config.js';

const getAllAgendamentos = async () => {
    return await sql`select * from agendamento where removido = false`;
}

const getAgendamentoById = async (id) => {
    const [item] = await sql`select * from agendamento where id = ${id}
    and removido = false`;
    return item;
}

const insertAgendamento = async (data, hora, nome_cliente, status, observacao) => {
    const [item] = await sql`insert into agendamento 
    (data, hora, nome_cliente, status, observacao) 
    values (${data}, ${hora}, ${nome_cliente}, ${status}, ${observacao})
    returning *`;
    return item;
}

const updateAgendamento = async (id, data, hora, nome_cliente, status, observacao) => {
    const [item] = await sql`update agendamento set 
    data = ${data},
    hora = ${hora},
    nome_cliente = ${nome_cliente},
    status = ${status},
    observacao = ${observacao}
    where id = ${id} and removido = false
    returning *`
    return item;
};

const deleteAgendamento = async (id) => {
    const [item] = await sql`update agendamento set
    removido = true
    where id = ${id}
    returning *`
    return item;
}

export default {
    getAllAgendamentos,
    getAgendamentoById,
    insertAgendamento,
    updateAgendamento,
    deleteAgendamento
}