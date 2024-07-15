export const convertDateFormat = (format: string) => {
  const year = format.substring(0, 4);
  const month = format.substring(4, 6);
  const day = format.substring(6, 8);
  const hours = format.substring(8, 10);
  const minutes = format.substring(10, 12);
  const seconds = format.substring(12, 14);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
