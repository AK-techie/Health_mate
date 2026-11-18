import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { CREATE_HEALTH_RECORDS_SQL } from './schema';

let databasePromise: Promise<SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = openDatabaseAsync('healthmate.db')
      .then(async (database) => {
        await database.execAsync('PRAGMA journal_mode = WAL;');
        await database.execAsync(CREATE_HEALTH_RECORDS_SQL);
        return database;
      })
      .catch((error: unknown) => {
        databasePromise = null;
        throw error;
      });
  }
  return databasePromise;
}
