export function getQuarter(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = Math.ceil((month + 1) / 3);
  let quarterWord = '';

  switch (quarter) {
    case 1:
      quarterWord = `Q1 ${year}`;
      break;
    case 2:
      quarterWord = `Q2 ${year}`;
      break;
    case 3:
      quarterWord = `Q3 ${year}`;
      break;
    case 4:
      quarterWord = `Q4 ${year}`;
      break;
    default:
      quarterWord = 'Invalid quarter';
  }
  return quarterWord;
}
