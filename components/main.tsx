'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInitStorage } from '@/hook/useInitStorage';
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

  useInitStorage(); // localStorage init
  useEffect(() => {
    // 키보드 이벤트
    if (success) return;

    const handler = (e: KeyboardEvent) => {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(e.key)) handleKeypadClick(e.key); // 한글 입력 시
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Enter') handleEnter();
      if (/[a-zA-Z]/g.test(e.key) && e.key.length < 2) {
        // 영어 입력 시
        if (isOpen) return;
        showError('한/영 키를 눌러 한글로 바꿔주세요!', { durationMs: 850 });
      }
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
      if (success) {
        // 정답을 맞춘 상황
        showSuccess('해냈어요!', { persist: true });
        return;
      }

      if (fail) {
        // 6번의 기회 내에 정답을 맞추지 못한 상황
        showFail('실패했어요,', { persist: true });
      }
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
