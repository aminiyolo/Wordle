import { FaQuestionCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className='relative min-w-[5rem] bg-gray-500 h-[4.5rem] flex justify-center items-center'>
      <div className='text-3xl font-semibold'>Wordle</div>
      <button
        id='info'
        className='absolute left-3/4 text-2xl sm:left-2/3 hover:cursor'
      >
        <FaQuestionCircle />
      </button>
    </header>
  );
}
