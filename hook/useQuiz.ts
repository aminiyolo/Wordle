import { QuizContext } from '@/context/quizProvider';
import { useContext } from 'react';

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('you should use in QuizProvider');
  }

  return context;
}
