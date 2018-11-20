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
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.google_maps_api}&address=${request.query.data}`
    superagent.get(url)
      .then(res => response.send({
        latitude: res.body.results[0].geometry.location.lat,
        longitude: res.body.results[0].geometry.location.lng
      }))
      .catch(err => response.send('<img src="http://http.cat/404"/>'))
})

app.get('/movies', (request, response) => {
  const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIEDB_API}/${request.query.data}`
  superagent.get(url)
      .then(res => response.send({
        title: res.body.results.FOR EACH.title, 
        overview: res.body.results.FOR EACH.overview, 
        average_votes: res.body.results.FOR EACH.vote_average, 
        total_votes: res.body.results.FOR EACH.vote_count, 
        image_url: res.body.results.FOR EACH.poster_path, 
        popularity: res.body.results.FOR EACH.popularity, 
        released_on: res.body.results.FOR EACH.release_date, 
      }))
      .catch(err => response.send('<img src="http://http.cat/404"/>'))
})

app.get('/weather', (request, response) => {
    const url = `https://api.darksky.net/forecast/${process.env.dark_skys_api}/${request.query.data}`
    superagent.get(url)
      .then(res => {
        let day = new Date(res.body.daily.data[0].time);
        response.send({
            time: day.toDateString(),
            forecast: res.body.daily.data[0].summary
        })
      })
      .catch(err => response.send('<img src="http://http.cat/404"/>'))
})

app.get('/yelp', (request, response) => {
  const url = `https://api.darksky.net/forecast/${process.env.dark_skys_api}/${request.query.data}`
  superagent.get(url)
      .then(res => response.send({
        name: res.body.businesses.FOR EACH.name,
        image_url: res.body.businesses.FOR EACH.image_url,
        price: res.body.businesses.FOR EACH.price,
        rating: res.body.businesses.FOR EACH.rating,
        url: res.body.businesses.FOR EACH.url
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