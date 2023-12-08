import { useEffect, useState } from 'react';
import { useQuiz } from '@/hook/useQuiz';

type WordBoxProps = {
  isCorrect: boolean;
  word: string;
  isCurrent: boolean;
  isIncluded: boolean;
};

export default function WordBox({
  word = '',
  isCorrect,
  isCurrent,
  isIncluded,
}: WordBoxProps) {
  const [animation, setAnimation] = useState(false);
  const { setKeypadCheck } = useQuiz();

  useEffect(
    function changeKeypadStatus() {
      if (isCurrent || !word) return;

      // 1 -> 정답에 포함x,
      if (!isCorrect && !isIncluded)
        setKeypadCheck((prev) => ({ ...prev, [word]: 1 }));

      // 2 -> 정답에 포함되있지만 다른 위치
      if (!isCorrect && isIncluded)
        setKeypadCheck((prev) => ({ ...prev, [word]: 2 }));

      //3 -> 정답 및 올바른 위치
      if (isCorrect) setKeypadCheck((prev) => ({ ...prev, [word]: 3 }));
    },
    [isCurrent],
  );

  useEffect(
    function makeAnimation() {
      if (word && isCurrent) {
        setAnimation(true);

        setTimeout(() => {
          setAnimation(false);
        }, 50);
      }
    },
    [word],
  );

  const inCorrect = !isCurrent && !isCorrect && word;
  return (
    <div className='mx-1 my-1'>
      <div
        className={`
          p-4 px-3 w-14 h-14 bg-[#1e1c1c] text-center text-3xl leading-[0.8] rounded-sm
          ${inCorrect && !isIncluded && '!bg-[#3b3c3a]'} 
          ${inCorrect && isIncluded && '!bg-[#B49F3A]'}
          ${!isCurrent && isCorrect && '!bg-[#32812b]'} 
          ${animation ? 'scale-[1.2]' : 'scale-[1]'}`}
      >
        {word}
      </div>
    </div>
  );
}
