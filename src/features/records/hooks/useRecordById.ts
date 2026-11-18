import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';

import { getRecordById } from '../data/recordRepository';
import type { HealthRecord } from '../types';

export default function useRecordById(id: number) {
  const [record, setRecord] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestNumber = useRef(0);

  const refresh = useCallback(async () => {
    const request = ++requestNumber.current;
    setLoading(true);
    setError(null);
    try {
      const result = await getRecordById(id);
      if (request === requestNumber.current) setRecord(result);
    } catch {
      if (request === requestNumber.current)
        setError('This record could not be loaded. Please try again.');
    } finally {
      if (request === requestNumber.current) setLoading(false);
    }
  }, [id]);

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
