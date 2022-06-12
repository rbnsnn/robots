const express = require('express')
const createError = require('http-errors')
const path = require('path')

//Zaimportowanie mongoose i modelu Robots
const mongoose = require('mongoose')
const Robots = require('./models/Robots')

//Import plików z routingiem
const indexRouter = require('./routes/index')
const wynikiRouter = require('./routes/wyniki')
const modyfikacjaRouter = require('./routes/modyfikacja')
const robotyRouter = require('./routes/roboty')
const opiniaRouter = require('./routes/opinia')

const app = express()

//Ustawienia silnika widoków (hbs)
const handlebars = require('express-handlebars')
const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: `${__dirname}/views`,
    defaultLayout: `index`,
    partialsDir: [
        `${__dirname}/views/partials`
    ]
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

//Połączenie z bazą danych
const server = 'localhost:27017'
const database = 'roboty'

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`)
        //Sprawdzenie czy istnieje kolekcja robots, jeżeli nie tworzymy nową z wartościami domyślnymi
        const isCollectionEmpty = await mongoose.connection.db.collection('robots').estimatedDocumentCount()
        if (!isCollectionEmpty) {
            const robotsData = new Robots()
            await robotsData.save()
        }
    } catch (err) {
        console.log('Failed to connect MongoDB')
    }
}
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Routing
app.use('/', indexRouter)
app.use('/wyniki', wynikiRouter)
app.use('/modyfikacja', modyfikacjaRouter)
app.use('/roboty', robotyRouter)
app.use('/opinia', opiniaRouter)

//Obsługa błednych url
app.use((req, res, next) => {
    next(createError(404))
})

//Obsługa błędów
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('layouts/error', { layout: 'index' })
})

module.exports = app