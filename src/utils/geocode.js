const fetch = require('node-fetch')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9ua2V5MyIsImEiOiJjazhheGtwMXQwNnQ2M21wZXpxbnNzcnN0In0.y4-mgXMVS9YRCyvJ35PzqQ&limit=1`

  fetch (url)
  .then(res => res.json())
  .then(({ features }) => {
    if (features.length !== 0) {
      const { center, place_name } = features[0]
      const data = {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      }
      callback(undefined, data)
    } else {
      callback("No such a place", undefined)
    }
  })
  .catch(() => {
    callback("Some thing went wrong!", undefined)
  })
}

module.exports = geocode
