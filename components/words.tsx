import WordBox from './wordBox';

type WordsProps = {
  words: string[];
  isCurrent: boolean;
  answer: string[];
};

export default function Words({ words, isCurrent, answer }: WordsProps) {
  return (
    <div className='flex flex-row'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <WordBox
          key={idx}
          word={words?.[idx]}
          isSame={answer[idx] === words?.[idx]}
          isIncluded={answer.some((q) => q === words?.[idx])}
          isCurrent={isCurrent}
        />
      ))}
    </div>
  );
}
