// Backend timestamps are naive UTC (Python's datetime.utcnow(), no timezone suffix).
// `new Date("2026-09-22T09:09:39")` would otherwise be parsed as *local* time by the browser.
function parseServerDate(iso: string): Date {
  const hasTimezone = /[Zz]|[+-]\d{2}:?\d{2}$/.test(iso);
  return new Date(hasTimezone ? iso : `${iso}Z`);
}

function pluralize(n: number, one: string, two: string, few: string, many: string): string {
  if (n === 1) return one;
  if (n === 2) return two;
  if (n <= 10) return few;
  return many;
}

/** "منذ 5 دقائق" style relative time, for post/answer/reply timestamps. */
export function formatRelativeArabicTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const diffSec = Math.max(0, Math.round((Date.now() - parseServerDate(iso).getTime()) / 1000));

  if (diffSec < 60) return 'الآن';
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `منذ ${diffMin} ${pluralize(diffMin, 'دقيقة', 'دقيقتين', 'دقائق', 'دقيقة')}`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `منذ ${diffHour} ${pluralize(diffHour, 'ساعة', 'ساعتين', 'ساعات', 'ساعة')}`;
  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 30) return `منذ ${diffDay} ${pluralize(diffDay, 'يوم', 'يومين', 'أيام', 'يوماً')}`;
  const diffMonth = Math.round(diffDay / 30);
  if (diffMonth < 12) return `منذ ${diffMonth} ${pluralize(diffMonth, 'شهر', 'شهرين', 'أشهر', 'شهراً')}`;
  const diffYear = Math.round(diffMonth / 12);
  return `منذ ${diffYear} ${pluralize(diffYear, 'سنة', 'سنتين', 'سنوات', 'سنة')}`;
}

/** Absolute date, for "member since" on a profile. */
export function formatAbsoluteArabicDate(iso: string | null | undefined): string {
  if (!iso) return '';
  return parseServerDate(iso).toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
}
