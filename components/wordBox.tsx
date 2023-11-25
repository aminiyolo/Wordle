type WordBoxProps = { word: string };

export default function WordBox({ word }: WordBoxProps) {
  return (
    <div className='mx-1 my-1'>
      <div className='p-4 px-3 w-14 h-14 bg-blue-500 text-center text-3xl leading-[0.8] rounded-sm'>
        {word}
      </div>
    </div>
  );
}
