import { getDatabase } from '../../../database/database';
import { SAVE_HEALTH_RECORD_SQL } from '../../../database/schema';
import { parseDateKey } from '../../../utils/dates';
import type { HealthRecord, HealthRecordInput } from '../types';
import { MAX_METRIC_VALUE } from '../utils/validation';

export async function getRecordByDate(date: string): Promise<HealthRecord | null> {
  const database = await getDatabase();
  return database.getFirstAsync<HealthRecord>(
    'SELECT id, date, steps, calories, water FROM health_records WHERE date = ?;',
    [date],
  );
}

export async function saveRecord(record: HealthRecordInput): Promise<void> {
  const values = [record.steps, record.calories, record.water];
  if (
    !parseDateKey(record.date) ||
    values.some(
      (value) => !Number.isSafeInteger(value) || value < 0 || value > MAX_METRIC_VALUE,
    )
  ) {
    throw new Error('The record contains invalid values.');
  }

  const database = await getDatabase();
  await database.runAsync(SAVE_HEALTH_RECORD_SQL, [
    record.date,
    record.steps,
    record.calories,
    record.water,
  ]);
}
