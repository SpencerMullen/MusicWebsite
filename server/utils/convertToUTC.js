module.exports = (date) => {
  // Ensure date is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }

  // Create a new Date object with UTC components
  const utcDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  ));

  return utcDate;
}
