// localStorage에 새로운 값을 세팅
export function useSetStorage(key: string, value: number | string[]) {
  const data = JSON.parse(localStorage.getItem('history') as string);
  localStorage.setItem('history', JSON.stringify({ ...data, [key]: value }));
}
