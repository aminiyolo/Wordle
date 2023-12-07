import { useQuiz } from '@/hook/useQuiz';
import clsx from 'clsx';
import type { KeyboardProps } from './keyboard';

type KeypadProps = {
  keyword: string;
} & KeyboardProps;

export default function Keypad({ keyword, handleKeypadClick }: KeypadProps) {
  const { keypadCheck } = useQuiz();
  const isNotWord = keyword.length > 1; // Enter, <--

  return (
    <button
      onClick={() => handleKeypadClick(keyword)}
      className={clsx(
        'bg-[#808384] h-[3rem] w-[2rem] text-center text-2xl !leading-[2.5rem] mx-1 my-1 rounded-md sm:w-11 sm:h-11 sm:!leading-[2.5rem] outline-none ',
        {
          'text-[0.8rem]': isNotWord,
          '!leading-[3.5]': isNotWord,
          'sm:w-14': isNotWord,
          // 1 -> 정답에 포함x, 2 -> 정답에 포함 되어 있지만 다른 위치, 3 -> 정답 및 올바른 위치
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
