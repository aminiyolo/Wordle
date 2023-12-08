import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { WORDS } from '@/constant/words';

type CheckType = Record<string, number>;

type QuizContextType = {
  quiz: string[];
  keypadCheck: CheckType;
  check: CheckType;
  setKeypadCheck: Dispatch<SetStateAction<CheckType>>;
};

export const QuizContext = createContext<QuizContextType | null>(null);

export default function QuizProvider({ children }: { children: ReactNode }) {
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth();
  const DAY = TODAY.getDate();
  const quiz = WORDS[YEAR - MONTH * DAY].split('');

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

  return (
    <QuizContext.Provider
      value={{ quiz, keypadCheck, setKeypadCheck, check: quizCheck }}
    >
      {children}
    </QuizContext.Provider>
  );
}
