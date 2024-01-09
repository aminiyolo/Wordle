function getToday() {
  // 오늘 날짜 구하기
  const TODAY = new Date();
  return TODAY.getFullYear() + TODAY.getMonth() + TODAY.getDate();
}

export function initialize() {
  // localStorage 초기화
  localStorage.setItem(
    'history',
    JSON.stringify({
      currentIdx: 0,
      records: ['', '', '', '', '', ''],
      date: getToday(),
    }),
  );
}

export function checkToday(history_date: number) {
  // localStorage의 날짜 값과 오늘 날짜 값 비교
  if (history_date === getToday()) {
    return true;
  }

  initialize();
  return false;
}
