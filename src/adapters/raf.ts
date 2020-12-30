import { BaseAdapter } from './baseAdapter'
class RequestAnimationFrame extends BaseAdapter {
  constructor(
    startTime: Date,
    endTime: Date,
    callback: () => void | undefined
  ) {
    super(startTime, endTime, callback)
  }
  start() {
    if (this.times.value === 0) this.initialize()
    if (!this.time) this.time = performance.now()
    if (!this.running) {
      this.running = true
      requestAnimationFrame(this.step.bind(this))
    }
  }
  step(timestamp) {
    if (!this.running) return
    this.calculate(timestamp)
    this.time = timestamp
    this.callback.call(this)
    requestAnimationFrame(this.step.bind(this))
  }
  calculate(timestamp) {
    var diff = timestamp - this.time
    if (diff > 1000) {
      this.onDidIdleExecute(diff)
      this.onDidCarryCalculate()
    } else {
      this.times.millseconds -= diff
      this.onDidCarryCalculate()
    }
  }

  // If the page is not visible， raf will pause
  // handle after processing idle
  onDidIdleExecute(timestamp) {
    const { days, hours, minutes, seconds, millseconds } = this.parseTimestamp(
      timestamp
    )
    this.times.days -= days
    this.times.hours -= hours
    this.times.minutes -= minutes
    this.times.seconds -= seconds
    this.times.millseconds -= millseconds
  }

  // carry calculate
  // eg: 61 second = 1 minute and 1 second
  onDidCarryCalculate() {
    if (this.times.millseconds < 0) {
      this.times.seconds -= 1
      this.times.millseconds += 1000
    }

    if (this.times.seconds < 0) {
      this.times.minutes -= 1
      this.times.seconds += 60
    }

    if (this.times.minutes < 0) {
      this.times.hours -= 1
      this.times.minutes += 60
    }

    if (this.times.hours < 0) {
      this.times.days -= 1
      this.times.hours -= 24
    }
  }

  pause() {
    this.onWillPauseExecute()
  }
  stop() {
    this.onWillStopExecute()
  }
  restart() {
    if (!this.time) this.time = performance.now()
    if (!this.running) {
      this.running = true
      requestAnimationFrame(this.step.bind(this))
    }
    this.initialize()
  }
}

export default RequestAnimationFrame
