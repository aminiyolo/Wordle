import Words from './words';

export default function PlayGround() {
  return (
    <div className='flex flex-col items-center w-[20rem] h-[23rem] mx-auto mt-[5.5rem] sm:mt-[3.5rem]'>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Words key={idx} />
      ))}
    </div>
  );
}
