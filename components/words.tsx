import WordBox from './wordBox';

type WordsProps = {
  words: string;
  keyword: string;
  isCurrent: boolean;
};

export default function Words({ words, keyword, isCurrent }: WordsProps) {
  const WORDS = isCurrent ? keyword.split('') : words?.split('');
  return (
    <div className='flex flex-row'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <WordBox key={idx} word={WORDS?.[idx] || ''} />
      ))}
    </div>
  );
}
