import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';

import { getRecordByDate } from '../data/recordRepository';
import type { HealthRecord } from '../types';

export default function useDailyRecord(date: string) {
  const [record, setRecord] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestNumber = useRef(0);

  const refresh = useCallback(async () => {
    const currentRequest = ++requestNumber.current;
    setLoading(true);
    setError(null);
    try {
      const result = await getRecordByDate(date);
      if (currentRequest === requestNumber.current) setRecord(result);
    } catch {
      if (currentRequest === requestNumber.current) {
        setError('Your record could not be loaded. Please try again.');
      }
    } finally {
      if (currentRequest === requestNumber.current) setLoading(false);
    }
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
      return () => {
        requestNumber.current += 1;
      };
    }, [refresh]),
  );

  return { record, loading, error, refresh };
}
