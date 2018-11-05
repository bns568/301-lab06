'use strict'

//import express to set up routes
const express = require('express')

//import superagent to handle AJAX and asynchronicity
const superagent = require('superagent')

//import cors to handle cross origin requests
const cors = require('cors')

//require the dotenv module and invoke the config method allowing us to add environment variables
require('dotenv').config()

//initiate an instance of express
const app = express()

app.use(cors())

app.get('/location', (request, response) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDuOmBWsM_9Olsx9z4tjq9Gj_Vbmb7Dxy4&address=7600+Wisconsin+ave+bethesda+md'
    superagent.get(url)
      .then(res => response.send({
        latitude: res.body.results[0].geometry.location.lat,
        longitude: res.body.results[0].geometry.location.lng
      }))
      .catch(err => response.send('<img src="http://http.cat/404"/>'))
})

app.get('/weather', (request, response) => {
    const url = 'https://api.darksky.net/forecast/926bad7492c47794153864832ffd41aa/37.8267,-122.4233'
    superagent.get(url)
      .then(res => response.send({
        time: res.body.daily.data[0].time,
        forecast: res.body.daily.data[0].summary
      }))
      .catch(err => response.send('<img src="http://http.cat/404"/>'))
})

app.get('*', (request, response) => {
    response.send('<img src="http://http.cat/500"/>')
})

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
  })