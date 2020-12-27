import * as dayjs from 'dayjs'
import { months } from 'dayjs/locale/*'
import * as _ from 'lodash'

export function getTime(time: string | dayjs.Dayjs = dayjs()) {
  return dayjs(time)
}

// export function toTime(timestamp) {
//   return dayjs()
// }

export function subtract(time) {
  return time.subtract(1, 'second')
}

export const enum Time {
  MILLISECOND = 1,
  SECOND = 1000 * Time.MILLISECOND,
  MINUTE = 60 * Time.SECOND,
  HOUR = 60 * Time.SECOND,
  DAY = 60 * Time.HOUR,
  WEEK = 7 * Time.DAY,
  MONTH = 30 * Time.DAY,
  YEAR = 365 * Time.DAY,
}

export function format(timestamp: number) {
  return {
    year: Math.floor(timestamp / Time.YEAR),
    month: Math.floor(timestamp / Time.MONTH),
    week: Math.floor(timestamp / Time.WEEK),
    day: Math.floor(timestamp / Time.DAY),
    hour: Math.floor(timestamp / Time.HOUR),
    minute: Math.floor(timestamp / Time.MINUTE),
    second: Math.floor(timestamp / Time.SECOND),
    millsecond: timestamp,
  }
}

const timeUnits: [string, number][] = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

export function formatTimeStr(duration: number, format: string) {
  let leftDuration: number = duration;

  const escapeRegex = /\[[^\]]*\]/g;
  const keepList = (format.match(escapeRegex) || []).map(str => str.slice(1, -1));
  const templateText = format.replace(escapeRegex, '[]');

  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    if (current.indexOf(name) !== -1) {
      const value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return current.replace(new RegExp(`${name}+`, 'g'), match => {
        const len = match.length;
        return _.padStart(value.toString(), len, '0');
      });
    }
    return current;
  }, templateText);

  let index = 0;
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index];
    index += 1;
    return match;
  });
}

export function formatCountdown(diff: number , format: string) {
   diff = Math.max(diff, 0);
  return formatTimeStr(diff, format);
}
