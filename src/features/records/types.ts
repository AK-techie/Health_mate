export type HealthRecord = {
  id: number;
  date: string;
  steps: number;
  calories: number;
  water: number;
};

export type HealthRecordInput = Omit<HealthRecord, 'id'>;
export type MetricName = 'steps' | 'calories' | 'water';
export type RecordFormValues = Record<MetricName, string>;
export type RecordFormErrors = Partial<Record<MetricName, string>>;
