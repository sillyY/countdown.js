// import { createAdapter } from "./adapter"
import Interval from './adapters/interval'
import RequestAnimationFrame from './adapters/raf'
import { getTime } from './libs'

let adapter

function createAdapter({ start, end, callback }) {
  if (typeof requestAnimationFrame !== 'undefined') {
    return new RequestAnimationFrame(start, end, callback)
  } else {
    return new Interval(start, end, callback)
  }
}
function ensureAdapter(options) {
  return adapter || (adapter = createAdapter(options))
}

function pruneAdapterOptions(args) {
  let start = args.start
  if (!start) {
    start = getTime().toDate()
  } else {
    // 省略格式化
  }

  return {
    start,
    end: getTime(args.end).toDate(),
    callback: args.callback,
    delay: args.delay
  }
}

export const createApp = (args) => {
  const adapterOptions = pruneAdapterOptions(args)
  const app = ensureAdapter(adapterOptions)

  return app
}
