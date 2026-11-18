import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export default function useCurrentDate() {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const updateDate = () => setDate(new Date());
    const timer = setInterval(updateDate, 60_000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') updateDate();
    });

    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, []);

  return date;
}
