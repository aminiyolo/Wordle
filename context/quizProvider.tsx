import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getQuiz } from '@/utils/getQuiz';

export type CheckType = Record<string, number>;
export type KeypadCheckType = Record<string, string>;

type QuizContextType = {
  quiz: string[];
  keypadCheck: KeypadCheckType;
  check: CheckType;
  success: boolean;
  fail: boolean;
  guess: string[];
  currentIdx: number;
  setCurrentIdx: Dispatch<SetStateAction<number>>;
  setGuess: Dispatch<SetStateAction<string[] | null>>;
  setKeypadCheck: Dispatch<SetStateAction<KeypadCheckType>>;
};

export const QuizContext = createContext<QuizContextType | null>(null);

export default function QuizProvider({ children }: { children: ReactNode }) {
  const [guess, setGuess] = useState<string[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const quiz = getQuiz();

  const success = !!guess?.some((record: string) => record === quiz.join(''));
  const fail = guess?.filter((record: string) => record).length === 6;

  const [keypadCheck, setKeypadCheck] = useState<KeypadCheckType>({});
  const [quizCheck, _] = useState<CheckType>(() => {
    const check: CheckType = {};
    quiz.forEach((q) => {
      if (check[q]) {
        check[q] = check[q] + 1;
      } else {
        check[q] = 1;
      }
    });
    return check;
  });

  useEffect(() => {
    if (localStorage.getItem('history')) {
      const history = JSON.parse(localStorage.getItem('history') ?? '{}');
      setGuess(history.records);
      setCurrentIdx(history.currentIdx);
    } else {
      setGuess(['', '', '', '', '', '']);
      setCurrentIdx(0);
    }
  }, []);

  if (guess === null || currentIdx === null) return null;
  return (
    <QuizContext.Provider
      value={{
        quiz,
        keypadCheck,
        fail,
        success,
        guess,
        currentIdx,
        check: quizCheck,
        setCurrentIdx,
        setKeypadCheck,
        setGuess,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
