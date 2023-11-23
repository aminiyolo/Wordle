import WordBox from './wordBox';

export default function Words() {
  return (
    <div className='flex flex-row'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <WordBox key={idx} />
      ))}
    </div>
  );
}
