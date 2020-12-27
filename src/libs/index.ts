import { Dayjs } from 'dayjs'

export * from './time'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'

export const isValidDate = (val: unknown): val is Date =>
  val instanceof Date && !isNaN(val.getTime())
