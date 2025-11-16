import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const auth = (req, res, next) => {
    // busca o token na header da requisição
    const token = req.headers.authorization;

    //se não existir o token, retorna erro
    if (!token)
        return res.status(401).json({ message: "Acesso negado" });

    try {
        const tokenLimpo = token.replace('Bearer ', '');
        //verifica se o token é válido e retorna os dados dele
        const dadosToken = jwt.verify(tokenLimpo, secret);
        //adiciona o id vindo do token dentro da requisição
        req.idUsuario = dadosToken.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        console.log(error);
    }
}