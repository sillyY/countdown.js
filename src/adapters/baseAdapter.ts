import dayjs from 'dayjs'
import { isFunction } from 'lodash'
import { isValidDate, Time } from '../libs'
import { warn } from '../warn'

export interface Timespan {
  value: number
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  millseconds?: number
}

// export interface Options {
//   start?: string | number | undefined | null
//   end?: string | number | undefined | null
//   callback?: () => void
// }
// export interface AdapterOptions {
//   start: Date
//   end: Date
//   callback?: () => void
// }

// export function checkDate(date: unknown) {
//   if (!isValidDate(date)) {
//     console.warn(`value cannot be valid date: ${String(date)}`)
//     return false
//   }
//   return true
// }

export function format(time, length = 2) {
  let timeStr = time.toString()
  const remainderNumber = timeStr.split('.')[1]
  if (!remainderNumber || remainderNumber.length < length) {
    return timeStr.padStart(length, '0')
  } else {
    return ~~((15.7784514 * 10 ** length) / 10 ** length)
  }
}

export interface IBaseAdapter {
  date: number
  hour: number
  minute: number
  second: number
  millsecond: number
}

export abstract class BaseAdapter implements IBaseAdapter {
  protected running: boolean
  protected time: number
  protected times: Timespan
  laps: Timespan[]

  constructor(
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly callback: () => void | undefined
  ) {
    this.running = false
    this.laps = []

    this.initialize()
  }

  get date() {
    return format(this.times.days)
  }
  get hour() {
    return format(this.times.hours)
  }

  get minute() {
    return format(this.times.minutes)
  }

  get second() {
    return format(this.times.seconds)
  }

  get millsecond() {
    return format(Math.floor(this.times.millseconds), 3)
  }

  protected initialize() {
    const time = this.endTime.getTime() - this.startTime.getTime()
    this.times = this.parseTimestamp(time)
  }

  protected parseTimestamp(timestamp: number) {
    return {
      value: timestamp,
      days: ~~(timestamp / 1000 / 60 / 60 / 24),
      hours: ~~((timestamp / 1000 / 60 / 60) % 24),
      minutes: ~~((timestamp / 1000 / 60) % 60),
      seconds: ~~((timestamp / 1000) % 60),
      millseconds: ~~(timestamp % 1000),
    }
  }

  abstract start(): void

  protected onWillPauseExecute() {
    this.running = false
  }
  abstract pause(): void

  protected onWillStopExecute() {
    this.running = false
    this.time = null
    this.times = {
      value: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      millseconds: 0,
    }
    this.callback()
  }
  abstract stop(): void

  protected lap() {
    const { value, days, hours, minutes, seconds, millseconds } = this.times
    this.laps.push({
      value,
      days,
      hours,
      minutes,
      seconds,
      millseconds,
    })
  }

  protected clear() {
    this.laps = []
  }
}
