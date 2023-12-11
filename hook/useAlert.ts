import { AlertContext } from '@/context/alertProvider';
import { useContext } from 'react';

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('you shoud use in AlertProvider');
  }

  return context;
}
