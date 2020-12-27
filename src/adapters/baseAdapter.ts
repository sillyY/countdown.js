import dayjs from 'dayjs'
import { isFunction } from 'lodash'
import { isValidDate } from '../libs'
import { warn } from '../warn'

export interface Timespan {
  value: number
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
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
  return time.toString().padStart(length, '0')
}

export abstract class BaseAdapter {
  protected running: boolean
  protected laps: Timespan[]
  protected time: number
  protected times: Timespan

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
    return format(Math.floor(this.times.milliseconds), 3)
  }

  protected initialize() {
    const time = this.endTime.getTime() - this.startTime.getTime()
    this.times = {
      value: time,
      days: Math.floor(time / 1000 / 60 / 60 / 24),
      hours: Math.floor((time / 1000 / 60 / 60) % 24),
      minutes: Math.floor((time / 1000 / 60) % 60),
      seconds: Math.floor((time / 1000) % 60),
      milliseconds: Math.floor(time % 1000),
    }
  }

  abstract start(): void
}
