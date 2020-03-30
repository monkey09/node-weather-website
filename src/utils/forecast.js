const fetch = require('node-fetch')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f9f9ee3e38ba4e65980606be1a0e24cd/${latitude},${longitude}`

  fetch(url)
  .then(res => res.json())
  .then(({ error, daily, currently }) => {
    if (error) {
      callback(error, undefined)
    } else {
      callback(undefined, `${daily.summary} It is currently ${currently.temperature} degress out. there is a ${currently.precipProbability}% chance of rain.`)
    }
  })
  .catch(() => {
    callback("Something went wrong!", undefined)
  })
}

module.exports = forecast
