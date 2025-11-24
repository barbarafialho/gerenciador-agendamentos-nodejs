import sql from '../database/config.js';

const getAllAtendimentos = async () => {
    return await sql`select
            a.id,
            a.fk_agendamento,
            a.fk_servico,
            a.preco_final,
            a.observacao,
            a.removido,

            ag.nome_cliente,
            ag.data,
            ag.hora,

            s.nome_servico,

            p.nome_profissional
        from atendimento a
        inner join agendamento ag
            on ag.id = a.fk_agendamento
        inner join servico s
            on s.id = a.fk_servico
        inner join profissional p
            on p.id = s.fk_profissional
        where a.removido = false`;
};

const getAtendimentoById = async (id) => {
    const [item] = await sql`select
            a.id,
            a.fk_agendamento,
            a.fk_servico,
            a.preco_final,
            a.observacao,
            a.removido,

            ag.nome_cliente,
            ag.data,
            ag.hora,

            s.nome_servico,

            p.nome_profissional
        from atendimento a
        inner join agendamento ag
            on ag.id = a.fk_agendamento
        inner join servico s
            on s.id = a.fk_servico
        inner join profissional p
            on p.id = s.fk_profissional
        where a.id = ${id} and a.removido = false`;
    return item;
};

const insertAtendimento = async (fk_agendamento, fk_servico, preco_final, observacao) => {
    const [item] = await sql`
        insert into atendimento (fk_agendamento, fk_servico, preco_final, observacao)
        values (${fk_agendamento}, ${fk_servico}, ${preco_final}, ${observacao})
        returning *
    `;
    return item;
};

const updateAtendimento = async (id, fk_agendamento, fk_servico, preco_final, observacao) => {
    const [item] = await sql`
        update atendimento set
            fk_agendamento = ${fk_agendamento},
            fk_servico = ${fk_servico},
            preco_final = ${preco_final},
            observacao = ${observacao}
        where id = ${id} and removido = false
        returning *
    `;
    return item;
};

const deleteAtendimento = async (id) => {
    const [item] = await sql`
        update atendimento set
            removido = true
        where id = ${id}
        returning *
    `;
    return item;
};

/*const getItensByAgendamento = async (fk_agendamento) => {
    // Lógica para selecionar itens da tabela 'atendimento' pelo fk_agendamento
    return await sql`
        SELECT * FROM atendimento 
        WHERE fk_agendamento = ${fk_agendamento} AND removido = false
    `;
};*/

export default {
    getAllAtendimentos,
    getAtendimentoById,
    insertAtendimento,
    updateAtendimento,
    //getItensByAgendamento,
    deleteAtendimento
};
