/** Trip dates are date-only API values parsed at UTC midnight. */
export function getTripRange(start?: Date | null, end?: Date | null) {
  const from = start?.toISOString().slice(0, 10);
  const to = end?.toISOString().slice(0, 10);
  return {
    from,
    to,
    days: from && to ? Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1 : 0,
  };
}
