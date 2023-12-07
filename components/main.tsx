'use client';

import { useCallback, useEffect, useState } from 'react';
import QuizProvider from '@/context/quizProvider';
import { useInitStorage } from '@/hook/useInitStorage';
import { useSetStorage } from '@/hook/useSetStorage';
import Keyboard from './keyboard';
import PlayGround from './playGround';

export default function Main() {
  const history = JSON.parse(localStorage.getItem('history') as string);
  const [keyword, setKeyword] = useState<string>('');

  const handleDelete = useCallback(() => {
    if (keyword.length === 0) return;
    setKeyword((prev) => prev.slice(0, prev.length - 1));
  }, [keyword, setKeyword]);

  const handleEnter = useCallback(() => {
    if (keyword.length < 5) return;

    const newRecords = [...history.records];
    newRecords[history.currentIdx] = keyword;

    useSetStorage('currentIdx', history.currentIdx + 1);
    useSetStorage('records', newRecords);
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

  useInitStorage(); // localStorage init
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
    <QuizProvider>
      <PlayGround
        keyword={keyword}
        currentIdx={history?.currentIdx}
        records={history?.records}
      />
      <Keyboard handleKeypadClick={handleKeypadClick} />
    </QuizProvider>
  );
}
