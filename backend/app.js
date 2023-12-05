var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productsRouter = require('./routes/product')
var versionRouter = require('./routes/version')
var logRouter = require('./routes/logs')

var app = express();

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
app.use(logger('common'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/products', productsRouter)
app.use('/versions', versionRouter)
app.use('/logs', logRouter)



module.exports = app;