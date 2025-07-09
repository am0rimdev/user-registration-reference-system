/**
* @author: Emilly Júnia, Micael Pereira, Nífane Borges e Vínicius Alves Amorim
* @description: API para consulta de dados da conta do usuário, como número de referências e bônus recebido.
*/

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

export default async function GET(
    req: NextApiRequest, 
    res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Método não permitido' });
	}

	// 1. Pega o ID do usuário do parâmetro da URL
	const { userId } = req.query;
	const userIdStr = Array.isArray(userId) ? userId[0] : userId;

	if (!userIdStr) {
		return res.status(400).json({ message: 'ID do usuário não fornecido.' });
	}

	try {
		// 2. Busca os dados do usuário usando o ID
		const user = await prisma.user.findUnique({
			where: { id: parseInt(userIdStr) },
			include: {
				_count: {
					select: { referredUsers: true },
				},
			},
		});

		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}
		
		// 3. Calcula o número de referências e o bônus
		const referralCount = user._count.referredUsers;
		const bonusReceived = referralCount * 5.00;
		
		res.status(200).json({
			referralCount,
			bonusReceived,
		});
	} catch (error) {
		console.error('Erro ao buscar dados da conta:', error);
		res.status(500).json({ message: 'Erro ao buscar dados da conta.' });
	}
}
