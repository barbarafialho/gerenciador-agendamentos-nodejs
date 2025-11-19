import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userCadastro = async (req, res) => {
    try {
        const user = req.body;

        if (await userModel.getUserByEmail(user.email))
            return res.status(409).json({ message: 'Usuário já cadastrado' });

        //hash da senha
        const senhaHash = await bcrypt.hash(user.senha, 10);

        //insere no banco com a senha hasheada
        await userModel.insertUser(user.email, senhaHash);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });        
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar usuário"});
        console.error('Erro no cadastro:', error);
    }
}

const userLogin = async (req, res) => {
    try {
        const user = req.body;
        const userFound = await userModel.getUserByEmail(user.email);
        
        //verifica se existe
        if (!userFound) 
            return res.status(404).json({ message: 'Usuário não encontrado' });

        const comparaSenha = bcrypt.compare(user.senha, userFound.senha);
        if (!comparaSenha)
            return res.status(401).json({ message: 'Senha incorreta' });

        //se tudo ok, gera o token
        const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer login"});
        console.error('Erro no login:', error);
    }
}

export default {
    userLogin,
    userCadastro
}
