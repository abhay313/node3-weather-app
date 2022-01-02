const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { title } = require('process')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
//console.log(__filename)

const app = express()
// for heroku or localhost
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhay Singh Yadav'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
   
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// for everything which is not above
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhay Singh Yadav',
        errorMessage: 'Page not found.'
    })
   // res.send('My 404 Page')
})

// app.com
// app.com/help

app.listen(port, () => {
    console.log('Server is up! ' + port)
})