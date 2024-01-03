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

type QuizContextType = {
  quiz: string[];
  keypadCheck: CheckType;
  check: CheckType;
  success: boolean;
  fail: boolean;
  guess: string[];
  currentIdx: number;
  setCurrentIdx: Dispatch<SetStateAction<number>>;
  setGuess: Dispatch<SetStateAction<string[] | null>>;
  setKeypadCheck: Dispatch<SetStateAction<CheckType>>;
};

export const QuizContext = createContext<QuizContextType | null>(null);

export default function QuizProvider({ children }: { children: ReactNode }) {
  const [guess, setGuess] = useState<string[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const quiz = getQuiz();

  const success = !!guess?.some((record: string) => record === quiz.join(''));
  const fail = guess?.filter((record: string) => record).length === 6;

  // 1 -> 정답에 포함x, 2 -> 정답에 포함되있지만 다른 위치, 3 -> 정답 및 올바른 위치
  const [keypadCheck, setKeypadCheck] = useState<CheckType>({});
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
