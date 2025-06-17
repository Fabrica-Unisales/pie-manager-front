"use client";
import { useEffect } from 'react';
import { buildMocks } from '@/mocks/mocksFactory';

export default function HomePage() {
  useEffect(() => {
    const MOCKS_INITIALIZED_FLAG = 'app_mocks_initialized_flag';

    if (typeof window !== 'undefined' && !localStorage.getItem(MOCKS_INITIALIZED_FLAG)) {
      buildMocks();
      localStorage.setItem(MOCKS_INITIALIZED_FLAG, 'true');
    }
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bem-vindo ao Front-end do PIE Manager!</h1>
      <p>Os dados de exemplo (mocks) da aplicação serão carregados automaticamente na inicialização, se não houver dados existentes no seu navegador.</p>
      <p>Navegue pelo menu lateral para explorar as funcionalidades.</p>
    </div>
  );
}
