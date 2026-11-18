import { useRef, useState } from 'react';

import { deleteRecord } from '../data/recordRepository';
import type { HealthRecord } from '../types';

export default function useDeleteRecord(onDeleted: () => void) {
  const [target, setTarget] = useState<HealthRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);

  function requestDelete(record: HealthRecord) {
    if (busy.current) return;
    setError(null);
    setTarget(record);
  }

  function cancelDelete() {
    if (busy.current) return;
    setTarget(null);
    setError(null);
  }

  async function confirmDelete() {
    if (!target || busy.current) return;
    busy.current = true;
    setDeleting(true);
    setError(null);
    try {
      await deleteRecord(target.id);
      setTarget(null);
      onDeleted();
    } catch {
      setError('This record could not be deleted. Please try again.');
    } finally {
      busy.current = false;
      setDeleting(false);
    }
  }

  return { target, deleting, error, requestDelete, cancelDelete, confirmDelete };
}
