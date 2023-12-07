import { createContext, ReactNode } from 'react';
import { WORDS } from '@/constant/words';

type QuizContextType = {
  quiz: string[];
};

export const QuizContext = createContext<QuizContextType | null>(null);

export default function QuizProvider({ children }: { children: ReactNode }) {
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth();
  const DAY = TODAY.getDate();
  const QUIZ = WORDS[YEAR - MONTH * DAY].split('');

  return (
    <QuizContext.Provider value={{ quiz: QUIZ }}>
      {children}
    </QuizContext.Provider>
  );
}
