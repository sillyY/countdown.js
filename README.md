# countdown.js

## Usage

```js
const fn = (app) => {
  console.log(`${app.hour}:${app.minute}:${app.second}`)
}
const app = createApp(fn, {
  end: '2021-01-01',
})
app.start()
setTimeout(() => {
  app.pause()
}, 5000)

setTimeout(() => {
  app.resume()
}, 10000)
```




## Feature

### set time
