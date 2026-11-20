const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: false,
  hourCycle: "h23",
});

export function formatDate(value: string): string {
  const date = new Date(value);
  // Your backend sends "0001-01-01T00:00:00" for some rows
  if (Number.isNaN(date.getTime()) || date.getFullYear() <= 1) return "—";
  return formatter.format(date);
}