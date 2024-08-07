import moment from 'moment';
import { getQuarter } from './getQuarter';

export function getLowestDate(arr: { committedDate: string }[], rolloutDateFormate?: any): string {
  let lowestDate = arr[0].committedDate;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].committedDate < lowestDate) {
      lowestDate = arr[i].committedDate;
    }
  }

  // Check if lowestDate is a valid date string
  if (typeof lowestDate === 'string' && moment(lowestDate).isValid()) {
    // return moment(lowestDate).fromNow(true);
    return rolloutDateFormate == 'day' ? moment(lowestDate).format('DD.MM.YYYY') : getQuarter(new Date(lowestDate));
  }

  return lowestDate;
}
