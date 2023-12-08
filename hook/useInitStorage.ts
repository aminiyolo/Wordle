import { useEffect } from 'react';

const TODAY = new Date();
const DATE = TODAY.getFullYear() + TODAY.getMonth() + TODAY.getDate();

function initialize() {
  localStorage.setItem(
    'history',
    JSON.stringify({
      currentIdx: 0,
      records: ['', '', '', '', '', ''],
      date: DATE,
    }),
  );
}

// localStorage가 비어있는 경우(기록이 없다면) initial 값 세팅
export function useInitStorage() {
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history') as string);
    // 오늘 날짜의 기록이 아닌 기록이 있거나 기록이 없다면, init
    if (!history?.date || history?.date !== DATE) initialize();
  }, []);
}
