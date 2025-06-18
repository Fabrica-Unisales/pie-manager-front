'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('loggedUser'); // ou 'users' se preferir
    if (user) {
      router.push('/home'); // Se estiver logado, vai para home
    } else {
      router.push('/login'); // Se não estiver logado, vai para login
    }
  }, [router]);

  return null;
}
