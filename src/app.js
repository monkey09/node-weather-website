const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Start express
const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')
// Setup habdlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)
// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather',
    name: 'monkey'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    name: 'monkey'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help me',
    name: 'monkey'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send([{
      error: 'u should provide an address!'
    }])
  }
  geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send([{
        error: error
      }])
    }
    forecast (latitude, longitude, (error, data) => {
      if (error) {
        return res.send([{
          error: error
        }])
      }
      res.send([
        {
          address: req.query.address,
          location: location,
          forecast: data
        }
      ])
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    error: 'help articale not found!',
    title: 'not found',
    name: 'monkey'
  })
})

app.get('*', (req, res) => {
  res.render('not-found', {
    error: '404 page hehe!',
    title: 'not found',
    name: 'monkey'
  })
})
// Setup server listening port
app.listen(port, () => {
  console.log(`server is up and running on port ${port}.`)
})
