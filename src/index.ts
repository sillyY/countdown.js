import Countdown from './core/countdown'
import defaults from './defaults'



export default Countdown


var app = Countdown.create({
  interval: 1000,
  executeFn: () => {
    console.log('start')
  },
})
app.start()
setTimeout(() => {
  app.pause()
}, 5000)

setTimeout(() => {
  app.resume()
}, 10000)
// console.log(app)