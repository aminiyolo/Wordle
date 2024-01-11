import { useQuiz } from '@/hook/useQuiz';
import { useCallback } from 'react';
import WordBox from './wordBox';

type WordsProps = {
  words: string[];
  isCurrent: boolean;
};

export default function Words({ words, isCurrent }: WordsProps) {
  const { quiz, check: _check } = useQuiz();
  const check = { ..._check };

  const isIncluded = useCallback(
    (word: string) => {
      if (check[word]) {
        check[word] -= 1;
        return true;
      }
      return false;
    },
    [check],
  );

  return (
    <div className='flex flex-row'>
      {Array.from({ length: 5 }).map((_, idx) => {
        const type =
          quiz[idx] === words?.[idx]
            ? 'correct'
            : isIncluded(words?.[idx])
            ? 'include'
            : 'incorrect';
        return (
          <WordBox
            key={idx}
            word={words?.[idx]}
            type={type}
            isCurrent={isCurrent}
          />
        );
      })}
    </div>
  );
}
