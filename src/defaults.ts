import IntervalAdapteer from './adapters/interval'
function getDefaultAdapter() {
  var adapter
  if (typeof requestAnimationFrame !== 'undefined') {
    adapter = IntervalAdapteer
  } else {
    adapter = IntervalAdapteer
  }
  return adapter
}

export enum RunStatus {
  Unstarted = 'unstarted',
  Running = 'running',
  Suspended = 'suspended',
  Finished = 'finished',
}

export enum Type {
  Simple = 'simple',
}

export interface Config {
  adapter: any // 适配器
  status: RunStatus // 运行状态
  executeFn: any // 执行函数
  type: Type // 配置方式
  interval: number // 间隔时间
}

var defaults: Config = {
  adapter: getDefaultAdapter(),
  status: RunStatus.Unstarted,
  executeFn: () => {},
  type: Type.Simple,
  interval: 1000,
}

export default defaults
