import { BaseAdapter } from './baseAdapter'

class Interval extends BaseAdapter {
  constructor(
    startTime: Date,
    endTime: Date,
    callback: () => void | undefined
  ) {
    super(startTime, endTime, callback)
  }

  private timer: NodeJS.Timeout

  start() {
    if (!this.running) {
      this.running = true
      this.timer = setInterval(() => {
        this.step()
      }, 1000)
    }
  }

  step() {
    if (!this.running) return
    this.calculate()
    this.callback.call(this)
  }
  calculate() {
    var nowTime = new Date().getTime()
    var time = this.endTime.getTime() - nowTime

    this.times = {
      value: time,
      days: Math.floor(time / 1000 / 60 / 60 / 24),
      hours: Math.floor((time / 1000 / 60 / 60) % 24),
      minutes: Math.floor((time / 1000 / 60) % 60),
      seconds: Math.floor((time / 1000) % 60),
      millseconds: Math.floor(time % 1000),
    }
  }
  pause() {
    this.onWillPauseExecute()
    clearInterval(this.timer)
  }
  stop() {
    this.onWillStopExecute()
    this.timer && clearInterval(this.timer)
    this.timer = null
  }
}

export default Interval
