import type { RecordFormErrors, RecordFormValues } from '../types';

export const MAX_METRIC_VALUE = 2_147_483_647;

export function validateRecordForm(values: RecordFormValues): RecordFormErrors {
  const errors: RecordFormErrors = {};
  const fields = ['steps', 'calories', 'water'] as const;

  for (const field of fields) {
    const value = values[field].trim();
    if (value === '') {
      errors[field] = 'Please enter a value. Zero is allowed.';
    } else if (!/^\d+$/.test(value)) {
      errors[field] = 'Enter a whole number, 0 or more.';
    } else if (!Number.isSafeInteger(Number(value)) || Number(value) > MAX_METRIC_VALUE) {
      errors[field] = 'This number is too large.';
    }
  }

  return errors;
}
