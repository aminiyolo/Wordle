import { useOutsideClick } from '@/hook/useOutsideClick';
import { motion } from 'framer-motion';
import React, { ReactNode, useEffect, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  handleClose: () => void;
};

export default function BaseModal({
  children,
  title,
  isOpen,
  handleClose,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, handleClose);

  useEffect(() => {
    const pressESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };

    window.addEventListener('keydown', pressESC);
    return () => window.removeEventListener('keydown', pressESC);
  }, [handleClose, isOpen]);

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        id='dimmed'
        className='fixed inset-0 min-h-screen bg-neutral-900 bg-opacity-75 transition-opacity'
      />
      <div
        ref={ref}
        className='absolute w-[27rem] h-[32rem] rounded-md bg-neutral-900 left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <button className='absolute right-4' onClick={handleClose}>
            <IoCloseOutline className='w-6 h-6' />
          </button>
          <div className='mt-4 pt-6 flex flex-col items-center'>
            <div>{title}</div>
            <div className='mt-4'>{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
