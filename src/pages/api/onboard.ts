/**
* @author: Emilly Júnia, Micael Pereira, Nífane Borges e Vínicius Alves Amorim
* @description: API para cadastro de novos usuários, validação de e-mail, código de referência e criação no banco.
*/

import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function findUserByEmail(email: string) {
    const account = await prisma.user.findUnique({
        where: { email },
    });
    
    return account;
}

// Função para gerar um código alfanumérico aleatório
function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6; // Tamanho do código de referência
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Método não permitido' });
	}

    try {
        const { email, password, inputReferralCode } = await req.body.data;

        if (!isValidEmail(email)) {
            throw new Error("Formato de e-mail inválido");
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new Error("Email já cadastrado");
        }

        const referralCode = generateReferralCode();

        let referredById: number | undefined = undefined;

        // Se o usuário passou um código de referência, tenta encontrar o usuário correspondente
        if (inputReferralCode) {
            const referringUser = await prisma.user.findUnique({
                where: { referralCode: inputReferralCode }
            });
            
            if (!referringUser) {
                return res.status(400).json({ message: "Código de referência inválido" });
            }
            
            referredById = referringUser.id;
        }

        const createdAccount = await prisma.user.create({
            data: {
                email,
                password,
                referralCode,
                bonus: 0,
                referredById: referredById ?? null,
            },
        });

        return res.status(201).json({
            message: "Conta criada com sucesso",
            data: {
                id: createdAccount.id,
                referralCode: createdAccount.referralCode,
            }
        });
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
