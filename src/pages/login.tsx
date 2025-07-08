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

    const res = await fetch('/api/usuario/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    setMensagem(res.ok ? 'Login realizado com sucesso!' : data.erro || 'Erro ao fazer login');
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
