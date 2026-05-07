const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatIndonesianDate = (dateInput) => {
  if (!dateInput) return '-';
  const dateObj =
    typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  return isNaN(dateObj.getTime())
    ? 'Tanggal tidak valid'
    : dateObj.toLocaleDateString('id-ID', dateOptions);
};
