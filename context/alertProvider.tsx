import { createContext, ReactNode, useCallback, useState } from 'react';

type AlertStatus = 'success' | 'fail' | 'error' | 'undefined';

type ShowOptions = {
  persist?: boolean;
  durationMs?: number;
};

type AlertContextType = {
  status: AlertStatus;
  message: string;
  isOpen: boolean;
  showSuccess: (message: string, options?: ShowOptions) => void;
  showError: (message: string, options?: ShowOptions) => void;
  showFail: (message: string, options?: ShowOptions) => void;
};

export const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AlertStatus>('undefined');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const show = useCallback(
    (showStatus: AlertStatus, message: string, options?: ShowOptions) => {
      const { persist, durationMs } = options ?? {};

      setStatus(showStatus);
      setMessage(message);
      setIsOpen(true);

      if (!persist) {
        setTimeout(() => {
          setIsOpen(false);
        }, durationMs);
      }
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string, options?: ShowOptions) => {
      show('success', message, options);
    },
    [show],
  );

  const showFail = useCallback(
    (message: string, options?: ShowOptions) => {
      show('fail', message, options);
    },
    [show],
  );

  const showError = useCallback(
    (message: string, options?: ShowOptions) => {
      show('error', message, options);
    },
    [show],
  );

  return (
    <AlertContext.Provider
      value={{ status, message, isOpen, showSuccess, showFail, showError }}
    >
      {children}
    </AlertContext.Provider>
  );
}
