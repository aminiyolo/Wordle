import { useEffect, useState } from 'react';
import { StatusType } from '@/context/quizProvider';
import { useQuiz } from '@/hook/useQuiz';

type WordBoxProps = {
  word: string;
  isCurrent: boolean;
  info?: boolean;
  example?: string;
  type: StatusType;
};

export default function WordBox({
  type,
  isCurrent,
  word = '',
  info = false,
}: WordBoxProps) {
  const { setKeypadCheck } = useQuiz();
  const [animation, setAnimation] = useState(false);
  const valid = word && !isCurrent;

  const bgColor: Record<string, string> = {
    correct: '!bg-[#32812b]',
    include: '!bg-[#B49F3A]',
    incorrect: '!bg-[#1e1c1c]',
  };

  useEffect(
    function changeKeypadStatus() {
      // info modal에서 예시로 사용 중인 경우
      if (info) return;
      if (type && valid) {
        setKeypadCheck((prev) => ({ ...prev, [word]: type }));
      }
    },
    [isCurrent, info, word],
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

  const exampleColor = bgColor[type] || '#3b3c3a';
  const validColor = valid && bgColor[type];
  const color = info ? exampleColor : validColor;
  return (
    <div className='mx-1 my-1'>
      <div
        className={`${color} p-4 px-3 w-14 h-14 bg-[#3b3c3a] text-center text-3xl leading-[0.8] rounded-sm
          ${animation ? 'scale-[1.2]' : 'scale-[1]'}`}
      >
        {word}
      </div>
    </div>
  );
}
