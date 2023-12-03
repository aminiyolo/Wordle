import Words from './words';

type PlayGroundProps = {
  keyword: string;
  currentIdx: number;
  records: string[];
  answer: string[];
};

export default function PlayGround({
  keyword,
  currentIdx,
  records,
  answer,
}: PlayGroundProps) {
  return (
    <div className='flex flex-col items-center w-[20rem] h-[23rem] mx-auto mt-[5.5rem] sm:mt-[3.5rem]'>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Words
          key={idx}
          answer={answer}
          isCurrent={currentIdx === idx}
          words={
            currentIdx === idx ? keyword.split('') : records?.[idx].split('')
          }
        />
      ))}
    </div>
  );
}
