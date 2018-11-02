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