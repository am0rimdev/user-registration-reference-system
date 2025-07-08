'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        User Registration Reference System
      </h1>
      <p className="mt-4">
        This is a simple application to demonstrate user registration with
        referral codes.
      </p>
      <br />
      <button onClick={() => router.push('/login')}>
        || Tela Login |
      </button>
      <button onClick={() => router.push('/account')}>
        | Tela Account |
      </button>
      <button onClick={() => router.push('/onboard')}>
        | Tela Onboard ||
      </button>
    </div>
  );
}
