// localStorage에 새로운 값을 세팅

type Params = {
  currentIdx: number;
  records: string[];
};

export function setStorage({ currentIdx, records }: Params): void {
  const data = JSON.parse(localStorage.getItem('history') ?? '{}');
  localStorage.setItem(
    'history',
    JSON.stringify({ ...data, currentIdx, records }),
  );
}
