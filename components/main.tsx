'use client';

import { useCallback, useEffect, useState } from 'react';

import { useInitStorage } from '@/hook/useInitStorage';
import { useSetStorage } from '@/hook/useSetStorage';
import Keyboard from './keyboard';
import PlayGround from './playGround';
import { WORDS } from '@/constant/words';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth();
const DAY = TODAY.getDate();
const QUIZ = WORDS[YEAR - MONTH * DAY].split('');

export default function Main() {
  const currentIdx = parseInt(localStorage.getItem('currentIdx') as string);
  const records = JSON.parse(localStorage.getItem('playground') as string);
  const [keyword, setKeyword] = useState<string>('');

  const handleDelete = useCallback(() => {
    if (keyword.length === 0) return;
    setKeyword((prev) => prev.slice(0, prev.length - 1));
  }, [keyword, setKeyword]);

  const handleEnter = useCallback(() => {
    if (keyword.length < 5) return;

    const newRecords = [...records];
    newRecords[currentIdx] = keyword;

    useSetStorage('currentIdx', currentIdx + 1);
    useSetStorage('playground', newRecords);
    setKeyword('');
  }, [keyword, setKeyword]);

  const handleKeypadClick = useCallback(
    (word: string) => {
      if (keyword === '<--') handleDelete();
      if (keyword.length > 4) word === 'Enter' && handleEnter();
      else setKeyword((prev) => prev + word);
    },
    [keyword, setKeyword, handleEnter],
  );

  useInitStorage(records, currentIdx);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(e.key)) handleKeypadClick(e.key); // 한글 입력 시
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Enter') handleEnter();
    };

    window.addEventListener('keyup', handler);
    return () => window.removeEventListener('keyup', handler);
  }, [handleKeypadClick, handleDelete, handleEnter]);

  return (
    <>
      <PlayGround
        keyword={keyword}
        currentIdx={currentIdx}
        records={records}
        answer={QUIZ}
      />
      <Keyboard handleKeypadClick={handleKeypadClick} />
    </>
  );
}
