import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';

import { getRecords } from '../data/recordRepository';
import type { HealthRecord } from '../types';

export default function useHistoryRecords(date: string | null) {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestNumber = useRef(0);

  const refresh = useCallback(async () => {
    const request = ++requestNumber.current;
    setLoading(true);
    setError(null);
    try {
      const result = await getRecords(date);
      if (request === requestNumber.current) setRecords(result);
    } catch {
      if (request === requestNumber.current)
        setError('Your records could not be loaded. Please try again.');
    } finally {
      if (request === requestNumber.current) setLoading(false);
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

  return { records, loading, error, refresh };
}
