import { useQuiz } from '@/hook/useQuiz';
import clsx from 'clsx';
import type { KeyboardProps } from './keyboard';

type KeypadProps = {
  keyword: string;
} & KeyboardProps;

export default function Keypad({ keyword, handleKeypadClick }: KeypadProps) {
  const { keypadCheck } = useQuiz();
  const isNotWord = keyword.length > 1; // Enter, <--

  const bgColor: Record<string, string> = {
    incorrect: '!bg-[#3A3A3C]',
    include: '!bg-[#B49F3A]',
    correct: '!bg-[#32812b]',
  };

  return (
    <button
      onClick={() => handleKeypadClick(keyword)}
      className={clsx(
        `${bgColor[keypadCheck[keyword]]} 
        bg-[#808384] h-[3rem] w-[2rem] text-center text-2xl !leading-[2.5rem] mx-1 my-1 rounded-md sm:w-11 sm:h-11 sm:!leading-[2.5rem] outline-none `,
        { 'text-[0.8rem] !leading-[3.5] sm:w-14': isNotWord },
      )}
    >
      {keyword}
    </button>
  );
}
