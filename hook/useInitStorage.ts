import { useEffect } from 'react';
import { useSetStorage } from './useSetStorage';

// localStorage가 비어있는 경우(기록이 없다면) initial 값 세팅
export function useInitStorage(records: string[], currentIdx: number) {
  useEffect(() => {
    if (!records) useSetStorage('playground', ['', '', '', '', '', '']);
    if (!currentIdx) useSetStorage('currentIdx', 0);
  }, []);
}
