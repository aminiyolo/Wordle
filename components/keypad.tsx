import { useQuiz } from '@/hook/useQuiz';
import clsx from 'clsx';
import type { KeyboardProps } from './keyboard';

type KeypadProps = {
  keyword: string;
} & KeyboardProps;

export default function Keypad({ keyword, handleKeypadClick }: KeypadProps) {
  const { keypadCheck } = useQuiz();
  const isLong = keyword.length > 1;

  return (
    <button
      onClick={() => handleKeypadClick(keyword)}
      className={clsx(
        'bg-[#808384] h-[3rem] w-[2rem] text-center text-2xl !leading-[2.5rem] mx-1 my-1 rounded-md sm:w-11 sm:h-11 sm:!leading-[2.5rem] outline-none ',
        {
          'text-[0.8rem]': isLong,
          '!leading-[3.5]': isLong,
          'sm:w-14': isLong,
          '!bg-[#3A3A3C]': keypadCheck[keyword] === 1,
          '!bg-[#B49F3A]': keypadCheck[keyword] === 2,
          '!bg-[#32812b]': keypadCheck[keyword] === 3,
        },
      )}
    >
      {keyword}
    </button>
  );
}
