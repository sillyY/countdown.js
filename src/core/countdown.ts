// import * as _ from 'lodash'
import defaults, { Config } from '../defaults'
import { RunStatus } from '../defaults'

let status = RunStatus.Unstarted

class Countdown {
  public static create(instanceConfig) {
    const instance = new Countdown({ ...defaults, ...instanceConfig })
    return instance
  }

  public Countdown: Countdown | null = this

  private _config: Config
  get config() {
    return this._config
  }

  private _text: string
  get text() {
    return this._text
  }

  private _adapter: any
  get adapter() {
    return this._adapter
  }
  constructor(instanceConfig: any) {
    this._config = instanceConfig
    this._adapter = new this.config.adapter(
      this.config.interval,
      this.config.executeFn
    )
  }

  willFnExecuted() {
    if (status === RunStatus.Suspended) {
      const {
        adapter: { clear },
      } = this.config

      clear()
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }

  start() {
    let that = this;
    return new Promise((resolve, reject) => {
      that.willFnExecuted()
        .then((res) => {
          if (!res) return
          return that.adapter.run()
        })
        .then(() => {
          console.log('run one time completed')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  pause() {
    // this.config.status = RunStatus.Suspended
    status = RunStatus.Suspended
    this.adapter.clear()
    console.log('has paused')
  }

  resume() {
    status = RunStatus.Running
    this.adapter.resume()
    console.log('has pause')
  }

  end() {}

  // executeCommand(config) {

  // }
}

// _.forEach(['start', 'pause', 'end'], function forEachMethod(method) {
//   Countdown.prototype[method] = function () {}
// })

export default Countdown
