import { useEffect } from 'react';

const DATE = new Date();

function initialize() {
  localStorage.setItem(
    'history',
    JSON.stringify({
      currentIdx: 0,
      records: ['', '', '', '', '', ''],
      date: DATE.getFullYear() + DATE.getMonth() + DATE.getDay(),
    }),
  );
}

// localStorage가 비어있는 경우(기록이 없다면) initial 값 세팅
export function useInitStorage() {
  useEffect(() => {
    const { date } = JSON.parse(localStorage.getItem('history') as string);
    if (!localStorage.getItem('history') || date !== DATE) initialize();
    // 오늘 날짜의 기록이 아닌 기록이 있거나 기록이 없다면, init
  }, []);
}
