import atendimentoModel from "../models/atendimentoModel.js";

const getAll = async (req, res) => {
  try {
    const atendimentos = await atendimentoModel.getAllAtendimentos();
    res.status(200).json(atendimentos);
  } catch (error) {
    console.error("Erro ao listar atendimentos:", error);
    res.status(500).json({ message: "Erro ao listar atendimentos" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const atendimento = await atendimentoModel.getAtendimentoById(id);

    if (!atendimento) {
      return res.status(404).json({ message: "Atendimento não encontrado" });
    }

    res.status(200).json(atendimento);
  } catch (error) {
    console.error("Erro ao buscar atendimento:", error);
    res.status(500).json({ message: "Erro ao buscar atendimento" });
  }
};

const create = async (req, res) => {
  try {
    const { fk_agendamento, fk_servico, preco_final, observacao } = req.body;
    
    const novoAtendimento = await atendimentoModel.insertAtendimento(
      fk_agendamento,
      fk_servico,
      preco_final,
      observacao
    );
    res.status(201).json({
      message: "Serviço adicionado ao agendamento com sucesso",
      atendimento: novoAtendimento,
    });
  } catch (error) {
    console.error("Erro ao adicionar serviço ao agendamento:", error);
    res
      .status(500)
      .json({ message: "Erro ao adicionar serviço ao agendamento" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fk_agendamento, fk_servico, preco_final, observacao } = req.body;
    const atendimentoAtualizado = await atendimentoModel.updateAtendimento(
      id,
      fk_agendamento,
      fk_servico,
      preco_final,
      observacao
    );
    res.status(200).json({
      message: "Atendimento atualizado",
      atendimento: atendimentoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar atendimento:", error);
    res.status(500).json({ message: "Erro ao atualizar atendimento" });
  }
};

/*const getItensByAgendamento = async (req, res) => {
  try {
    const { idAgendamento } = req.params;

    const itens = await atendimentoModel.getItensByAgendamento(idAgendamento);

    res.status(200).json(itens);
  } catch (error) {
    console.error("Erro ao buscar itens de agendamento:", error);
    res.status(500).json({ message: "Erro ao buscar itens de agendamento" });
  }
};*/

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await atendimentoModel.deleteAtendimento(id);
    res
      .status(200)
      .json({ message: "Item de atendimento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover item de atendimento:", error);
    res.status(500).json({ message: "Erro ao remover item de atendimento" });
  }
};

export default {
  getAll,
  getById,
  update,
  create,
  //getItensByAgendamento,
  deleteItem,
};
