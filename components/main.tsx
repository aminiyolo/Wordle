'use client';

import { useCallback, useEffect, useState } from 'react';
import Keyboard from './keyboard';
import PlayGround from './playGround';

export default function Main() {
  const [keyword, setKeyword] = useState<string>('');
  console.log(keyword);

  const handleKeypadClick = useCallback(
    (word: string) => {
      if (keyword.length > 4) return;
      setKeyword((prev) => prev + word);
    },
    [keyword],
  );

  const handleDelete = useCallback(() => {
    setKeyword((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const handleEnter = useCallback(() => {
    console.log('Enter');
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Enter') handleEnter();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <PlayGround />
      <Keyboard
        handleKeypadClick={handleKeypadClick}
        handleDelete={handleDelete}
      />
    </>
  );
}
