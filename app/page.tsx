'use client';

import React, { useCallback, useState } from 'react';
import Header from '@/components/header';
import Main from '@/components/main';
import InfoModal from '@/components/modal/infoModal';
import QuizProvider from '@/context/quizProvider';
import { AlertProvider } from '@/context/alertProvider';
import Alert from '@/components/alert/alert';

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
      <QuizProvider>
        <AlertProvider>
          <Main />
          <Alert />
        </AlertProvider>
      </QuizProvider>
      {isOpen && <InfoModal isOpen={isOpen} handleClose={handleClose} />}
    </main>
  );
}
