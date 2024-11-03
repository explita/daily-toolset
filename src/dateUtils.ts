/** Formats a date as 'YYYY-MM-DD' */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** Calculates how long ago a date was from now in a friendly format */
export function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `a few seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  const months = Math.floor(days / 30); // approximate month
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(days / 365); // approximate year
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
