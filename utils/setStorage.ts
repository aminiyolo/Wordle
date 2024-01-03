// localStorage에 새로운 값을 세팅

export function setStorage({
  currentIdx,
  records,
}: {
  currentIdx: number;
  records: string[];
}) {
  const data = JSON.parse(localStorage.getItem('history') ?? '{}');
  localStorage.setItem(
    'history',
    JSON.stringify({ ...data, currentIdx, records }),
  );
}
