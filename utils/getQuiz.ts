import { WORDS } from '@/constant/words';

export function getQuiz(): string[] {
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth() + 1;
  const DAY = TODAY.getDate();
  return WORDS[YEAR - MONTH * DAY].split('');
}
