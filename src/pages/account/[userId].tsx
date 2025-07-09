import styles from '../../styles/account.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AccountById() {
  const [referencias, setReferencias] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) return;
    async function carregarDados() {
      if (!userId || typeof userId !== 'string') {
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
  }, [router, userId]);

  const handleSair = async () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  if (carregando) return <div className={styles.container}>Carregando...</div>;

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
