'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/header';
import Main from '@/components/main';
import InfoModal from '@/components/infoModal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <main className='w-full h-full'>
      <Header handleOpen={handleOpen} />
      <Main />
      {isOpen && <InfoModal isOpen={isOpen} handleClose={handleClose} />}
    </main>
  );
}
