'use client';

import { useCallback, useEffect, useState } from 'react';
import Keyboard from './keyboard';
import PlayGround from './playGround';
import { useQuiz } from '@/hook/useQuiz';
import { useAlert } from '@/hook/useAlert';
import { WORDS } from '@/constant/words';
import { setStorage } from '@/utils/setStorage';

export default function Main() {
  const [keyword, setKeyword] = useState<string>('');
  const { isOpen, showSuccess, showError, showFail } = useAlert();
  const { success, fail, guess, currentIdx, setCurrentIdx, setGuess } =
    useQuiz();

  // Backspace 또는 <--
  const handleDelete = useCallback(() => {
    if (keyword.length === 0) return;
    setKeyword((prev) => prev.slice(0, prev.length - 1));
  }, [keyword, setKeyword]);

  const handleEnter = useCallback(() => {
    if (keyword.length < 5) return;

    const newRecords = [...guess];
    newRecords[currentIdx] = keyword;
    const notExist = !WORDS.find((word) => word === newRecords[currentIdx]);

    if (notExist) {
      showError('단어를 찾을 수 없습니다.', { durationMs: 700 });
      return;
    }

    setStorage({ currentIdx: currentIdx + 1, records: newRecords });
    setGuess(newRecords);
    setCurrentIdx(currentIdx + 1);
    setKeyword('');
  }, [keyword, history, showError, setKeyword]);

  const handleKeypadClick = useCallback(
    (word: string) => {
      if (success) return;
      if (word === '<--') handleDelete();
      else if (word === 'Enter') keyword.length > 4 && handleEnter();
      else if (keyword.length <= 4) setKeyword((prev) => prev + word);
    },
    [keyword, success, setKeyword, handleEnter, handleDelete],
  );

  useEffect(() => {
    // 키보드 이벤트
    if (success) return;

    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space') e.preventDefault();

      // 영어 입력 시
      if (/[a-zA-Z]/g.test(e.key) && e.key.length === 1) {
        if (isOpen) return; // 이미 alert가 노출되어 있는 상태라면 return
        if (e.ctrlKey || e.metaKey) return; // (command || ctrl) + r => 키보드로 새로 고침시 alert 노출되지 않도록
        showError('한/영 키를 눌러 한글로 바꿔주세요!', { durationMs: 850 });
      }

      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(e.key)) handleKeypadClick(e.key); // 한글 정상 입력 시
      if (e.key === 'Enter') handleEnter();
      if (e.key === 'Backspace') handleDelete();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    handleKeypadClick,
    handleDelete,
    handleEnter,
    showError,
    isOpen,
    success,
  ]);

  useEffect(
    function showAlert() {
      if (success) showSuccess('해냈어요!', { persist: true }); // 성공
      else if (fail) showFail('실패했어요,', { persist: true }); // 실패
    },
    [success, fail, showSuccess, showFail],
  );

  return (
    <>
      <PlayGround keyword={keyword} currentIdx={currentIdx} records={guess} />
      <Keyboard handleKeypadClick={handleKeypadClick} />
    </>
  );
}
