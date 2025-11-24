import sql from '../database/config.js';

const getAllServicos = async () => {
    return await sql`select
    s.id,
    s.nome_servico,
    s.descricao_servico,
    s.preco_servico,
    s.fk_profissional, 
    p.nome_profissional,
    s.removido
    from servico s
    inner join profissional p 
    on p.id = s.fk_profissional
    where s.removido = false`;
}

const getServicoById = async (id) => {
    const [item] = await sql`select
    s.id,
    s.nome_servico,
    s.descricao_servico,
    s.preco_servico,
    s.fk_profissional, 
    p.nome_profissional,
    s.removido
    from servico s
    inner join profissional p 
    on p.id = s.fk_profissional
    where s.id = ${id} and s.removido = false`;
    return item;
}

const insertServico = async (nome, descricao, preco, fk_profissional) => {
    const [item] = await sql`insert into servico (nome_servico, descricao_servico, preco_servico, fk_profissional)
    values (${nome}, ${descricao}, ${preco}, ${fk_profissional})
    returning *`;
    return item;
};

const updateServico = async (id, nome, descricao, preco, fk_profissional) => {
    const [item] = await sql`update servico set
    nome_servico = ${nome},
    descricao_servico = ${descricao},
    preco_servico = ${preco},
    fk_profissional = ${fk_profissional}
    where id = ${id} and removido = false
    returning *`
    return item;
};

const deleteServico = async (id) => {
    const dependentes = await sql`
        select id from atendimento
        where fk_servico = ${id} and removido = false
    `;

    if (dependentes.length > 0) {
        throw new Error("Não é possível remover o serviço: existem atendimentos vinculados.");
    }

    const [item] = await sql`
        update servico set
        removido = true
        where id = ${id}
        returning *
    `;

    return item;
};


export default {
    getAllServicos,
    getServicoById,
    insertServico,
    updateServico,
    deleteServico
}