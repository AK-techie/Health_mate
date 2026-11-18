export function formatDateKey(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateKey(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime()) || formatDateKey(date) !== value) return null;
  return date;
}

export function formatRecordDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDashboardDate(date: Date): string {
  return date
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    .toUpperCase();
}

export function getGreeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatShortRecordDate(value: string): string {
  return (
    parseDateKey(value)?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) ?? value
  );
}

export function getRecordDayLabel(value: string, today: Date): string {
  if (value === formatDateKey(today)) return 'Today';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (value === formatDateKey(yesterday)) return 'Yesterday';
  return parseDateKey(value)?.toLocaleDateString('en-GB', { weekday: 'long' }) ?? value;
}
