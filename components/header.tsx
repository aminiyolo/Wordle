import { FaQuestionCircle } from 'react-icons/fa';

type HeaderProps = { handleOpen: (e: MouseEvent) => void };

export default function Header({ handleOpen }: HeaderProps) {
  return (
    <header className='relative min-w-[5rem] bg-gray-500 h-[4.5rem] flex justify-center items-center'>
      <div className='text-3xl font-semibold'>Wordle</div>
      <button
        id='info'
        onClick={(e) => handleOpen(e)}
        className='absolute left-3/4 text-2xl sm:left-2/3 outline-none hover:cursor'
      >
        <FaQuestionCircle />
      </button>
    </header>
  );
}
