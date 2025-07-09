'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/page.module.css';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Tela de Início
        </h1>
        <br />
        <button onClick={() => router.push('/login')} className={styles.button}>
          Login
        </button>
        <button onClick={() => router.push('/account')} className={styles.button}>
          Account
        </button>
        <button onClick={() => router.push('/onboard')} className={styles.button}>
          Onboard
        </button>
      </div>
    </div>
  );
}
