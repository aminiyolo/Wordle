import { useAlert } from '@/hook/useAlert';
import { useQuiz } from '@/hook/useQuiz';
import React from 'react';

export default function Alert() {
  const { isOpen, message, status } = useAlert();
  const { quiz } = useQuiz();
  const base = `text-black text-lg tracking-wide h-[2rem]`;

  if (!isOpen) return null;
  return (
    <div
      className={`absolute w-[22rem] -translate-x-1/2 -translate-y-1/3 top-[35%] left-[50%] z-10 bg-[#171717] rounded-md text-center 
      ${status === 'success' && 'h-[24rem]'}
      ${status === 'error' && `!bg-[#FFFFFF] ${base}`}
      ${status === 'fail' && `!bg-[#FECDD3] ${base}`}
      `}
    >
      <div className='h-[10rem] px-6'>
        <h1 className='my-[2px]'>
          {message} {status === 'fail' && <span>정답은 '{quiz}' 입니다! </span>}
        </h1>
        <div></div>
      </div>
    </div>
  );
}
