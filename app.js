const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose')
const Robots = require('./models/Robots');

const indexRouter = require('./routes/index');
const wynikiRouter = require('./routes/wyniki')
const modyfikacjaRouter = require('./routes/modyfikacja')
const robotyRouter = require('./routes/roboty')
const opiniaRouter = require('./routes/opinia')

const app = express();

// view engine setup
const handlebars = require('express-handlebars');
const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: `${__dirname}/views`,
    defaultLayout: `index`,
    partialsDir: [
        `${__dirname}/views/partials`
    ]
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Mongoose connection
const server = 'localhost:27017';
const database = 'roboty';

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`)
        const isCollectionEmpty = await mongoose.connection.db.collection('robots').estimatedDocumentCount()
        if (!isCollectionEmpty) {
            const robotsData = new Robots()
            await robotsData.save()
        }
    } catch (err) {
        console.log('Failed to connect MongoDB')
    }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/wyniki', wynikiRouter)
app.use('/modyfikacja', modyfikacjaRouter)
app.use('/roboty', robotyRouter)
app.use('/opinia', opiniaRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { layout: 'index' });
});

module.exports = app;