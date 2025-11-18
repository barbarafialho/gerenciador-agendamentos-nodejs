import profissionalModel from "../models/profissionalModel.js";

const getAll = async (req, res) => {
  try {
    const profissionais = await profissionalModel.getAllProfissionais();
    res.status(200).json(profissionais);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    res.status(500).json({ message: "Erro ao listar profissionais" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const profissional = await profissionalModel.getProfissionalById(id);

    if (!profissional) {
      return res.status(404).json({ message: "Profissional não encontrado" });
    }

    res.status(200).json(profissional);
  } catch (error) {
    console.error("Erro ao buscar profissional:", error);
    res.status(500).json({ message: "Erro ao buscar profissional" });
  }
};

const create = async (req, res) => {
  try {
    const { nome_profissional, telefone, especialidade } = req.body;
    const novoProfissional = await profissionalModel.insertProfissional(
      nome_profissional,
      telefone,
      especialidade
    );
    res
      .status(201)
      .json({
        message: "Profissional cadastrado com sucesso",
        profissional: novoProfissional,
      });
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    res.status(500).json({ message: "Erro ao cadastrar profissional" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_profissional, telefone, especialidade } = req.body;
    const profissionalAtualizado = await profissionalModel.updateProfissional(
      id,
      nome_profissional,
      telefone,
      especialidade
    );
    res
      .status(200)
      .json({
        message: "Profissional atualizado",
        profissional: profissionalAtualizado,
      });
  } catch (error) {
    console.error("Erro ao atualizar profissional:", error);
    res.status(500).json({ message: "Erro ao atualizar profissional" });
  }
};

const deleteProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    await profissionalModel.deleteProfissional(id);
    res.status(200).json({ message: "Profissional removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover profissional:", error);
    res.status(500).json({ message: "Erro ao remover profissional" });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteProfissional,
};
