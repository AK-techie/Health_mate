import { useEffect, useState } from 'react';

import { formatDateKey, parseDateKey } from '../../../utils/dates';
import { getRecordByDate, saveRecord } from '../data/recordRepository';
import type { MetricName, RecordFormErrors, RecordFormValues } from '../types';
import { validateRecordForm } from '../utils/validation';

const EMPTY_FORM: RecordFormValues = { steps: '', calories: '', water: '' };

export default function useRecordForm(
  initialDate: string | undefined,
  onSaved: () => void,
) {
  const [dateKey, setDateKey] = useState(() => {
    return initialDate && parseDateKey(initialDate)
      ? initialDate
      : formatDateKey(new Date());
  });
  const [values, setValues] = useState<RecordFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<RecordFormErrors>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existing, setExisting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    getRecordByDate(dateKey)
      .then((record) => {
        if (!active) return;
        setExisting(record !== null);
        setValues(
          record
            ? {
                steps: String(record.steps),
                calories: String(record.calories),
                water: String(record.water),
              }
            : EMPTY_FORM,
        );
      })
      .catch(() => {
        if (active) setLoadError('This date could not be loaded. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [dateKey, reload]);

  function prepareLoad() {
    setLoading(true);
    setLoadError(null);
    setSaveError(null);
    setErrors({});
    setValues(EMPTY_FORM);
    setExisting(false);
  }

  function retryLoad() {
    prepareLoad();
    setReload((value) => value + 1);
  }

  function changeValue(field: MetricName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSaveError(null);
  }

  function changeDate(selectedDate: Date) {
    const nextDate = formatDateKey(selectedDate);
    if (nextDate !== dateKey) {
      prepareLoad();
      setDateKey(nextDate);
    }
  }

  async function handleSave() {
    if (loading || saving || loadError) return;
    const nextErrors = validateRecordForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (dateKey > formatDateKey(new Date())) {
      setSaveError('Choose today or an earlier date.');
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await saveRecord({
        date: dateKey,
        steps: Number(values.steps),
        calories: Number(values.calories),
        water: Number(values.water),
      });
      onSaved();
    } catch {
      setSaveError(
        'Your record could not be saved. Your entries are still here. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  }

  return {
    dateKey,
    values,
    errors,
    loading,
    saving,
    existing,
    loadError,
    saveError,
    changeValue,
    changeDate,
    retryLoad,
    handleSave,
  };
}
