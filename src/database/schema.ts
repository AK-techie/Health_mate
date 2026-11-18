export const CREATE_HEALTH_RECORDS_SQL = `
  CREATE TABLE IF NOT EXISTS health_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    steps INTEGER NOT NULL CHECK(typeof(steps) = 'integer' AND steps >= 0),
    calories INTEGER NOT NULL CHECK(typeof(calories) = 'integer' AND calories >= 0),
    water INTEGER NOT NULL CHECK(typeof(water) = 'integer' AND water >= 0)
  );
`;

export const SAVE_HEALTH_RECORD_SQL = `
  INSERT INTO health_records (date, steps, calories, water)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(date) DO UPDATE SET
    steps = excluded.steps,
    calories = excluded.calories,
    water = excluded.water;
`;
