import crypto from 'crypto';
import dayjs from 'dayjs';

export function getRandomString(lengthOfString: number): string {
  return crypto.randomBytes(lengthOfString).toString('hex');
}

export function getRandomDate(): string {
  const daysInMonth = dayjs().daysInMonth();
  const randomDate = Math.trunc(Math.random() * daysInMonth) + 1;
  return String(randomDate);
}

/**
 * 
 * @param option The default is that the function returns the index of the next month, but you can add and get the index up til six months from now.
 * @returns index of month 0 being january.
 */
export function getNextMonth(option?:{addition: 2 | 3 | 4 | 5 | 6}) {
  const additionalNumber = option?.addition ? option.addition : 1;
  const nextMonth = dayjs()
    .set('month', dayjs().month() + additionalNumber)
    .month();
  return nextMonth;
}

export function getCurrentYear() {
  return dayjs().year();
}
