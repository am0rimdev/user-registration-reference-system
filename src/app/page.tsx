'use client';

/**
* @author: Emilly Júnia, Micael Pereira, Nífane Borges e Vínicius Alves Amorim
* @description: Página inicial que redireciona automaticamente o usuário para a tela de login.
*/

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return null;
}
