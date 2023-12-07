import Words from './words';

type PlayGroundProps = {
  keyword: string;
  currentIdx: number;
  records: string[];
};

export default function PlayGround({
  keyword,
  currentIdx,
  records,
}: PlayGroundProps) {
  return (
    <div className='flex flex-col items-center w-[20rem] h-[23rem] mx-auto mt-[5.5rem] sm:mt-[3.5rem]'>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Words
          key={idx}
          isCurrent={currentIdx === idx}
          words={
            currentIdx === idx ? keyword.split('') : records?.[idx].split('')
          }
        />
      ))}
    </div>
  );
}
