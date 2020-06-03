const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express();


// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather'
     })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some useful text',
        title: 'Help',
        name: 'Kiryl'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'param address is missing'
        })
    }

    geocode(`${req.query.address}`, (error, data) => {
        if (error) {
            return res.send({
                error: ''
            })
        } else {
            const { longitude, latitude, placeName } = data
            forecast(longitude, latitude, placeName, (error, forecastData) => {
                return res.send({
                    responseStatus: 200,
                    data: forecastData
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'searchParam is missing'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});