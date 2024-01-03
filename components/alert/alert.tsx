'use client';
import { useAlert } from '@/hook/useAlert';
import { useQuiz } from '@/hook/useQuiz';
import React from 'react';

export default function Alert() {
  const { isOpen, message, status } = useAlert();
  const { quiz } = useQuiz();

  if (isOpen) {
    return (
      <div
        className={`absolute w-[22rem] -translate-x-1/2 -translate-y-1/3 top-[25%] left-[50%] z-10 bg-[#171717] rounded-md text-center text-black text-lg tracking-wide h-[2rem]
      ${status === 'success' && `bg-[#22C55D] text-white w-[23rem] h-[2.2rem]`}
      ${status === 'error' && `!bg-[#FFFFFF]`}
      ${status === 'fail' && `!bg-[#FECDD3]`}
      `}
      >
        <div className='h-[10rem] px-6'>
          <h1 className='my-[2px]'>
            {message}
            {['fail', 'success'].includes(status) && (
              <span className='px-[6px]'>정답은 '{quiz}' 입니다!</span>
            )}
          </h1>
          <div></div>
        </div>
      </div>
    );
  }

  return null;
}
