import { Dayjs } from 'dayjs'
import { Config } from '../defaults'
import { format, getTime, formatCountdown } from '../libs'
import Adapter from './adapter'

class IntervalAdapter extends Adapter {
  private _timer: null | NodeJS.Timeout

  private _month: number
  get month() {
    return this._month
  }
  private _week: number
  get week() {
    return this._week
  }
  private _day: number
  get day() {
    return this._day
  }

  private _hour: number
  get hour() {
    return this._hour
  }

  private _minute: number
  get minute() {
    return this._minute
  }

  private _second: number
  get second() {
    return this._second
  }

  private _value: string
  get value() {
    return this._value
  }

  constructor(interval = 1000, executeFn: any, time: string, format: string) {
    super(interval, executeFn, time, format)
  }
  clear() {
    clearInterval(this._timer)
    this._timer = null
  }

  run() {
    return new Promise((resolve, reject) => {
      const that = this
      this._timer = setInterval(() => {
        that.executeFn()
        that.time = `${+this.time - 1000}`
        // console.log(this.time)
        const { month, week, day, hour, minute, second } = format(+that.time)
        that._month = month
        that._week = week
        that._day = day
        that._hour = hour
        that._minute = minute
        that._second = second

        that._value = formatCountdown(+that.time, that.format)
        resolve(true)
      }, this.interval)
    })
  }

  resume() {
    return this.run()
  }
}

export default IntervalAdapter
