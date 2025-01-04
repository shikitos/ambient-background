'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Authentication Successful</h1>
      <p>Redirecting you to your dashboard...</p>
    </div>
  );
}
