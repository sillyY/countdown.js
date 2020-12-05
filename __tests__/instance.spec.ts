import Countdown from '../dist'

describe('instance', () => {
  it('should have the same methods as default instance', () => {
    const instance = Countdown.create()

    for (let prop in Countdown) {
      if (['Countdown', 'create', 'start', 'pause', 'end'].indexOf(prop) > -1) {
        continue
      }

      expect(typeof instance[prop]).toBe(typeof Countdown[prop])
    }
  })

  it('should can start', () => {
    const instance = Countdown.create({
      interval: 2000,
      executeFn: () => {
        expect(this).toBe(this)
      },
    })
  })
})
