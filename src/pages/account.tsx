import styles from '../styles/account.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Account() {
  const [referencias, setReferencias] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function carregarDados() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Usuário não autenticado. Redirecionando para login...');
        router.push('/login');
        return;
      }

      const res = await fetch(`/api/account?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        setReferencias(data.referralCount);
        setValorRecebido(data.bonusReceived);
      } else {
        alert('Erro ao carregar dados. Redirecionando para login...');
        router.push('/login');
      }

      setCarregando(false);
    }
    
    carregarDados();
  }, [router]);

  const handleSair = async () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
        <p>Número de Referências:</p>
        <div className={styles.valorCaixa}>{referencias}</div>
        </div>

        <div>
        <p>Valor Recebido:</p>
        <div className={styles.valorCaixa}>R$ {valorRecebido.toFixed(2)}</div>
        </div>

        <button onClick={handleSair} className={styles.button}>Sair</button>
        </div>
    </div>
  );
}
