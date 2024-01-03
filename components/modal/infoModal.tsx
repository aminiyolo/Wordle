import React from 'react';
import BaseModal from './baseModal';
import WordBox from '../wordBox';

const FIRST_EXAMPLE = {
  str: ['ㅌ', 'ㅐ', 'ㅇ', 'ㅑ', 'ㅇ'],
  info: `ㅌ은 '단어'에 포함되어 있으며, 올바른 위치에 있습니다.`,
  type: 'correct',
} as const;

const SECOND_EXAMPLE = {
  str: ['ㄱ', 'ㅗ', 'ㅇ', 'ㄱ', 'l'],
  info: `ㅇ는 '단어'에 포함되어 있지만, 다른 위치에 있습니다.`,
  type: 'include',
} as const;

const THIRD_EXAMPLE = {
  str: ['ㄱ', 'ㅗ', 'ㅇ', 'ㄱ', 'l'],
  info: `ㄱ은 단어에 포함되어 있지 않습니다.`,
  type: 'incorrect',
} as const;

const EXAMPLE_LIST = [FIRST_EXAMPLE, SECOND_EXAMPLE, THIRD_EXAMPLE];

type Example =
  | typeof FIRST_EXAMPLE
  | typeof SECOND_EXAMPLE
  | typeof THIRD_EXAMPLE;

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const ExampleContainer = ({ example }: { example: Example }) => {
  const isCorrect = example.type === 'correct';
  const include = example.type === 'include';
  const inCorrect = example.type === 'incorrect';

  return (
    <div className='flex flex-col items-center mb-4'>
      <div className='flex flex-row mb-1'>
        {example['str'].map((str, idx) => (
          <WordBox
            key={idx}
            word={str}
            info={true}
            isCorrect={isCorrect && idx === 0}
            isIncluded={include && idx === 2}
            isCurrent={inCorrect && idx === 3}
          />
        ))}
      </div>
      <p className='text-center'>{example.info}</p>
    </div>
  );
};

export default function InfoModal({ isOpen, handleClose }: Props) {
  return (
    <BaseModal title='게임 정보' isOpen={isOpen} handleClose={handleClose}>
      <div id='info' className='px-5'>
        <ul className='list-none mb-4 mx-2 text-center'>
          <li>WORDLE을 6번 만에 맞춰보세요. </li>
          <li>시도의 결과는 타일의 색 변화로 나타납니다. </li>
          <li>게임은 하루에 한번만 가능하며 밤 12시에 초기화 됩니다.</li>
        </ul>
        {EXAMPLE_LIST.map((example) => (
          <ExampleContainer key={example.type} example={example} />
        ))}
      </div>
    </BaseModal>
  );
}
