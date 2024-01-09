export function checkToday(history_date: number) {
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

  if (history_date === DATE) {
    return true;
  }

  initialize();
  return false;
}
