import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

//importa controllers
import userController from '../controllers/userController.js';

//rotas de usuário
router.post('/cadastro', userController.userCadastro);
router.post('/login', userController.userLogin);

export default router;