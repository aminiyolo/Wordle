// localStorage에 새로운 값을 세팅
export function useSetStorage(key: string, value: number | string[]) {
  localStorage.setItem(key, JSON.stringify(value));
}
