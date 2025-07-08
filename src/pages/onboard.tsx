import styles from '../styles/onboard.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Onboard() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [codigoRef, setCodigoRef] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/usuario/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha, codigoRef }),
    });

    const data = await res.json();
    setMensagem(res.ok ? 'Usuário cadastrado com sucesso!' : data.erro || 'Erro ao cadastrar');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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

        <label>Código de Referência:</label>
        <input
          type="text"
          value={codigoRef}
          onChange={(e) => setCodigoRef(e.target.value)}
        />

        <button type="submit" className={styles.button}>Cadastrar</button>

        <p className={styles.redirectText}>
          Caso já tenha uma conta,{' '}
          <span className={styles.link} onClick={() => router.push('/login')}>clique aqui</span>.
        </p>
      </form>

      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}
