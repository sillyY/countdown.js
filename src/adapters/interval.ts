import { Config } from '../defaults'
import Adapter from './adapter'

class IntervalAdapter extends Adapter {
  private _timer: null | NodeJS.Timeout
  constructor(interval = 1000, executeFn: any) {
    super(interval, executeFn)
  }
  clear() {
    clearInterval(this._timer)
    this._timer = null
  }

  run() {
    return new Promise((resolve, reject) => {
      this._timer = setInterval(() => {
        this.executeFn()
        resolve
      }, this.interval)
    })
  }

  resume() {
    return this.run()
  }
}

export default IntervalAdapter
