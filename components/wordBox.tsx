import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { KeypadCheckType } from '@/context/quizProvider';

type WordBoxProps = {
  isCorrect: boolean;
  word: string;
  isCurrent: boolean;
  isIncluded: boolean;
  info?: boolean;
  setKeypadCheck?: Dispatch<SetStateAction<KeypadCheckType>>;
};

export default function WordBox({
  isCorrect,
  isCurrent,
  isIncluded,
  word = '',
  info = false,
  setKeypadCheck = () => {},
}: WordBoxProps) {
  const [animation, setAnimation] = useState(false);
  const incorrect = !isCurrent && !isCorrect && !isIncluded && word;
  const correct = !isCurrent && isCorrect && word;
  const include = !isCurrent && !isCorrect && isIncluded && word;

  useEffect(
    function changeKeypadStatus() {
      // info modal에서 예시로 사용 중인 경우
      if (info) return;

      // 정답에 포함x,
      if (incorrect)
        setKeypadCheck((prev) => ({ ...prev, [word]: 'incorrect' }));

      // 정답에 포함되있지만 다른 위치
      if (include) setKeypadCheck((prev) => ({ ...prev, [word]: 'include' }));

      // 정답 및 올바른 위치
      if (correct) setKeypadCheck((prev) => ({ ...prev, [word]: 'correct' }));
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

  return (
    <div className='mx-1 my-1'>
      <div
        className={`
          p-4 px-3 w-14 h-14 bg-[#1e1c1c] text-center text-3xl leading-[0.8] rounded-sm
          ${incorrect && '!bg-[#3b3c3a]'} 
          ${include && '!bg-[#B49F3A]'}
          ${correct && '!bg-[#32812b]'} 
          ${animation ? 'scale-[1.2]' : 'scale-[1]'}`}
      >
        {word}
      </div>
    </div>
  );
}
