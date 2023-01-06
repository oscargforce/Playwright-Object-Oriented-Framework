import crypto from 'crypto';

export function getRandomString(lengthOfString: number): string {
  return crypto.randomBytes(lengthOfString).toString('hex');
}

export function getRandomNumber(daysInMonth: number): number {
  return Math.trunc(Math.random() * daysInMonth) + 1;
}
