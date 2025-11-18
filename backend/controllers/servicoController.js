import servicoModel from "../models/servicoModel.js";

const getAll = async (req, res) => {
  try {
    const servicos = await servicoModel.getAllServicos();
    res.status(200).json(servicos);
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    res.status(500).json({ message: "Erro ao listar serviços" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await servicoModel.getServicoById(id);

    if (!servico) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    res.status(200).json(servico);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    res.status(500).json({ message: "Erro ao buscar serviço" });
  }
};

const create = async (req, res) => {
  try {
    const { nome_servico, descricao_servico, preco_servico, fk_profissional } = req.body;
    const novoServico = await servicoModel.insertServico(
      nome_servico,
      descricao_servico,
      preco_servico,
      fk_profissional
    );
    res
      .status(201)
      .json({ message: "Serviço criado com sucesso", servico: novoServico });
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    res.status(500).json({ message: "Erro ao criar serviço" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_servico, descricao_servico, preco_servico, fk_profissional } = req.body;
    const servicoAtualizado = await servicoModel.updateServico(
      id,
      nome_servico,
      descricao_servico,
      preco_servico,
      fk_profissional
    );
    res
      .status(200)
      .json({ message: "Serviço atualizado", servico: servicoAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    res.status(500).json({ message: "Erro ao atualizar serviço" });
  }
};

const deleteServico = async (req, res) => {
  try {
    const { id } = req.params;
    await servicoModel.deleteServico(id);
    res.status(200).json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover serviço:", error);
    res.status(500).json({ message: "Erro ao remover serviço" });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteServico,
};
