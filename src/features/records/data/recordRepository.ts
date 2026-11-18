import { getDatabase } from '../../../database/database';
import { SAVE_HEALTH_RECORD_SQL } from '../../../database/schema';
import { parseDateKey } from '../../../utils/dates';
import type { HealthRecord, HealthRecordInput } from '../types';
import { MAX_METRIC_VALUE } from '../utils/validation';
import { RecordDateConflictError, RecordNotFoundError } from './recordErrors';

export async function getRecordByDate(date: string): Promise<HealthRecord | null> {
  const database = await getDatabase();
  return database.getFirstAsync<HealthRecord>(
    'SELECT id, date, steps, calories, water FROM health_records WHERE date = ?;',
    [date],
  );
}

function validateRecord(record: HealthRecordInput): void {
  const values = [record.steps, record.calories, record.water];
  if (
    !parseDateKey(record.date) ||
    values.some(
      (value) => !Number.isSafeInteger(value) || value < 0 || value > MAX_METRIC_VALUE,
    )
  ) {
    throw new Error('The record contains invalid values.');
  }
}

function validateRecordId(id: number): void {
  if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid record identifier.');
}

export async function saveRecord(record: HealthRecordInput): Promise<void> {
  validateRecord(record);

  const database = await getDatabase();
  await database.runAsync(SAVE_HEALTH_RECORD_SQL, [
    record.date,
    record.steps,
    record.calories,
    record.water,
  ]);
}

export async function getRecords(date?: string | null): Promise<HealthRecord[]> {
  if (date && !parseDateKey(date)) throw new Error('Invalid filter date.');
  const database = await getDatabase();
  const columns = 'SELECT id, date, steps, calories, water FROM health_records';
  return date
    ? database.getAllAsync<HealthRecord>(
        `${columns} WHERE date = ? ORDER BY date DESC;`,
        [date],
      )
    : database.getAllAsync<HealthRecord>(`${columns} ORDER BY date DESC;`);
}

export async function getRecordById(id: number): Promise<HealthRecord | null> {
  validateRecordId(id);
  const database = await getDatabase();
  return database.getFirstAsync<HealthRecord>(
    'SELECT id, date, steps, calories, water FROM health_records WHERE id = ?;',
    [id],
  );
}

export async function updateRecord(id: number, record: HealthRecordInput): Promise<void> {
  validateRecordId(id);
  validateRecord(record);
  const database = await getDatabase();
  await database.withExclusiveTransactionAsync(async (transaction) => {
    const existing = await transaction.getFirstAsync<{ id: number }>(
      'SELECT id FROM health_records WHERE id = ?;',
      [id],
    );
    if (!existing) throw new RecordNotFoundError();
    const duplicate = await transaction.getFirstAsync<{ id: number }>(
      'SELECT id FROM health_records WHERE date = ? AND id <> ?;',
      [record.date, id],
    );
    if (duplicate) throw new RecordDateConflictError();
    await transaction.runAsync(
      'UPDATE health_records SET date = ?, steps = ?, calories = ?, water = ? WHERE id = ?;',
      [record.date, record.steps, record.calories, record.water, id],
    );
  });
}

export async function deleteRecord(id: number): Promise<boolean> {
  validateRecordId(id);
  const database = await getDatabase();
  const result = await database.runAsync('DELETE FROM health_records WHERE id = ?;', [
    id,
  ]);
  return result.changes > 0;
}
