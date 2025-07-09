import styles from '../styles/login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email, password: senha } }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagem('Login realizado com sucesso!');
        setTimeout(() => {
          if (data.userId) {
            localStorage.setItem('userId', data.userId);
            router.push('/account/' + data.userId);
          }
        }, 1000);
      } else {
        setMensagem(data.message || 'Erro ao fazer login');
      }
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <div className={styles.senhaWrapper}>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
          />
          
          <button
            type="button"
            className={styles.olho}
            onClick={() => setMostrarSenha((prev) => !prev)}
            aria-label="Mostrar ou ocultar senha"
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className={styles.button}>Entrar</button>

        <p className={styles.redirectText}>
          Caso não tenha uma conta,{' '}
          <span className={styles.link} onClick={() => router.push('/onboard')}>clique aqui</span>.
        </p>
      </form>

      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}
