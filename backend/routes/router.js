import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

//importa controllers
import userController from '../controllers/userController.js';
import profissionalController from '../controllers/profissionalController.js';
import servicoController from '../controllers/servicoController.js';
import agendamentoController from '../controllers/agendamentoController.js';
import atendimentoController from '../controllers/atendimentoController.js';


//rotas de usuário
router.post('/cadastro', userController.userCadastro);
router.post('/login', userController.userLogin);

router.get('/profissionais', auth, profissionalController.getAll);
router.get('/profissionais/:id', auth, profissionalController.getById);
router.post('/profissionais', auth, profissionalController.create);
router.put('/profissionais/:id', auth, profissionalController.update);
router.post('/profissionais/delete/:id', auth, profissionalController.deleteProfissional); 

router.get('/servicos', auth, servicoController.getAll);
router.get('/servicos/:id', auth, servicoController.getById);
router.post('/servicos', auth, servicoController.create);
router.put('/servicos/:id', auth, servicoController.update);
router.post('/servicos/delete/:id', auth, servicoController.deleteServico); 

router.get('/agendamentos', auth, agendamentoController.getAll);
router.get('/agendamentos/:id', auth, agendamentoController.getById);
router.post('/agendamentos', auth, agendamentoController.create);
router.put('/agendamentos/:id', auth, agendamentoController.update);
router.post('/agendamentos/delete/:id', auth, agendamentoController.deleteAgendamento); 

router.get('/atendimentos', auth, atendimentoController.getAll);
router.get('/atendimentos/:id', auth, atendimentoController.getById);
router.post('/atendimentos', auth, atendimentoController.create);
router.put('/atendimentos/:id', auth, atendimentoController.update);
//router.get('/agendamentos/:idAgendamento/itens', auth, atendimentoController.getItensByAgendamento);
router.post('/atendimentos/delete/:id', auth, atendimentoController.deleteItem); 

export default router;
