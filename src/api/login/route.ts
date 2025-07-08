import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

export default async function POST(
	req: NextApiRequest, 
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Método não permitido' });
	}

	try {
		const { email, password } = req.body.data;

		// 1. Encontra o usuário pelo e-mail
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// 2. Compara a senha do banco (texto plano) com a senha enviada
		if (!user || user.password !== password) {
			return res.status(401).json({ message: 'Esta combinação de e-mail e senha está incorreta!' });
		}
		
		// 3. Em caso de sucesso, retorna o ID do usuário
		res.status(200).json({ 
			message: 'Login bem-sucedido!',
			userId: user.id 
		});
	} catch (error) {
		console.error('Erro ao fazer login:', error);
		res.status(500).json({ message: 'Erro interno do servidor.' });
	}
}
