import agendamentoModel from "../models/agendamentoModel.js";

const getAll = async (req, res) => {
  try {
    const agendamentos = await agendamentoModel.getAllAgendamentos();
    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ message: "Erro ao listar agendamentos" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await agendamentoModel.getAgendamentoById(id);

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ message: "Erro ao buscar agendamento" });
  }
};

const create = async (req, res) => {
  try {
    const { data, hora, nome_cliente, status, observacao } = req.body;
    const novoAgendamento = await agendamentoModel.insertAgendamento(
      data,
      hora,
      nome_cliente,
      status,
      observacao
    );
    res
      .status(201)
      .json({
        message: "Agendamento criado com sucesso",
        agendamento: novoAgendamento,
      });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro ao criar agendamento" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, hora, nome_cliente, status, observacao } = req.body;
    const agendamentoAtualizado = await agendamentoModel.updateAgendamento(
      id,
      data,
      hora,
      nome_cliente,
      status,
      observacao
    );
    res
      .status(200)
      .json({
        message: "Agendamento atualizado",
        agendamento: agendamentoAtualizado,
      });
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(500).json({ message: "Erro ao atualizar agendamento" });
  }
};

const deleteAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    await agendamentoModel.deleteAgendamento(id);
    res.status(200).json({ message: "Agendamento removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
    res.status(500).json({ message: "Erro ao remover agendamento" });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteAgendamento,
};
