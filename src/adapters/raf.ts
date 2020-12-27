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
    this.times.milliseconds -= diff
    if (diff > 1000) {
      let times = ((diff / 1000) >> 0) + 1
      for (let i = 0; i < times; i++) {
        if (this.times.milliseconds < 0) {
          this.times.seconds -= 1
          this.times.milliseconds += 1000
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
    } else {
      if (this.times.milliseconds < 0) {
        this.times.seconds -= 1
        this.times.milliseconds += 1000
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
  }
}

export default RequestAnimationFrame
