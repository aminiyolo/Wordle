import cn from 'classnames';

type WordBoxProps = {
  isSame: boolean;
  word: string;
  isCurrent: boolean;
  isIncluded: boolean;
};

export default function WordBox({
  isSame,
  word = '',
  isCurrent,
  isIncluded,
}: WordBoxProps) {
  const inCorrect = !isCurrent && !isSame;
  return (
    <div className='mx-1 my-1'>
      <div
        className={cn(
          'p-4 px-3 w-14 h-14 bg-blue-500 text-center text-3xl leading-[0.8] rounded-sm',
          !isCurrent && isSame && 'bg-emerald-600', // correct
          inCorrect && !isIncluded && word && 'bg-gray-400', // incorrect
          inCorrect && isIncluded && 'bg-yellow-400', // incorrect but, answer has this letter
        )}
      >
        {word}
      </div>
    </div>
  );
}
