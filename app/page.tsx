'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/header';
import Main from '@/components/main';
import InfoModal from '@/components/infoModal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const handleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <main className='w-full h-full'>
      <Header handleModal={handleModal} />
      <Main />
      {isOpen && <InfoModal isOpen={isOpen} handleModal={handleModal} />}
    </main>
  );
}
