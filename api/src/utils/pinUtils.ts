import { tz } from '@date-fns/tz';
import { parseISO } from 'date-fns';

export const getCurrentDateTime = (
  timezone: string = 'Australia/Brisbane'
): string => {
  const currentLocalString = new Date().toISOString().slice(0, 19);
  const tzDate = parseISO(currentLocalString, { in: tz(timezone) });
  return new Date(tzDate.getTime()).toISOString();
};
