const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', { title: 'Weather', name: 'Vidath'})
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', message: 'The help message', name: 'Vidath'})
})

app.get('/about', (req, res) =>{
    res.render('about', { title: 'About Me', name: 'Vidath'})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Address cannot be empty', source: 'end point'})
    }

    geocode(req.query.address, (geocodeError,{latitude, longitude, location} = {}) => {
        if (geocodeError) {
            return res.send({error: geocodeError, source: 'geocode'})
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({error: forecastError, source: 'forecast'})
            } 

            res.send({ 
                forecast: forecastData,
                location: location,
                address: req.query.address 
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', { 
        title: 'Error', 
        name: 'Vidath',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) =>{
    res.render('error', { 
        title: 'Error', 
        name: 'Vidath',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})